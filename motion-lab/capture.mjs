// Frame-accurate capture for the motion lab.
//
//   node capture.mjs p1                  → frames/p1/*.png at 30fps
//   node capture.mjs p1 --stills 1.2,3   → single frames at those seconds
//   node capture.mjs all                 → every prototype
//
// Each prototype exposes window.__seek(ms), so a frame is a pure function of
// time: the same instant always produces the same pixels.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const argv = process.argv.slice(2);
const stillFlag = argv.indexOf("--stills");
const STILLS = stillFlag > 0 ? argv[stillFlag + 1].split(",").map(Number) : null;
const fpsFlag = argv.indexOf("--fps");
const FPS = fpsFlag > 0 ? Number(argv[fpsFlag + 1]) : 30;
const want = argv.filter((a) => !a.startsWith("--") && a !== argv[stillFlag + 1] && a !== argv[fpsFlag + 1]);
const PAGES = want[0] === "all" ? ["p1", "p2", "p3", "p4", "p5"] : [want[0]];

const HERE = resolve(import.meta.dirname);
const SRC = resolve(HERE, "src");
const CHROME = process.env.CHROME_PATH ||
  "/root/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const PORT = 9400 + Math.floor(Math.random() * 300);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class CDP {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.ws.addEventListener("message", (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && this.pending.has(m.id)) {
        const { ok, fail } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? fail(new Error(JSON.stringify(m.error))) : ok(m.result);
      }
    });
  }
  open() {
    return new Promise((ok, fail) => {
      this.ws.addEventListener("open", ok, { once: true });
      this.ws.addEventListener("error", fail, { once: true });
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((ok, fail) => this.pending.set(id, { ok, fail }));
  }
}

const chrome = spawn(CHROME, [
  "--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage",
  "--hide-scrollbars", "--allow-file-access-from-files", "--font-render-hinting=none",
  "--force-color-profile=srgb", `--remote-debugging-port=${PORT}`, "about:blank",
], { stdio: "ignore" });

let wsUrl;
for (let i = 0; i < 80; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
    if (wsUrl) break;
  } catch {}
  await sleep(150);
}
if (!wsUrl) { chrome.kill(); throw new Error("chromium did not expose a devtools endpoint"); }

const cdp = new CDP(wsUrl);
await cdp.open();

for (const name of PAGES) {
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
  const S = (m, p) => cdp.send(m, p, sessionId);
  const shot = async (file) => {
    const { data } = await S("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false, fromSurface: true, optimizeForSpeed: true,
    });
    writeFileSync(file, Buffer.from(data, "base64"));
  };

  await S("Page.enable");
  await S("Runtime.enable");
  await S("Emulation.setDeviceMetricsOverride", { width: 1280, height: 720, deviceScaleFactor: 1.5, mobile: false });
  await S("Page.navigate", { url: "file://" + resolve(SRC, name + ".html") + "?capture" });

  let duration = 0;
  for (let i = 0; i < 200 && !duration; i++) {
    await sleep(80);
    const r = await S("Runtime.evaluate", {
      expression: "window.__ready === true ? window.__duration : 0",
      returnByValue: true,
    }).catch(() => null);
    duration = r?.result?.value || 0;
  }
  if (!duration) {
    const dbg = await S("Runtime.evaluate", { expression: "window.__err || 'not ready'", returnByValue: true }).catch(() => null);
    throw new Error(`${name}: ${dbg?.result?.value}`);
  }

  const dir = resolve(HERE, "frames", name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  if (STILLS) {
    for (const sec of STILLS) {
      await S("Runtime.evaluate", { expression: `window.__seek(${Math.round(sec * 1000)})` });
      await shot(resolve(dir, `t${sec}.png`));
    }
    console.log(`${name}: stills ${STILLS.join(", ")}`);
  } else {
    const frames = Math.round((duration / 1000) * FPS);
    for (let i = 0; i < frames; i++) {
      await S("Runtime.evaluate", { expression: `window.__seek(${((i * 1000) / FPS).toFixed(1)})` });
      await shot(resolve(dir, `f${String(i).padStart(4, "0")}.png`));
    }
    console.log(`${name}: ${frames} frames → frames/${name}`);
  }

  await cdp.send("Target.closeTarget", { targetId });
}

cdp.ws.close();
chrome.kill();
process.exit(0);

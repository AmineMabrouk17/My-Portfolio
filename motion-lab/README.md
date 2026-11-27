# Motion lab — five prototypes

Five motion-graphic studies for this portfolio, built in the site's own world:
**The Night Workshop** — night-ink ground, a 60px measuring grid, one ember
ramp, Instrument Sans speaking and JetBrains Mono annotating.

Each prototype is a self-contained HTML scene whose every pixel is a pure
function of `t` in milliseconds. `capture.mjs` seeks a scene frame by frame in
headless Chromium and `encode.sh` writes the MP4 and the GIF, so a re-render
after a tweak is directly comparable — nothing depends on screen-recording
timing.

| # | Prototype | Surface it belongs to | The motion thesis |
|---|-----------|----------------------|-------------------|
| 1 | **Ignition** | Hero (`WordmarkHero`) | The name is struck once, like a match: a filament crosses the wordmark, the letters rise behind it, the ember heats the room, the portrait settles. One authored arrival. |
| 2 | **Bench assembly** | Project case-study card | The card is built on the bench: the frame is drawn like a plotter, the screenshot wipes in, the case-study rows land, one pass of light crosses the finished card. |
| 3 | **Measured header** | Projects section header | The human line rises through masks while the machine line measures it: a rule draws under the statement, its ticks follow the pen, and the six project names write themselves into a bottom index. |
| 4 | **Pointer light** | Project index rows | Pointer response, done quietly: the row does not move, the surface under it lifts, the name shifts 6px, the arrow arrives, and the preview slides out from behind the row with a mask. |
| 5 | **Bench handoff** | Page scroll / section rhythm | Scrolling as continuity: a sticky section index, a rail that fills, headings that arrive at the reading line, and a loop band that never stops. |

Open `review.html` for all five side by side, or the GIFs in `review/`.

## Regenerate

```bash
node capture.mjs all        # → frames/p1 … frames/p5 (PNG, 30fps, 1920×1080)
./encode.sh p1 p2 p3 p4 p5  # → out/*.mp4 (1280×720) + review/*.gif
```

`capture.mjs` needs a Chromium binary; it defaults to the Playwright cache and
honours `CHROME_PATH`. `encode.sh` needs `ffmpeg`.

## How this becomes production code

All five are CSS/DOM only — transforms, opacity, `clip-path`, masks. No WebGL,
no new dependency, nothing the current stack cannot express.

- Arrival pieces (1, 2, 3) port as a GSAP timeline or a Motion `animate()`
  sequence with the same numbers; the `render(t)` function maps one-to-one to
  keyframes.
- The hover piece (4) ports as CSS transitions plus a small pointer-follow
  light, reusing the existing `CursorLight`.
- The scroll piece (5) ports as a scroll-linked progress value, the same
  technique `WordmarkHero` already uses with its `--p` custom property.
- Reduced motion: arrival resolves instantly to the composed frame; hover keeps
  its colour and hairline change without the travel; scroll keeps the section
  rhythm without the parallax.

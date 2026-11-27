# Decisions

## 2026-11-23 — Lumina card replaced by GameStore TN

**Decision:** Drop the Lumina project card and put GameStore TN in its slot.

**Why:** Lumina's production demo (`ecommerce-website-puce-beta.vercel.app`) returns HTTP 500 on every dynamic route, so the card advertised work a visitor cannot open. GameStore TN is live, source-public, and keeps an ecommerce-style project on the site while showing the Arabic/RTL work.

**Alternative considered:** Waiting for a redeploy of Lumina, or promoting MustacharAI instead. MustacharAI's demo opens with no AI provider connected and an empty chat pane, so it reads worse as a card than a populated marketplace.

## 2026-11-23 — Hero portrait becomes a head-only 3D-style cutout

**Decision:** The wordmark hero shows a head-and-neck floating cutout (820×1150, transparent PNG, cropped from Amine's photo to the alpha bounding box) instead of the shoulders-and-suit photo, and the portrait box is sized around the head rather than the old 691×569 frame.

**Why:** The suit cutout read as a LinkedIn headshot and fought the oversized "AMINE" wordmark it sits on. Removing the shoulders and letting the CSS bottom fade eat the neck makes the head emerge from the dark background, and cutting to the head means the head itself gets bigger at the same box height.

**Alternative considered:** Keeping the shoulders and just cropping tighter — the blazer still cuts across the letters, and the bottom fade masks a chest instead of a neck.

## 2026-11-23 — Motion moves to state changes, not more entrances

**Decision:** New motion on the site targets state changes (press, disclosures, appearing panels) and each recipe animates the `scale`/`translate` properties or `transform` deliberately chosen per element, with `--ease-out` centralized in `:root` and mirrored from `src/lib/ease.ts`.

**Why:** Three entrance systems already run (GSAP ScrollReveal, AnimatedText word masks, CSS view-timelines), so adding more entrances would over-animate the page. The gaps were all single-frame teleports. Press feedback is declared on `:active` only so it cannot overwrite the hover transitions each element already has, and `scale`/`translate` are used where a utility class already owns `transform`, so the two never fight.

**Alternative considered:** A global `transition: transform` on every `a`/`button` — it would have replaced `transition-colors` utilities and killed every hover colour ease on the site.

## 2026-11-23 — Bridge the remaining teleports with `@starting-style`

**Decision:** Text swaps and returning panels get their entrance from `@starting-style` plus a keyed remount (`SwapLabel`), and lazy screenshots fade in over their existing scrim once decoded, gated on the prepaint `html.js` class.

**Why:** `@starting-style` needs no presence state or timers for a mount-only entrance, and a `key` on the label span is enough to make React throw the old text away and animate the new one. The screenshots are `loading="lazy"`, so the decode can land before React attaches `onLoad`; a mount check on `img.complete` covers the cached case and keeps six images from popping inside already-revealed cards.

**Alternative considered:** Switching the cards to `next/image` with a blur placeholder — the right long-term fix and it clears the `no-img-element` warning, but it changes image sizing and LCP behaviour, so it stays a separate change.

## 2026-11-23 — RakT3adiBot card leads with the AI and vision work

**Decision:** The RakT3adiBot card now describes the natural-language layer (allowlisted actions, confirmation gate, Gemini with NVIDIA fallback) and photo/PDF reading, and every mention of its test count moved from 85 to 130 (hero bio, marquee, project strip, card result, `PRODUCT.md`). The card's tags gain Gemini API and PyMuPDF, and the skills AI row lists RakT3adiBot.

**Why:** The bot repo shipped `feat/ai-natural-language` and the vision work after the copy was written, so the card advertised the 2/3 counter and left its two strongest features invisible. `pytest` in that repo collects and passes 130 tests, which makes the number safe to quote.

**Alternative considered:** Bumping only the test count — cheap, but keeps the card describing a bot that no longer matches the repo.

## 2026-11-26 — Technical toolkit rebuilt around what the repos prove

**Decision:** The skills section moves from five cards to six (grid `lg:grid-cols-3`), gains a Rust/axum backend row, renames "AI / Other" to "AI engineering", moves Cloudflare Workers/D1 out of DevOps (D1 now lives only under Data), adds Platform, AI, and Testing cards, and replaces every evidence line with an artifact instead of a tag echo. `Stripe` is removed because no repo in `~/` contains Stripe code, and `JavaScript`/`Flask`/`Git` are dropped as redundant or Internship-only.

**Why:** The repos carry signals the section never showed — `crypto-stocks` is a nine-crate Rust workspace gated on `cargo clippy -D warnings`, `Cast-Cue` runs OpenNext + Better Auth on D1, `BudgetIQ` has a Gemini→OpenRouter fallback with Upstash rate limiting, and six repos carry required CI. Meanwhile the old evidence rows repeated their own tags, which contradicts the `PRODUCT.md` principle that depth is the proof. Six cards in a four-column grid leave a ragged 4+2 row, so the grid moves to three.

**Alternative considered:** Keeping five cards and only rewriting tags — no layout churn, but it forces Rust, auth, rate limiting, and testing into cards they do not belong to, which is the category error the change exists to fix.

## 2026-11-27 — Motion prototypes are deterministic HTML scenes, captured to MP4

**Decision:** The five motion candidates live in `.motion-lab/` as standalone HTML scenes sharing `lab.css` and a `lib.js` clock, rendered by seeking `window.__seek(ms)` in headless Chromium and encoded with ffmpeg to 1280×720 MP4/GIF. The folder is gitignored; only the chosen prototype is ported into `src/components` as a real change.

**Why:** Five candidates have to be judged on the same footing, at frame-exact quality, without adding experimental code to the app or depending on a screen recorder's jitter. A pure function of `t` gives identical frames on every capture, so a re-render after a tweak is comparable. The machine has no GPU, so a CSS/DOM approach also keeps the prototypes portable to the site's existing stack (GSAP/motion, no WebGL).

**Alternative considered:** Recording the dev server with Playwright video — fewer files, but the capture inherits real-time jank and the review frames differ between runs; and building all five as Next routes would put discarded experiments on the production surface.

## 2026-11-27 — All five motion studies ship, each on its own surface

**Decision:** The five prototypes are implemented in the site rather than one: ignition on the wordmark (clip-path wipe + ember filament + sparks), bench assembly on the project cards (frame draw, screenshot wipe, staggered blocks), a measured header rule on Projects, a pointer light per card, and a fixed bench index rail (`SectionRail`) that tracks scroll and the active section.

**Why:** Each one answers a different question — arrival, component construction, section signature, pointer feedback, and continuity — so they do not compete for the same moment. Every animation starts from a visible composed state (`animation: both` with an explicit `from`), so a browser that cannot run the motion still shows the page, and `prefers-reduced-motion` resolves each to its composed frame.

**Alternative considered:** Shipping only the hero ignition — the strongest single moment, but it leaves the case-study cards and the section rhythm with the generic fade-up they already had.

## 2026-11-27 — Three of the five motion studies ship (supersedes the entry above)

**Decision:** Only ignition (hero), pointer light (project cards) and the bench index (`SectionRail`) ship. Bench assembly and the measured header were removed, along with `public/motion-lab/`, so the site does not serve the prototypes.

**Why:** Bench assembly competed with the pointer light on the same surface, and the measured rule read as a smudge at the site's hairline weights — neither carried its weight. The rail's active section is now computed from geometry on each scroll frame instead of an `IntersectionObserver` on a captured element: `Experience` swaps a static section for an animated one after mount, so the observed node was detached and `03` could never light up.

**Alternative considered:** Keeping all five and letting the reviewer drop them later — the two rejected pieces would have shipped noise on the two surfaces that already have the strongest content.

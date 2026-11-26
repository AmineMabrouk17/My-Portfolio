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

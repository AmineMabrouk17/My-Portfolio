# Visual review — critique round 2

Second full critique, run part by part (chrome/hero, identity, proof, conversion)
with four isolated design assessments plus a mechanical evidence pass.

| File | What it shows |
|---|---|
| `compare-hero.png` | Job title leaves the mono label register, three live projects appear, CTA says what it does |
| `compare-projects.png` | Case studies closed by default (first open is the bot), fewer duplicate words, warm scrim on foreign screenshots |
| `compare-contact.png` | Reply/scope reassurance, optional budget, larger fields, Gmail handoff (below the fold in this crop) |
| `compare-mobile.png` | 390×844: same shifts, nav now includes About |
| `v3-nojs.png` | JavaScript disabled: the whole page renders (was 100% blank) |
| `v3-validation.png` | Empty submit: error summary + field errors, no false success |
| `v3-arabic.png` | Arabic first paint with `lang="ar" dir="rtl"` restored before paint |
| `walkthrough.mp4` / `.gif` | Full scroll-through |

## What changed

```diff
 reveal
-  .reveal { opacity: 0 }
+  .reveal { opacity: 1 }
+  html.js .reveal { opacity: 0 }   /* armed before paint */

-  <Preloader />                    /* 600ms greeting, scroll locked */
+  (removed)

 hero
-  <p class="font-mono uppercase 11px">Full Stack Developer…</p>
+  <p class="text-[15px]">Full Stack Developer…</p>
+  <ul>Cast n Cue ↗ · BudgetIQ ↗ · Crypto & Stocks ↗</ul>

 nav
-  Work · Experience · Stack            (About missing, order reversed)
+  Work · About · Experience · Stack   (+ Escape, outside click, focus move)

 projects
-  defaultOpen={index === 0}            (crypto, longest card)
+  defaultOpen={slug === "rakt3adi"}    (the 85-test bot)
+  no link → "Ask about this build" mailto

 assets
-  6 PNGs, 3.56 MiB · demo.gif 7.6 MB unreferenced
+  6 WebP, ~185 KB · unreferenced files deleted
```

## Measured

| Metric | Before | After |
|---|---|---|
| Page height @1440 | 7,910px | **7,923px** |
| Projects section | 3,064px | **2,766px** |
| Referenced image weight | 3.56 MiB | **0.18 MiB** |
| `public/projects` total | 11.3 MiB | **0.2 MiB** |
| Detector error findings | 1 (`content-hidden-at-rest`) | **0** |
| Content rendered without JS | **0%** | **100%** |
| Detector total (desktop) | 11 | 11 (both documented patterns) |
| `low-contrast` | 0 | 0 |
| Interactivity: bots reachable | no | **yes (mailto)** |

Remaining detector notes are the two deliberate patterns: six mono section
labels and the 46px icon-tile card.

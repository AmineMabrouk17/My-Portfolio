# Visual review — portfolio critique fixes

Before/after evidence for the changes in `feat/portfolio-critique-fixes`.
The "before" captures are the deployed production build; the "after" captures
are this branch. Both at 1440×900 unless noted, `prefers-reduced-motion: reduce`
so ScrollTrigger reveals are settled rather than mid-animation.

| File | What it shows |
|---|---|
| `compare-hero.png` | Off-palette violet/lime replaced by the documented ramp; job title now rendered; availability reframed to freelance |
| `compare-contact.png` | Section 07 → 06; visible email address with copy control; heavier field borders; left-aligned action row |
| `compare-projects.png` | Three representations of the same six projects collapsed into one 2-up case-study grid |
| `compare-mobile.png` | 390×844 hero: availability copy, job title, warm accent, 44px social targets |
| `after-arabic.png` | Arabic reload with `lang="ar" dir="rtl"` preserved and Noto Kufi Arabic applied |
| `after-contact-validation.png` | Empty submit blocked with inline field errors instead of a false success |
| `walkthrough.mp4` | Full scroll-through of the branch (1280×720) |
| `walkthrough.gif` | Same pass, 8 fps preview |

## Measured

| Metric | Before | After |
|---|---|---|
| Detector findings (desktop) | 27 — 1 error, 11 warning | 13 — 0 error, 5 warning |
| `low-contrast` | 8 | 0 |
| `content-hidden-at-rest` | 1 (error, 41% of text) | 0 |
| Hydration error (React #418) | present | none |
| Page height at 1440px | 11,716px | 7,910px (−33%) |
| Projects section height | 6,647px | 2,964px (−55%) |
| Eager asset weight in hero | 7.5 MB GIF | 0 |
| Email address in page text | no | yes |

Remaining detector notes are the documented system choices: six numbered
section labels, the 46px icon-tile card pattern, and single-family typography.

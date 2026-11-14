# Visual review — palette and typography refresh

Second pass on the portfolio: the critique fixes kept the cool ground and the
single startup sans. This refresh re-tempers the room warm and gives type two
distinct voices.

| File | What it shows |
|---|---|
| `compare-hero.png` | Cool blue-black + Plus Jakarta → warm charcoal + Instrument Sans, mono eyebrow, copper availability dot, ember/flame headline |
| `compare-contact.png` | Warm panel, mono `06 / CONTACT`, 16px body, ember signal button |
| `compare-projects.png` | Mono labels and tags, ember demo buttons, warm card fills |
| `compare-mobile.png` | 390×844 hero, same shifts at small size |
| `compare-arabic.png` | Arabic with IBM Plex Sans Arabic in place of Noto Kufi |
| `walkthrough.mp4` / `walkthrough.gif` | Full scroll-through of the refresh |

## What changed

```diff
- font-family: "Plus Jakarta Sans"
+ font-family: "Instrument Sans"      /* speaks */
+ font-family: "JetBrains Mono"       /* annotates: labels, tags, dates */
+ font-family: "IBM Plex Sans Arabic" /* Arabic body, not a display face */

- --color-bg:      #0a0d14   /* 266°, cool blue */
+ --color-bg:      #0c0a0b   /* ~350°, warm charcoal */

- --color-accent:  #ff6b6b   /* coral */
- --color-accent-2:#ffa94d   /* amber */
- --color-accent-3:#FFE566   /* yellow */
+ --color-accent:  #ff6b47   /* kiln ember */
+ --color-accent-2:#ffa552   /* lamp flame */
+ --color-status:  #6fa89b   /* oxidised copper — status only */
```

## Measured

| Metric | Before | After |
|---|---|---|
| Detector findings (desktop) | 13 — 5 warning | **11 — 0 warning** |
| `overused-font` | 1 (Plus Jakarta Sans, 99%) | **0** |
| `low-contrast` | 0 | 0 |
| Body size | 15px | **16px** |
| Quiet text on raised surface | 4.49:1 | **4.92:1** |
| Field border on surface | 3.01:1 | **3.34:1** |
| Page height @1440 | 7,910px | 8,151px (+3%, larger body) |

Remaining findings are the two documented patterns: six numbered section
labels and the 46px icon-tile card (counted five times), both deliberate in
`DESIGN.md`.

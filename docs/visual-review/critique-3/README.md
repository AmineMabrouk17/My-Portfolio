# Visual review — critique round 3

Third pass. Four isolated design assessments (chrome, identity, proof, conversion)
plus mechanical evidence, then eight atomic commits.

| File | What it shows |
|---|---|
| `compare-hero.png` | The h1 names the three shipped artifacts instead of "clean architecture & CI/CD"; each live project gains a one-line description; the duplicated summary paragraph is gone |
| `compare-projects.png` | Filter row removed, every card says what it is before the case study, screenshots letterboxed instead of cropped |
| `compare-contact.png` | No-JS floor, visible Gmail/copy path, message takes the full row, "What are you building?" |
| `compare-mobile.png` | 390×844 |
| `r3-validation.png` | Empty submit: summary + field errors |
| `r3-arabic.png` | Arabic display type with Latin tracking removed |
| `walkthrough.mp4` / `.gif` | Full scroll-through |

## What changed

```diff
 hero
-  "I build full-stack web apps with clean architecture & CI/CD"
+  "I built an Arabic exam bot, a Stripe storefront, and an AI finance dashboard, end to end."
-  <p>{hero.summary}</p>            /* restated the headline */
+  three links, each with a one-line description

 projects
-  <ProjectFilter />                /* framework + capability + property + channel */
-  defaultOpen={slug === "rakt3adi"} /* row 3 — off-screen on arrival */
+  every card: title, one-line "what it is", closed case study
+  1200x800 letterboxed WebP      /* was cropped 29-34% at desktop */
+  alt="<project> — product screenshot"
+  aria-controls panel always exists

 nav / i18n
+  nav.language  ("Language" / "Langue" / "اللغة")   /* was leaking the key */
+  skip link, 44px language trigger, focus returned on Escape
+  dates move to locale files

 contact
+  action="mailto:" method="post" enctype="text/plain"  /* no-JS floor */
+  Gmail + copy-draft reachable before submitting
+  copy feedback is per target
```

## Measured

| Metric | Before | After |
|---|---|---|
| Page height @1440 | 7,923px | **7,687px** |
| Referenced image weight | 187,670 B | **204 KB** (letterboxed, still <10% of originals) |
| Cropped pixels at desktop | 29–34% on 4 of 6 images | **0** |
| Detector errors / warnings | 0 / 6 | **0 / 6** (both documented patterns) |
| Dangling `aria-controls` | 5 | **0** |
| Buttons with identical names | 5 | **0** |
| Screenshots with no alt | 6 | **0** |
| `nav.language` key | missing (leaked as text) | **present in 3 locales** |
| Form without JS | silent reload, data discarded | **opens the mail client** |

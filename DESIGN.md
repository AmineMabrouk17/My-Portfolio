---
name: Amine Mabrouk Portfolio
description: A warm charcoal workshop where ember light marks what matters.
colors:
  kiln-ember: "#ff6b47"
  lamp-flame: "#ffa552"
  oxidised-copper: "#6fa89b"
  ember-deep: "#d9553a"
  night-ink: "#0c0a0b"
  night-ink-2: "#120f10"
  bench-slate: "#171213"
  bench-slate-raised: "#221a1a"
  graphite: "#a89e97"
  graphite-deep: "#928881"
  chalk: "#f3ece6"
  hairline: "rgba(243, 236, 230, 0.08)"
  hairline-strong: "rgba(243, 236, 230, 0.13)"
  field-border: "#72665e"
  nav-shell: "rgba(23, 18, 19, 0.72)"
  menu-shadow: "rgba(0, 0, 0, 0.6)"
typography:
  display:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 4.4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(32px, 4.2vw, 46px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  small:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.16em"
  micro:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.12em"
rounded:
  pill: "999px"
  panel: "28px"
  card: "18px"
  field: "12px"
  chip: "8px"
  tag: "6px"
spacing:
  hair: "6px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "26px"
  xl: "32px"
  panel: "60px"
  section: "90px"
components:
  button-primary:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.chalk}"
    rounded: "{rounded.pill}"
  button-signal:
    backgroundColor: "{colors.kiln-ember}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.field}"
    padding: "14px 28px"
  chip-tech:
    backgroundColor: "rgba(243, 236, 230, 0.04)"
    textColor: "{colors.graphite}"
    rounded: "{rounded.chip}"
    padding: "5px 11px"
  chip-tag:
    backgroundColor: "rgba(243, 236, 230, 0.04)"
    textColor: "{colors.graphite}"
    rounded: "{rounded.tag}"
    padding: "4px 10px"
  card-surface:
    backgroundColor: "{colors.bench-slate}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.card}"
    padding: "{spacing.lg}"
  input-field:
    backgroundColor: "rgba(243, 236, 230, 0.04)"
    textColor: "{colors.chalk}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  nav-shell:
    backgroundColor: "rgba(23, 18, 19, 0.72)"
    textColor: "{colors.chalk}"
    rounded: "{rounded.pill}"
    padding: "5px 6px 5px 24px"
---

# Design System: Amine Mabrouk Portfolio

## Overview

**Creative North Star: "The Night Workshop"**

The site is a workshop after dark: a warm charcoal room, a bench of finished artifacts, and ember task lighting that falls only where someone is working. The darkness is not moody for its own sake — it is what makes the light legible. Ember and flame behave like lamp filaments and solder points: small, hot, and never used as wallpaper.

Density is moderate and rhythmic. Each section opens the same way — a mono label in warm type, a headline pinned to the left edge, a muted sub-line across the page — then fills the bench with a single kind of artifact: skill cards, a timeline, project entries, a contact panel. Nothing floats free of the ground.

Motion is the workshop's tell. Elements arrive as if placed rather than animated: a 30px rise on reveal, spring physics on tilt and press, a magnetic pull on the primary actions. It reads as confident handling, not spectacle. The first viewport establishes the warm ramp immediately — there is no second palette anywhere on the page.

**Key Characteristics:**
- Warm charcoal ground with a subtle 60px grid and two warm glows plus one cold
- Ember used as signal, never as fill area; one cool hue reserved for status
- Two families with distinct jobs: Instrument Sans speaks, JetBrains Mono annotates
- Flat surfaces at rest; shadow reserved for things that float
- Pills for controls, 18px cards for artifacts, 28px panel for the contact close
- Spring-and-magnet interaction vocabulary

## Colors

A warm charcoal room interrupted by a single ember ramp, with one cold light reserved for status.

### Primary
- **Kiln Ember** — the system accent and action color. Section labels, timeline rule and nodes, input focus borders, link hovers, the contact submit button, the required-field asterisk, and every "View Live Demo" control. This is the mark that something is active.
- **Lamp Flame** — the hot partner. Appears inside the shared gradient, the contact panel's wash, project title slashes, and case-study keys; almost never as a large fill.
- **Ember Deep** — the pressed/deep step, used in the ambient glow behind the About section.

### Tertiary
- **Oxidised Copper** — status only. The availability dot and its label, plus the third accent diamond in the looping strip. It is the one cool hue on the page; using it for an action would break the system.

### Neutral
- **Night Ink** — the page ground and the text color on any filled warm or light control.
- **Night Ink 2** — the recessed ground behind card interiors and the timeline rail.
- **Bench Slate** — the standard card and panel fill.
- **Bench Slate Raised** — card hover fill; one step up, never more.
- **Chalk** — primary text and the fill of the inverted primary pill.
- **Graphite** — body and secondary text inside sections.
- **Graphite Deep** — the quietest text: dates, tag lettering, placeholders. Tuned to 5.08:1 on surface and 4.92:1 on the raised fill so the quiet register never drops below AA.
- **Hairline** / **Hairline Strong** — every decorative border on the page; borders replace shadows as the primary separator.
- **Field Border** — the boundary of an interactive control (inputs, filter chips, ghost buttons). Deliberately heavier than a hairline so the control is perceivable at 3:1 against the surface.

### Named Rules
**The Workbench Rule.** Warm color marks an active thing — a label, a focus ring, a live control, a hover rule. If warm color is covering more than a small fraction of a viewport, it has become decoration and the design is wrong.

**The One Ramp Rule.** Ember and flame are two intensities of one light, not two brand colors. There is no yellow and no second warm hue. The single cool hue (Oxidised Copper) is status, and status is never an action.

**The Warm Room Rule.** Neutrals sit at ~15° hue with 0.004–0.013 chroma. A cool grey next to the ember ramp reads as a different room, so surface tints stay warm even when they are almost black.

## Typography

**Display Font:** Instrument Sans (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Instrument Sans — same family, no second voice
**Label/Mono Font:** JetBrains Mono — the annotation register

**Character:** A narrow, slightly technical grotesque that speaks, and a mono that annotates. Hierarchy comes from size jumps, tight negative tracking on the big lines, and the shift from proportional to fixed-width for machine data. Nothing is italic, nothing is serif, nothing is decorative. Arabic switches to IBM Plex Sans Arabic — a body face, not a display face, documented as the RTL counterpart.

### Hierarchy
- **Display** (600, clamp 2.5rem–4.4rem, 1.05, -0.025em): hero headline only, max width 980px.
- **Headline** (700, clamp 32px–46px, 1.05, -0.025em): every section's `h2`.
- **Title** (600, 21px, 1.3, -0.02em): project titles, card headings, job titles.
- **Body** (400, 16px, 1.65): section sub-lines capped near 46–60ch; hero summary steps up to clamp 1.05rem–1.25rem and caps at 580px.
- **Small** (500, 14px, 1.5): nav links, buttons, form labels.
- **Label** (500 mono, 12px, 0.16em): the numbered section eyebrows (`01 / ABOUT`). Always warm, always uppercase, always mono.
- **Micro** (500 mono, 11px, 0.12em): project sub-lines, tech tags, dates, the looping strip.

### Named Rules
**The Two Voices Rule.** Instrument Sans speaks; JetBrains Mono annotates. Mono never sets a sentence and sans never sets a section number. A third family requires a new role, not a mood.

**The Tight Head Rule.** Anything at 19px or larger gets negative tracking. Headlines at -0.025em, display at -0.025em. Untracked large type reads as unfinished.

**The Sixteen Floor Rule.** Body copy never drops below 16px on the web. Dense metadata can use the micro step, but a paragraph may not.

## Layout

A single centered column, 1200px max with 32px gutters; the hero narrows to 1120px to keep its long headline inside a comfortable measure. Sections stack with 90px of vertical air (70px below the `lg` breakpoint), and each opens with the same header pattern: mono label, headline, muted sub-line, either beside it or stacked beneath.

Cards arrange on a 4-column grid at `lg`, 2 at `sm`, 1 below — with the fifth card allowed to span the full row rather than leaving a hole. Projects run **two-up at `lg`** with a 3:2 crop, which keeps all six case studies within about three screens. The experience section switches to a two-column layout at `md`: a 132px sticky rail holding the timeline indicator, and the card stack beside it.

Spacing steps are 6 / 8 / 12 / 16 / 26 / 32 / 60 / 90. Card interiors sit at 26px, the contact panel at 60px, tag gaps at 7–8px. Density is deliberately even: no section is allowed to feel tighter than another.

Mobile is a true reflow, not a squeeze: the floating nav collapses to a centered dropdown panel below `lg`, and the contact form goes from two columns to one.

## Elevation & Depth

Flat at rest. Depth is carried by border and tone, not by shadow: a card is a slightly lighter rectangle on a darker ground, separated by a 1px warm hairline. Hover raises the fill one step and strengthens the border; that is the entire resting-to-hover elevation story.

Shadow appears only for elements that genuinely float above the page — the pill nav and the hero's primary CTA — where a deep, soft, downward shadow sells the detachment.

### Shadow Vocabulary
- **Floating shell** (`0 20px 40px rgba(0, 0, 0, 0.45)`): the nav pill and the hero primary CTA. Nothing else.
- **Hero CTA** (`0 20px 40px rgba(0, 0, 0, 0.45)`): same value, deliberately the same language.
- **Demo button hover** (`0 8px 24px -8px` in a 40% mix of the button's own color): the only colored shadow on the page, and only on hover.

### Named Rules
**The Flat-Bench Rule.** A card that is not floating does not cast a shadow. If a surface needs to feel more important, raise its fill one step and strengthen its border — do not add a drop shadow.

## Shapes

Pills for anything you press: the nav shell, the primary CTA, the language switcher, the contact link. Cards land at 18px with an inner 12px icon tile; the contact panel closes the page at 28px. Chips run smaller — 8px for tech pills, 6px for uppercase project tags.

Borders are 1px hairlines almost everywhere; the timeline is the exception, using a 2px warm rule with ringed nodes sitting on it. There is no clipping, no notch, no asymmetric corner. The only "shape" gesture is the gradient hairline that appears across the top edge of a skill card on hover — a 2px line of the warm ramp, which is what the light does when you tilt a panel.

Radii are consistent with size: the bigger the surface, the larger the radius. Never mix a large radius onto a small control.

## Components

### Buttons
- **Shape:** full pill (999px) for the floating and hero actions; 12px for in-panel actions.
- **Primary:** inverted — Chalk fill, Night Ink text, 12px 24px, 16px semibold. Reads as a lit surface against the dark room, not as a colored button.
- **Signal:** Kiln Ember fill, Night Ink text, 12px radius. Used for the contact submit and every project's "View Live Demo" action — the two places a visitor is asked to leave the page.
- **Secondary / Ghost:** transparent with a field border, Chalk text; hover lifts 1px and brightens the border. Project "Source Code" uses this.
- **Hover / Focus:** `translateY(-1px)` plus a small opacity shift, 200ms. No color inversion, no scale.

### Chips
- **Style:** warm white/4% fill, warm hairline, Graphite text. Tech chips at 12px/8px radius with a 13px brand icon leading; project tags at 11px mono uppercase/6px radius.
- **State:** filter chips express selection with the ember border and a 10% ember wash, never with a white fill; they carry `aria-pressed`.

### Cards / Containers
- **Corner Style:** 18px (skills, timeline, project rows).
- **Background:** Bench Slate at rest, Bench Slate Raised on hover.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px Hairline, strengthening to Hairline Strong on hover.
- **Internal Padding:** 26px standard, 24px on the timeline card at small sizes.

### Inputs / Fields
- **Style:** warm white/4% fill, Field Border, 12px radius, 12px 16px, Chalk text, Graphite Deep placeholder.
- **Focus:** border shifts to Kiln Ember and the fill rises to warm white/6%. No glow, no ring beyond the border.
- **Error:** the border stays ember and a 12px message sits under the field, wired with `aria-invalid` and `aria-describedby`.

### Navigation
- **Style:** a floating pill, centered, 52px tall, max 620px wide, warm semi-transparent fill with a heavy backdrop blur and the floating-shell shadow. Wordmark "A M" at 14px/0.22em uppercase; links at 14px medium in Graphite, brightening to Chalk on hover; the contact CTA is the inverted Chalk pill with an arrow icon.
- **Mobile:** below the `lg` breakpoint the links and language switcher collapse into a centered dropdown panel under the pill — 98% opaque warm dark, 16px radius, 220px minimum width.

### Section Header (signature)
The recurring opening of every section, and the thing that most makes the page feel authored: a mono 12px label tracked at 0.16em (`01 / ABOUT`), a 46px headline with the section's `h2` animated word by word under a mask, and a muted sub-line at 16px capped near 60ch. It appears seven times and must not be reinvented per section.

### Contact Panel (signature)
A 28px-radius panel closing the page, filled with a 6% wash of ember fading into 6% flame, bordered at Hairline Strong, with a single large radial warm glow bleeding from the top center. It is the only large warm-tinted surface in the system, and it earns that exception by being the conversion moment.

## Do's and Don'ts

### Do:
- **Do** keep warm color on marks, labels, focus states, and small controls; measure it as a fraction of the viewport, not of the brand.
- **Do** use the 90px / 70px section rhythm and the shared header pattern on any new section.
- **Do** carry depth with a hairline and a one-step fill change.
- **Do** put negative tracking on anything 19px or larger.
- **Do** set numbers and dates in JetBrains Mono with tabular figures.
- **Do** respect `prefers-reduced-motion`: reveals resolve instantly and Lenis smooth scroll is switched off.
- **Do** give every interactive control a 44×44px hit area, even when the visible dot or chip is smaller.
- **Do** test every new surface in Arabic RTL — `lang`/`dir` are synced from the stored locale, and layout uses logical properties.

### Don't:
- **Don't** introduce a third warm hue. There is exactly one ramp; copper is status, not a second accent.
- **Don't** use the warm **gradient** as a fill; it belongs to hairlines, text, and the contact panel wash. A solid accent fill is allowed only on a small control (signal button, focus ring, active filter border).
- **Don't** use Oxidised Copper for a button, link, or focus ring.
- **Don't** add a drop shadow to a resting card.
- **Don't** set body copy below 16px, or set a paragraph in mono.
- **Don't** mix radii — pills for controls, 18px cards, 28px panel, nothing in between.
- **Don't** animate anything that the visitor did not ask for on the operate-style surfaces (form fields, nav); motion belongs to arrival and to pointer response.

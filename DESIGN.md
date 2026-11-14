---
name: Amine Mabrouk Portfolio
description: A dark workshop surface where warm light marks what matters.
colors:
  kiln-coral: "#ff6b6b"
  task-amber: "#ffa94d"
  solder-yellow: "#FFE566"
  ember-deep: "#E05D5D"
  night-ink: "#0a0d14"
  night-ink-2: "#0f1320"
  bench-slate: "#141a28"
  bench-slate-raised: "#1a2234"
  graphite: "#8b93a7"
  graphite-deep: "#808a9e"
  chalk: "#e8ecf4"
  hairline: "rgba(255, 255, 255, 0.08)"
  hairline-strong: "rgba(255, 255, 255, 0.12)"
  field-border: "#5c6679"
  nav-shell: "rgba(24, 26, 30, 0.72)"
  menu-shadow: "rgba(0, 0, 0, 0.6)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(30px, 4vw, 44px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.15em"
  small:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
  micro:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11.5px"
    fontWeight: 600
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
    backgroundColor: "{colors.kiln-coral}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.field}"
    padding: "14px 28px"
  chip-tech:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.graphite}"
    rounded: "{rounded.chip}"
    padding: "5px 11px"
  chip-tag:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.graphite}"
    rounded: "{rounded.tag}"
    padding: "4px 10px"
  card-surface:
    backgroundColor: "{colors.bench-slate}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.card}"
    padding: "{spacing.lg}"
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.chalk}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  nav-shell:
    backgroundColor: "rgba(24, 26, 30, 0.72)"
    textColor: "{colors.chalk}"
    rounded: "{rounded.pill}"
    padding: "5px 6px 5px 24px"
---

# Design System: Amine Mabrouk Portfolio

## Overview

**Creative North Star: "The Night Workshop"**

The site is a workshop after dark: a near-black room, a bench of finished artifacts, and warm task lighting that falls only where someone is working. The darkness is not moody for its own sake — it is what makes the light legible. Coral, amber, and yellow behave like lamp filaments and solder points: small, hot, and never used as wallpaper.

Density is moderate and rhythmic. Each section opens the same way — a numbered label in warm type, a headline pinned to the left edge, a muted sub-line across the page — then fills the bench with a single kind of artifact: skill cards, a timeline, project entries, a contact panel. Nothing floats free of the ground.

Motion is the workshop's tell. Elements arrive as if placed rather than animated: a 30px rise on reveal, spring physics on tilt and press, a magnetic pull on the primary actions. It reads as confident handling, not spectacle. The first viewport establishes the warm ramp immediately — there is no second palette anywhere on the page.

**Key Characteristics:**
- Near-black ground with a subtle 60px grid and three radial warm glows
- Warm ramp used as signal, never as fill area
- One type family, hierarchy carried by size, weight, and negative tracking
- Flat surfaces at rest; shadow reserved for things that float
- Pills for controls, 18px cards for artifacts, 28px panel for the contact close
- Spring-and-magnet interaction vocabulary

## Colors

A dark neutral ground interrupted by a single warm ramp that gets hotter as it gets smaller.

### Primary
- **Kiln Coral** — the system accent. Section number labels, timeline rule and nodes, input focus borders, link hovers, the contact submit button, and the required-field asterisk. This is the mark that something is active.
- **Task-Lamp Amber** — the gradient partner. Appears almost exclusively inside the shared warm gradient and the contact panel's wash; rarely as a standalone fill.
- **Solder Yellow** — the brightest and rarest. Project title slashes, the "View Live Demo" button, and the top hover rule on skill cards. Used where the page wants a point of heat, not a surface.

### Neutral
- **Night Ink** — the page ground and the text color on any filled warm or light control.
- **Night Ink 2** — the recessed ground behind card interiors and the timeline rail.
- **Bench Slate** — the standard card and panel fill.
- **Bench Slate Raised** — card hover fill; one step up, never more.
- **Chalk** — primary text and the fill of the inverted primary pill.
- **Graphite** — body and secondary text inside sections.
- **Graphite Deep** — the quietest text: dates, tag lettering, placeholders. Tuned to 4.52:1 on the chip composite so the quiet register never drops below AA.
- **Hairline** / **Hairline Strong** — every decorative border on the page; borders replace shadows as the primary separator.
- **Field Border** — the boundary of an interactive control (inputs, filter chips, ghost buttons). Deliberately heavier than a hairline so the control is perceivable at 3:1 against the surface.

### Named Rules
**The Workbench Rule.** Warm color marks an active thing — a label, a focus ring, a live control, a hover rule. If warm color is covering more than a small fraction of a viewport, it has become decoration and the design is wrong.

**The One Ramp Rule.** Coral, amber, and yellow are three intensities of one light, not three brand colors. There is no fourth hue on the page, and no second accent for status: "available" is Solder Yellow in the hero and nowhere else.

## Typography

**Display Font:** Plus Jakarta Sans (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Plus Jakarta Sans — same family, no second voice
**Label/Mono Font:** none; uppercase tracked labels carry the "data" register instead

**Character:** One geometric-humanist sans doing all the work. Hierarchy comes from size jumps and tight negative tracking on the big lines, so headings read as machined rather than styled. Nothing is italic, nothing is serif, nothing is decorative. Arabic switches to Noto Kufi Arabic — the documented counterpart for RTL, not a second voice.

### Hierarchy
- **Display** (600, clamp 2.4rem–4.6rem, 1.14, -0.035em): hero headline only, max width 980px.
- **Headline** (700, clamp 30px–44px, 1.0, -0.03em): every section's `h2`. Lead with `0`, not with extra margin.
- **Title** (600, 21px, 1.375, -0.02em): project titles, card headings, job titles.
- **Body** (400, 15px, 1.6): section sub-lines capped near 46–60ch; hero summary steps up to clamp 1.05rem–1.25rem and caps at 580px.
- **Label** (500, 13px, 0.15em): the numbered section eyebrows (`01 / ABOUT`). Always warm, always uppercase.
- **Micro** (600, 11.5px, 0.12em): project tech tags, uppercase, the smallest text allowed on the page.

### Named Rules
**The Single Voice Rule.** One family. If a new surface seems to need a second typeface, it needs a different weight or tracking instead.

**The Tight Head Rule.** Anything at 19px or larger gets negative tracking. Headlines at -0.03em, display at -0.035em. Untracked large type reads as unfinished.

## Layout

A single centered column, 1200px max with 32px gutters; the hero narrows to 1120px to keep its long headline inside a comfortable measure. Sections stack with 90px of vertical air (70px below the `lg` breakpoint), and each opens with the same header pattern: numbered label, headline, muted sub-line, either beside it or stacked beneath.

Cards arrange on a 4-column grid at `lg`, 2 at `sm`, 1 below — with the fifth card allowed to span the full row rather than leaving a hole. Projects run **two-up at `lg`** with a 3:2 crop, which keeps all six case studies within about three screens. The experience section switches to a two-column layout at `md`: a 132px sticky rail holding the timeline indicator, and the card stack beside it.

Spacing steps are 6 / 8 / 12 / 16 / 26 / 32 / 60 / 90. Card interiors sit at 26px, the contact panel at 60px, tag gaps at 7–8px. Density is deliberately even: no section is allowed to feel tighter than another.

Mobile is a true reflow, not a squeeze: the floating nav collapses to a centered dropdown panel below `lg`, and the contact form goes from two columns to one.

## Elevation & Depth

Flat at rest. Depth is carried by border and tone, not by shadow: a card is a slightly lighter rectangle on a darker ground, separated by a 1px white/8% hairline. Hover raises the fill one step and strengthens the border to white/12%; that is the entire resting-to-hover elevation story.

Shadow appears only for elements that genuinely float above the page — the pill nav and the hero's primary CTA — where a deep, soft, downward shadow sells the detachment.

### Shadow Vocabulary
- **Floating shell** (`0 20px 40px rgba(0, 0, 0, 0.45)`): the nav pill and the hero primary CTA. Nothing else.
- **Hero CTA** (`0 20px 40px rgba(0, 0, 0, 0.45)`): same value, deliberately the same language.
- **Demo button hover** (`0 8px 24px -8px` in a 40% mix of the button's own color): the only colored shadow on the page, and only on hover.

### Named Rules
**The Flat-Bench Rule.** A card that is not floating does not cast a shadow. If a surface needs to feel more important, raise its fill one step and strengthen its border — do not add a drop shadow.

## Shapes

Pills for anything you press: the nav shell, the primary CTA, the language switcher, the contact link. Cards land at 18px with an inner 12px icon tile; the contact panel closes the page at 28px. Chips run smaller — 8px for tech pills, 6px for uppercase project tags.

Borders are 1px hairlines almost everywhere; the timeline is the exception, using a 2px warm rule with 17px ringed nodes sitting on it. There is no clipping, no notch, no asymmetric corner. The only "shape" gesture is the gradient hairline that appears across the top edge of a skill card on hover — a 2px line of the warm ramp, which is what the light does when you tilt a panel.

Radii are consistent with size: the bigger the surface, the larger the radius. Never mix a large radius onto a small control.

## Components

### Buttons
- **Shape:** full pill (999px) for the floating and hero actions; 12px for in-panel actions.
- **Primary:** inverted — Chalk fill, Night Ink text, 12px 24px, 15px semibold. Reads as a lit surface against the dark room, not as a colored button.
- **Signal:** Kiln Coral fill, Night Ink text, 12px radius. Used for the contact submit and every project's "View Live Demo" action — the two places a visitor is asked to leave the page.
- **Secondary / Ghost:** transparent with a hairline border, Chalk text; hover lifts 1px and brightens the border. Project "Source Code" uses this.
- **Hover / Focus:** `translateY(-1px)` plus a small opacity shift, 200ms. No color inversion, no scale.

### Chips
- **Style:** white/4% fill, white/8% hairline, Graphite text. Tech chips at 12.5px/8px radius with a 13px brand icon leading; project tags at 11.5px uppercase/6px radius.
- **State:** filter chips express selection with the coral border and a 10% coral wash, never with a white fill; they carry `aria-pressed`.

### Cards / Containers
- **Corner Style:** 18px (skills, timeline, project rows).
- **Background:** Bench Slate at rest, Bench Slate Raised on hover.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px Hairline, strengthening to Hairline Strong on hover.
- **Internal Padding:** 26px standard, 24px on the timeline card at small sizes.

### Inputs / Fields
- **Style:** white/4% fill, Hairline Strong border, 12px radius, 12px 16px, Chalk text, Graphite Deep placeholder.
- **Focus:** border shifts to Kiln Coral and the fill rises to white/6%. No glow, no ring beyond the border.
- **Error / Disabled:** not implemented; the form validates natively and then hands off to the user's mail client.

### Navigation
- **Style:** a floating pill, centered, 52px tall, max 620px wide, semi-transparent dark fill with a heavy backdrop blur and the floating-shell shadow. Wordmark "A M" at 0.88rem/0.22em uppercase; links at 0.86rem medium in Graphite, brightening to Chalk on hover; the contact CTA is the inverted Chalk pill with an arrow icon.
- **Mobile:** below `lg` the links and language switcher collapse into a centered dropdown panel under the pill — 98% opaque dark, 16px radius, 220px minimum width.

### Section Header (signature)
The recurring opening of every section, and the thing that most makes the page feel authored: a warm 13px label tracked at 0.15em (`01 / ABOUT`), an optional 2px warm `+`-style marker, a 44px headline with the section's `h2` animated word by word under a mask, and a muted sub-line at 15px capped near 46ch. It appears seven times and must not be reinvented per section.

### Contact Panel (signature)
A 28px-radius panel closing the page, filled with a 6% wash of coral fading into 6% amber, bordered at Hairline Strong, with a single large radial warm glow bleeding from the top center. It is the only large warm-tinted surface in the system, and it earns that exception by being the conversion moment.

## Do's and Don'ts

### Do:
- **Do** keep warm color on marks, labels, focus states, and small controls; measure it as a fraction of the viewport, not of the brand.
- **Do** use the 90px / 70px section rhythm and the shared header pattern on any new section.
- **Do** carry depth with a hairline and a one-step fill change.
- **Do** put negative tracking on anything 19px or larger.
- **Do** respect `prefers-reduced-motion`: reveals resolve instantly and Lenis smooth scroll is switched off.
- **Do** give every interactive control a 44×44px hit area, even when the visible dot or chip is smaller.
- **Do** test every new surface in Arabic RTL — `lang`/`dir` are synced from the stored locale, and layout uses logical properties.

### Don't:
- **Don't** introduce a fourth accent hue. There is exactly one ramp on the page.
- **Don't** use the warm **gradient** as a fill; it belongs to hairlines, text, and the contact panel wash. A solid accent fill is allowed only on a small control (signal button, focus ring, active filter border).
- **Don't** add a drop shadow to a resting card.
- **Don't** add a second typeface for "editorial" or "technical" flavor. Arabic uses Noto Kufi Arabic as the documented counterpart, not a stylistic choice.
- **Don't** mix radii — pills for controls, 18px cards, 28px panel, nothing in between.
- **Don't** animate anything that the visitor did not ask for on the operate-style surfaces (form fields, nav); motion belongs to arrival and to pointer response.

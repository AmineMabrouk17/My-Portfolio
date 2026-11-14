# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring managers (primary).** Reviewing candidates for full-stack roles, mostly remote-international with Tunisia as a secondary market. They skim for evidence of shipped production work, then look for a reason to start a conversation.
- **Freelance clients (secondary).** Businesses or founders with a concrete build in mind who want to judge capability and fit before inquiring.

Both arrive with low patience and no prior context on Amine. The portfolio is read in one sitting on a laptop, often alongside a dozen others.

## Product Purpose

A personal portfolio for Amine Mabrouk, Full Stack Developer. It exists to convert a skim into a conversation — a call, a message, or a project inquiry — by showing real, running work rather than describing it. Success means an inbound contact that references a specific project.

## Positioning

Range with delivery depth: production full-stack web platforms (Angular/Laravel, Next.js, Cloudflare, Supabase) and shipped Telegram bots, all built end to end — schema, API, UI, deployment, CI/CD — rather than one narrow stack demonstrated ten times. The claim a neighboring portfolio could not copy is that the same person ships an Arabic exam-planner bot, a Stripe storefront, and an AI finance dashboard.

## Operating Context

- Based in Tunis, Tunisia; targets remote international roles and clients, with local roles as a secondary path.
- Works in English, French, and Arabic; the site serves all three, including Arabic RTL.
- **Current availability is freelance-only.** The site must not imply an open full-time job search.
- Part of the evaluation happens against the site itself: its motion, i18n, and structure are read as a sample of the person's craft.

## Capabilities and Constraints

- Next.js 16 App Router, TypeScript, Tailwind CSS v4, pnpm. GSAP + Lenis + Motion for animation.
- Single-page narrative on `/`: Hero, About, Skills, Experience, Projects, Education, Contact, plus case-study drawers per project.
- i18n across `en` / `fr` / `ar` with a language switcher; copy lives in `src/i18n/locales/*/common.json`.
- Deployment: Vercel (`my-portfolio-seven-chi-94.vercel.app`).
- `/landing-1`, `/landing-2`, `/landing-3` and the legacy root HTML files were removed in `5a12ab1`; `AGENTS.md` still lists them and is stale.
- The `/concepts/gumroad` and `/concepts/redeemly` pages are not to be invested in further; they are slated for deletion and must not be treated as portfolio evidence.
- Contact is a `mailto:` form, not a server-side submission.
- Undecided: whether a paid-services/pricing signal belongs on the site at all.

## Brand Commitments

- Name: **Amine Mabrouk**. Voice: plain, specific, evidence-led; no buzzword inflation.
- Contact: `amx72001@gmail.com`; GitHub `AmineMabrouk17`.
- Existing visual identity (warm charcoal ground, ember/flame ramp, copper status, Instrument Sans + JetBrains Mono) is the incumbent world; changing it is a redesign decision, not a polish decision. See `DESIGN.md`.

## Evidence on Hand

Real, publicly reachable projects with live URLs and source repos, as curated in `src/components/sections/Projects.tsx`:

- Cast n Cue — Next.js on Cloudflare Workers + D1, TMDB/Trakt/TVmaze, Better Auth.
- Lumina — Next.js + Supabase + Stripe commerce platform.
- BudgetIQ — Next.js + Supabase + Gemini AI budget planner.
- RakT3adiBot — Python Telegram exam-revision bot, 85 tests.
- SaletBot — Python Telegram prayer-times/athkar bot.
- Crypto & Stocks Dashboard — real-time Binance WebSocket + Yahoo Finance.

Also factual: Full Stack Developer at Infraway on the Nouara platform; a State Engineering Degree in Computer Science (M.Sc. equivalent); screenshots under `public/projects/`.

Absent and must not be fabricated: client testimonials, commercial results, revenue or performance benchmarks, named employers other than Infraway, and any claim that the two concept pages were client work.

## Product Principles

1. **Show running work over describing intent.** A visitor should reach a live URL within one interaction.
2. **Availability claims must stay current.** Freelance-only today; no open-job-search signals.
3. **Range is the argument, depth is the proof.** Breadth across web platforms and bots only persuades alongside production detail.
4. **Never trade truth for polish.** No invented metrics, clients, or outcomes.
5. **The site is itself a work sample.** Craft on the page is read as skill, so regressions there cost credibility.

## Accessibility & Inclusion

Arabic (RTL) is a first-class locale, not a translation afterthought. No formal conformance target (WCAG level) has been decided.

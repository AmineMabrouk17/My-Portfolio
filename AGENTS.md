# Agents

## Commit Message Convention

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>
```

### Types

| Type | Use for |
|------|---------|
| `feat` | New feature or section |
| `fix` | Bug fix |
| `style` | CSS/visual changes (no logic change) |
| `refactor` | Code restructuring (no feature/fix) |
| `chore` | Tooling, config, housekeeping |
| `docs` | Documentation only |
| `perf` | Performance improvement |

### Rules

- Use imperative mood: "add" not "added"
- Keep description under 72 characters
- No period at the end
- Scope is optional: `feat: add dark mode` or `feat(dark-mode): add toggle`

### Examples

```
feat: add proactive concept designs section
fix: hero card content clipping
style: switch to warm color palette
chore: add AGENTS.md with commit convention
docs: update README with setup instructions
```

### AI Agent Credit

Do NOT add `Co-Authored-By` or any other self-credit trailer for AI coding agents (Claude Code, etc.) in commit messages. Commits should read as if written by the repo owner.

## Lint & Typecheck

Run after every commit (or before pushing):

```bash
pnpm lint && pnpm tsc --noEmit
```

Fix all errors before committing. Warnings are acceptable but should be cleaned up over time.

## Package Manager

Use **pnpm** for all package management commands:

```bash
pnpm install          # Install dependencies
pnpm add <pkg>        # Add a dependency
pnpm add -D <pkg>     # Add a dev dependency
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm

## Project Status

Migration from vanilla HTML to Next.js App Router is complete:

| Section | Status | Commit |
|---------|--------|--------|
| Project scaffold | Done | `ec222f9` |
| Global styles & theme | Done | `d23b52f` |
| i18n (EN/FR/AR) | Done | `7cdf432` |
| Navbar, Footer, LanguageSwitcher | Done | `831f83a` |
| ScrollReveal, BackToTop | Done | `2f0fd3b` |
| All portfolio sections | Done | `30e955a` |
| Landing pages 1-3 | Removed | `5a12ab1` |
| Gumroad concept | Done | `88d4e73` |
| Redeemly concept | Done | `88d4e73` |

Product truth lives in `PRODUCT.md`; the visual system lives in `DESIGN.md`. Keep both current when a section changes, and run `/impeccable critique` before large redesigns.

### Routes

- `/` — Main portfolio (single page: Hero, About, Skills, Experience, Projects, Education, Contact)
- `/concepts/gumroad` — Gumroad marketplace concept (slated for removal; not portfolio evidence)
- `/concepts/redeemly` — Redeemly topup platform concept (slated for removal; not portfolio evidence)

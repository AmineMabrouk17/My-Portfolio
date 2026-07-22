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

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

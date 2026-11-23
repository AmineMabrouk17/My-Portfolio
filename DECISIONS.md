# Decisions

## 2026-11-23 — Lumina card replaced by GameStore TN

**Decision:** Drop the Lumina project card and put GameStore TN in its slot.

**Why:** Lumina's production demo (`ecommerce-website-puce-beta.vercel.app`) returns HTTP 500 on every dynamic route, so the card advertised work a visitor cannot open. GameStore TN is live, source-public, and keeps an ecommerce-style project on the site while showing the Arabic/RTL work.

**Alternative considered:** Waiting for a redeploy of Lumina, or promoting MustacharAI instead. MustacharAI's demo opens with no AI provider connected and an empty chat pane, so it reads worse as a card than a populated marketplace.

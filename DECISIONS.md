# Decisions

## 2026-11-23 — Lumina card replaced by GameStore TN

**Decision:** Drop the Lumina project card and put GameStore TN in its slot.

**Why:** Lumina's production demo (`ecommerce-website-puce-beta.vercel.app`) returns HTTP 500 on every dynamic route, so the card advertised work a visitor cannot open. GameStore TN is live, source-public, and keeps an ecommerce-style project on the site while showing the Arabic/RTL work.

**Alternative considered:** Waiting for a redeploy of Lumina, or promoting MustacharAI instead. MustacharAI's demo opens with no AI provider connected and an empty chat pane, so it reads worse as a card than a populated marketplace.

## 2026-11-23 — Hero portrait becomes a head-only 3D-style cutout

**Decision:** The wordmark hero shows a head-and-neck floating cutout (820×1150, transparent PNG, cropped from Amine's photo to the alpha bounding box) instead of the shoulders-and-suit photo, and the portrait box is sized around the head rather than the old 691×569 frame.

**Why:** The suit cutout read as a LinkedIn headshot and fought the oversized "AMINE" wordmark it sits on. Removing the shoulders and letting the CSS bottom fade eat the neck makes the head emerge from the dark background, and cutting to the head means the head itself gets bigger at the same box height.

**Alternative considered:** Keeping the shoulders and just cropping tighter — the blazer still cuts across the letters, and the bottom fade masks a chest instead of a neck.

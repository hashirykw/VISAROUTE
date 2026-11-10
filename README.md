# VISAROUTE

Multi-page visa, tours & Umrah agency site — plain HTML/CSS/JS, no build step.

- `style.css` — design system (dark cinematic glassmorphism, tokens at the top)
- `app.js` — all data (countries, prices, tours, Umrah, guides) + page logic, chatbot, sound effects
- `images/` — local photos (`images/*.webp` large, `images/sm/*.webp` cards), flags, favicon, Nexlyr logo
- `fonts/` — Fraunces + Manrope (self-hosted)
- `get-images.mjs` — optional: `node get-images.mjs` re-downloads every photo from Unsplash at 1800px

Forms run in demo mode; search for `INTEGRATION POINT` in `app.js` to connect a backend.

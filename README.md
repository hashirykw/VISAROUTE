# VISAROUTE

Multi-page visa, tours & Umrah agency site — plain HTML/CSS/JS, no build step.

- `style.css` — design system (ink / paper / logo gold; Bodoni Moda + Archivo + IBM Plex Mono; tokens at the top)
- `app.js` — all data (countries, prices, tours, Umrah, guides) + page logic, header/dropdowns, rails, visa tabs, pinned tours, parallax, Safar chat, sounds
- `vendor/lenis.min.js` — smooth scrolling
- `images/logo/` — vector logo (emblem, silver emblem, lockup); `images/cut/` — background-removed cut-outs (Dubai skyline layer, landmarks, balloons, suitcase)
- `images/*.webp` large photos, `images/sm/*.webp` cards, flags, favicon, guilloche pattern
- `fonts/` — self-hosted woff2

Forms run in demo mode; search for `INTEGRATION POINT` in `app.js` to connect a backend.

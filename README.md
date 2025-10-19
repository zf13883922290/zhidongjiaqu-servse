```markdown
# Multi Timezone Digital Clock

A small, dependency-free webpage that displays the current time in multiple time zones.

Features:
- Add time zones from a curated list (searchable).
- Add your local timezone with one click.
- Remove zones or clear all.
- 12/24 hour toggle.
- Saves your selections to localStorage.

How to run:
1. Save the files into a folder (`index.html`, `styles.css`, `script.js`, `README.md`).
2. Open `index.html` in any modern browser (Chrome/Edge/Firefox/Safari).
3. Add time zones from the list and enjoy.

Notes:
- Uses the browser `Intl` API for timezone formatting.
- If you want more time zones, extend `tzList` in `script.js`.
- To host: drop into any static file host (GitHub Pages, Netlify, Vercel, etc.).

Enjoy — if you want, I can:
- Add an export/import of the zone list (JSON).
- Create a small React/Vue version.
- Add timezone offsets and daylight saving indicators.
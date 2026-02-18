# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Build Tailwind CSS (input.css → style.css, minified)
npm run build

# Watch for Tailwind class changes during development
npm run watch

# Serve the site locally (any static file server works)
python3 -m http.server 8080
```

## Architecture

This is a plain HTML + Tailwind CSS + vanilla JS personal website (endziu.xyz). There is no framework, no bundler for the main site, and no server-side rendering.

**Main pages** (root-level `.html` files):
- `index.html` — home/landing page
- `music.html` — audio player, driven by `music.js`
- `projects.html` — portfolio grid linking to external work

**Styling** — Tailwind CSS 3.x. The source is `input.css` (which defines `@tailwind` directives and component classes like `.track-link` and `.ctrl-btn`). Running `npm run build` compiles it to `style.css`, which all HTML pages reference. The `tailwind.config.js` scans `*.html` and `*.js` at the root for class names.

**Music player** (`music.html` + `music.js`) — entirely self-contained vanilla JS. The `tracks` array in `music.js` is the data source; each entry has a `title`, `waveform_url` (PNG in `public/waves/`), and `sound_url` (MP3 in `public/sounds/`). The player uses the HTML5 `<audio>` element with click-to-seek on the waveform image. Volume uses a square-law curve (`value²` for setting, `√value` for display).

**Canvas sub-project** (`public/canvas/`) — a standalone canvas physics demo with its own module structure (`js/app.js`, `js/particle.js`, `js/vector.js`, etc.) pre-bundled into `public/canvas/dist/bundle.js`. This is independent of the Tailwind build and uses its own inline CSS.

**Static assets** live under `public/`:
- `public/imgs/` — project thumbnail images
- `public/sounds/` — MP3 audio tracks
- `public/waves/` — waveform PNG images (one per track)
- `public/tachyons.min.css` — legacy CSS file (not used by current pages)
- `public/.well-known/brave-payments-verification.txt` — Brave Rewards verification

To add a track to the music player, add a matching MP3 to `public/sounds/`, a waveform PNG to `public/waves/`, and an entry to the `tracks` array in `music.js`.

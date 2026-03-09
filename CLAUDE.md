# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start Vite dev server with HMR
bun run dev

# Production build (output to dist/)
bun run build

# Preview the production build locally
bun run preview
```

## Architecture

This is a plain HTML + Tailwind CSS + vanilla JS personal website (endziu.xyz) bundled with Vite. No framework, no server-side rendering.

**Build** — Vite handles the multi-page build (`vite.config.js` lists all HTML entry points). Tailwind CSS is processed via PostCSS (`postcss.config.js`). Production output goes to `dist/` with hashed asset filenames.

**Main pages** (root-level `.html` files):
- `index.html` — home/landing page
- `music.html` — audio player, driven by `music.js`
- `projects.html` — portfolio grid linking to external work

**Styling** — Tailwind CSS 3.x. The source is `input.css` (which defines `@tailwind` directives and component classes like `.track-link` and `.ctrl-btn`). HTML pages link to `/input.css` directly — Vite processes it through PostCSS/Tailwind during dev and build. The `tailwind.config.js` scans `*.html` and `*.js` at the root for class names.

**Music player** (`music.html` + `music.js`) — entirely self-contained vanilla JS. The `tracks` array in `music.js` is the data source; each entry has a `title`, `waveform_url` (PNG in `public/waves/`), and `sound_url` (MP3 in `public/sounds/`). The player uses the HTML5 `<audio>` element with click-to-seek on the waveform image. Volume uses a square-law curve (`value²` for setting, `√value` for display).

**Canvas sub-project** (`public/canvas/`) — a standalone canvas physics demo with its own module structure (`js/app.js`, `js/particle.js`, `js/vector.js`, etc.) pre-bundled into `public/canvas/dist/bundle.js`. This is independent of the Vite build and uses its own inline CSS.

**Static assets** live under `public/` and are served at `/` by Vite (copied as-is to `dist/` on build):
- `public/imgs/` — project thumbnail images
- `public/sounds/` — MP3 audio tracks
- `public/waves/` — waveform PNG images (one per track)
- `public/.well-known/brave-payments-verification.txt` — Brave Rewards verification

Asset references in HTML and JS use root-absolute paths (e.g. `/imgs/foo.jpg`, `/sounds/bar.mp3`) — not `public/` prefixed paths.

To add a track to the music player, add a matching MP3 to `public/sounds/`, a waveform PNG to `public/waves/`, and an entry to the `tracks` array in `music.js`.

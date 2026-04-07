# endziu.xyz

Personal portfolio site — landing page, music player, and projects grid.

**Stack:** Vite 7 + Tailwind CSS 3 + vanilla JS

## Pages

- `index.html` — home/landing
- `music.html` — audio player with waveform seek
- `projects.html` — portfolio grid

## Dev

```bash
bun run dev      # http://localhost:5173
bun run build    # output to dist/
bun run preview  # preview production build
```

## Adding content

**Track** — add MP3 to `public/sounds/`, waveform PNG to `public/waves/`, entry to `tracks` array in `music.js`.

**Project** — add thumbnail JPG to `public/imgs/`, copy an `<article>` block in `projects.html`.

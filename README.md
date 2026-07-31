# FlapAstro

Source for the FlapAstro astrophotography portfolio and software page.

## Local preview

```text
npm run build
npm start
```

The preview runs at `http://127.0.0.1:4173`.

## Content

- `site/` — HTML, CSS, and browser JavaScript
- `public/` — favicon and social-sharing image
- `scripts/` — dependency-free build and preview server
- `dist/` — generated deployment output

Portfolio images are displayed from the FlapAstro AstroBin account and link to
their corresponding AstroBin detail pages.

The local source archive is maintained outside the public site under the
FlapAstro OneDrive astronomy library. Local filesystem paths are never emitted
in generated pages or deployment artifacts.

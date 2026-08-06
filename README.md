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

## Software releases

The software page documents current FlapAstro projects and links to their
versioned GitHub release packages. AstroBin Sky Mapper is currently published
as `v1.2.0-beta.6`. When a new version is released, update its version label,
direct download URL, requirements, user-guide notes, and the corresponding
assertions in `tests/site.test.mjs` together.

The website never collects AstroBin credentials. AstroBin Sky Mapper runs on
the visitor's own computer and reads credentials only from its local
`config.json` file.

The local source archive is maintained outside the public site under the
FlapAstro OneDrive astronomy library. Local filesystem paths are never emitted
in generated pages or deployment artifacts.

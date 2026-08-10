# Personal site

Stephen Zhang's personal website. Astro, static output, no UI framework and no
client-side JavaScript. Deploys to GitHub Pages at
[syz2026.github.io](https://syz2026.github.io).

## Running it

```bash
npm install
npm run dev      # http://localhost:4321, drafts visible
npm run build    # static output into dist/, drafts excluded
npm run preview  # serve the built site
npm run check    # type check, including content frontmatter
```

Node 22.12 or newer.

## Adding content

Read [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Research projects, musical works, and
software each live as one Markdown file in `src/content/`, with frontmatter
validated against the schemas in `src/content.config.ts`. A malformed entry
fails the build with a message naming the field.

The three collections are currently empty on purpose, so `/music` and parts of
`/research` render designed empty states. Adding the first file to a folder is
all it takes for that section to populate.

## Layout

| Path | What it holds |
|---|---|
| `src/data/` | Resume-backed content and every user-facing string |
| `src/content/` | The three Markdown collections, currently empty |
| `src/content.config.ts` | Collection schemas |
| `src/lib/collections.ts` | Query helpers, draft filtering, sorting |
| `src/layouts/`, `src/components/`, `src/styles/` | The design system |
| `src/pages/` | Routes |
| `public/media/` | Headshot, resume PDF, and audio and score files |

Prose belongs in `src/data/pages.ts` rather than in templates, so copy can be
edited without touching markup. [DESIGN_BRIEF.md](DESIGN_BRIEF.md) records the
constraints the frontend was built against.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which type checks,
builds, and publishes to GitHub Pages. In the repository settings, Pages must be
set to build from GitHub Actions rather than from a branch.

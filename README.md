# Personal site

Stephen Zhang's personal website. Astro, static output, no UI framework and no
client-side JavaScript. Deploys to GitHub Pages at
[syz2026.github.io](https://syz2026.github.io).

## Running it

```bash
npm install
npm run dev      # http://localhost:4321, drafts visible
npm run build    # static output into dist/, drafts excluded, output validated
npm run preview  # serve the built site
```

Node 22.12 or newer, which `.nvmrc` pins for anyone using nvm.

## Verifying

```bash
npm run verify   # format check, type check, unit tests, build and validation
```

The individual pieces are `npm run format:check`, `npm run check`, `npm test`,
and `npm run build`. CI runs exactly the same commands, so a green local
`verify` means a green pipeline.

Every build runs an output validator (`src/integrations/validate-output.mjs`)
that fails on:

- an internal link or asset path that does not resolve, including a music entry
  pointing at an audio or score file that is not there
- a page missing its title, description, canonical link, `lang`, or CSP
- a page with anything other than exactly one `<h1>`
- an image without alt text or without explicit width and height
- a `<script>` or inline `<style>` reaching the output, both of which the CSP
  forbids

The validator is tested against a planted fault rather than trusted on a pass,
because a check that cannot fail is worth nothing.

## Adding content

Read [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Research projects, musical works, and
software each live as one Markdown file in `src/content/`, with frontmatter
validated against the schemas in `src/content.config.ts`. A malformed entry
fails the build with a message naming the field.

The three collections are currently empty on purpose, so `/music` and parts of
`/research` render designed empty states. Adding the first file to a folder is
all it takes for that section to populate.

## Security

The site is static, ships no JavaScript, and loads nothing cross-origin, so
every Content Security Policy directive is closed rather than merely narrowed:
`script-src 'none'`, `style-src 'self'`, `object-src 'none'`,
`form-action 'none'`. Reaching a strict `style-src` is why
`build.inlineStylesheets` is set to `never`, since Astro's default of inlining
small stylesheets would otherwise require `'unsafe-inline'`. External links
carry `rel="noopener noreferrer"`.

Two limits are worth stating plainly. GitHub Pages serves static files and
cannot set response headers, so the policy travels in a `<meta>` tag, and
`frame-ancestors` is ignored when delivered that way. Clickjacking protection
therefore needs a host that can set real headers, which is the one gap here.
HSTS is not affected, because GitHub preloads `github.io`.

On the supply chain, the runtime dependency list is one package, `astro`. GitHub
Actions are pinned to commit SHAs rather than tags, since a tag can be moved
after review, and the workflow is read-only except for the deploy job.
`npm audit` runs on every CI run and Dependabot proposes monthly updates.

## Layout

| Path                                             | What it holds                                      |
| ------------------------------------------------ | -------------------------------------------------- |
| `src/data/`                                      | Resume-backed content and every user-facing string |
| `src/content/`                                   | The three Markdown collections, currently empty    |
| `src/content.config.ts`                          | Collection schemas                                 |
| `src/lib/ordering.ts`                            | Sorting and draft rules, unit tested               |
| `src/lib/collections.ts`                         | Collection queries                                 |
| `src/integrations/validate-output.mjs`           | Build-time output validation                       |
| `src/layouts/`, `src/components/`, `src/styles/` | The design system                                  |
| `src/pages/`                                     | Routes                                             |
| `public/media/`                                  | Headshot, resume PDF, and audio and score files    |
| `public/fonts/`                                  | Self-hosted display face and its OFL license       |

Prose belongs in `src/data/pages.ts` rather than in templates, so copy can be
edited without touching markup. [DESIGN_BRIEF.md](DESIGN_BRIEF.md) records the
constraints the frontend was built against.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which verifies, builds,
and publishes to GitHub Pages. Pull requests run the same verification without
deploying. In the repository settings, Pages must be set to build from GitHub
Actions rather than from a branch.

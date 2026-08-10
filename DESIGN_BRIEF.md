# Design brief

You own the frontend of this site: the design system, every layout, every
component, and all CSS. The content layer is already built and is not yours to
change. This document is the contract between the two.

## Who it is for

Stephen Zhang, a Stanford undergraduate in mathematics and computer science with
a music minor in trumpet performance. He does research on gene-culture
coevolution in the Feldman Lab, runs preregistered experiments on language
models, and composes for orchestra. The site's readers are research groups,
internship recruiters, and people who want to hear the music.

It should read as a considered personal site by someone precise: typographic,
quiet, and unhurried. It is not a startup landing page. No hero gradients, no
feature grids, no calls to action, no stock illustration, no animated counters.
Whitespace and type hierarchy should do the work. Beyond that the aesthetic is
genuinely yours to choose, and you should make real decisions rather than
defaulting to a generic template.

## Hard technical constraints

- **Astro 7.2.0, static output.** No React, Vue, Svelte, or any UI framework.
  Components are `.astro` files.
- **No network at build or runtime.** The build sandbox has no general internet
  access, so no Google Fonts, no CDN stylesheets, no remote images, and no new
  npm packages. Use a system font stack. `astro` and `sharp` are the only
  dependencies and that must stay true.
- **Plain CSS.** Global tokens in `src/styles/global.css`, everything else in
  component `<style>` blocks. No Tailwind, no CSS-in-JS.
- **Progressive enhancement.** The site must be fully readable and navigable
  with JavaScript disabled. Any JS is vanilla and additive.

## Accessibility and responsiveness, both required

- Semantic landmarks, one `<h1>` per page, headings in order.
- Works from 320px wide upward. Test narrow.
- Visible focus rings on every interactive element. Full keyboard operability.
- Light and dark themes via `prefers-color-scheme`. Both must meet WCAG AA
  contrast.
- Respect `prefers-reduced-motion` for anything that moves.
- Every image needs real alt text.

## The data contract

Import these. Do not restructure them, and do not inline content in templates.

### Static data

```ts
import { profile, education, research, experience, activities, awards, skills } from '../data/profile';
import { publications } from '../data/publications';
import { nav, pages } from '../data/pages';
```

- `profile` has `name`, `tagline`, `email`, `location`, `headshot`, `resume`,
  `links` (array of `{ label, href }`), and `bio` (array of paragraph strings).
- `education` has `school`, `location`, `degree`, `graduation`, `minor`,
  `coursework` (array).
- `research`, `experience`, and `activities` are all arrays of `Position`:
  `{ organization, role, location, start, end, bullets }`.
- `awards` is an array of `{ title, year }`. `skills` is an array of
  `{ group, items }`.
- `publications` is an array of `{ authors, year, title, venue, detail?, href?, secondary? }`
  where `secondary` is `{ label, href }`.
- `pages` holds every page's `title`, `description`, and the intro and
  empty-state strings. All user-facing copy lives here. **Write no prose of your
  own into templates.** If a string you need is missing, add it to
  `src/data/pages.ts` rather than hardcoding it.

### Collections

```ts
import { getResearch, getMusic, getSoftware, RESEARCH_STATUS_LABEL } from '../lib/collections';
```

Each returns a sorted, draft-filtered array of Astro collection entries. Entry
shapes are in `src/content.config.ts`, which is the authoritative reference.
Render an entry body with:

```astro
---
import { render } from 'astro:content';
const { Content } = await render(entry);
---
<Content />
```

**All three collections are currently empty, and that is deliberate.** Stephen
is still choosing which projects and pieces to publish.

## Empty states are a primary deliverable

Two of the four pages will ship with nothing in them. Getting that right is the
main design problem here, not an edge case to handle at the end.

An empty section must look finished rather than broken. No "coming soon"
placeholder blocks, no skeleton loaders, no greyed-out fake cards. Use the copy
in `pages.research.independentEmpty`, `pages.research.softwareEmpty`, and
`pages.music.empty`, and give it a treatment that reads as a deliberate note.

Every section must also look right at one entry, at three, and at twenty,
because entries will arrive gradually.

## Pages to build

| Route | File | Contents |
|---|---|---|
| `/` | `src/pages/index.astro` | Name, tagline, headshot, `profile.bio` paragraphs, `profile.links` |
| `/research` | `src/pages/research.astro` | `pages.research.intro`, then Publications (populated), Independent projects (empty), Software (empty) |
| `/music` | `src/pages/music.astro` | `pages.music.intro`, then the works list (empty) |
| `/cv` | `src/pages/cv.astro` | Education, Experience, Research, Publications, Activities, Awards, Skills, and a link to `profile.resume` |
| `/research/[id]` | `src/pages/research/[...id].astro` | One research entry with its rendered body |
| `/music/[id]` | `src/pages/music/[...id].astro` | One work with audio, score link, movements, and body |
| 404 | `src/pages/404.astro` | Simple, in keeping |

Dynamic routes need `getStaticPaths`. With empty collections they generate no
pages, which is correct and must not error the build.

## Components you need at minimum

A base layout owning `<head>`, skip link, header, and footer. Site navigation
from `nav`, with the current page marked using `aria-current="page"`. A research
card that displays its status using `RESEARCH_STATUS_LABEL` (never invent your
own status wording, and never render an unsubmitted project so that it could be
mistaken for a published one). A music card. A software card. A publication
list. An empty-state component. An audio player.

### The audio player

Entries may set `audio` to an MP3 path, and may omit it. Build on native
`<audio controls>` so it works without JavaScript. You may style it or wrap it
in a light custom UI, but if you build custom controls they must be real buttons,
keyboard operable, with accessible labels, and the native element must remain the
fallback. Do not autoplay. Do not preload audio; set `preload="none"` so a page
of works does not pull megabytes on load.

## SEO and metadata

Every page sets `<title>` and `<meta name="description">` from `pages`. Include
Open Graph tags, `<html lang="en">`, and a canonical URL built from Astro's
configured `site`. Add `src/pages/robots.txt.ts` and a sitemap only if you can do
it without a new dependency.

## Definition of done

`npm run build` completes with no errors, and `npx astro check` reports no type
errors. Every route renders. The site is legible at 320px, keyboard navigable,
and correct in both colour schemes. Report anything you could not do rather than
working around it silently.

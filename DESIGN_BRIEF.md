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

The site should be memorable. Someone who visits once ought to be able to
picture it a week later, and it should be obvious within a second that it
belongs to this person rather than to a template. An earlier version of this
brief asked for restraint above all, and the result was correct but forgettable,
so the direction has changed: aim for a design with a real point of view, and
take the risk that comes with that.

What it must not become is a generic startup landing page. No stock
illustration, no feature-card grids, no calls to action, no animated statistics,
no purple-to-blue gradient behind a centered headline. Those read as templated
precisely because they carry no information about the person. Distinctiveness
here has to come from Stephen's own material rather than from decoration
borrowed from somewhere else.

The obvious well to draw from is that he is simultaneously a mathematician and a
performing musician, and both disciplines are about structure unfolding over
time. Staff lines, notation, the harmonic series, waveforms, lattices, and
plotted curves are all fair game as structural or ornamental motifs. The current
design already rules its rows with hairlines, which is one short step from a
stave. That is one idea rather than an instruction. Have your own, and commit to
it.

Bear in mind that the reader is often a research group or a recruiter, so
legibility and credibility must survive whatever you do. Ambitious and unserious
are different things.

## Hard technical constraints

These are enforced by the build, which fails rather than warns, so working
around one is not an option.

- **Astro 7.2.0, static output.** No React, Vue, Svelte, or any UI framework.
  Components are `.astro` files.
- **Zero JavaScript.** The Content Security Policy sets `script-src 'none'`, so
  a script tag does not merely fail review, it fails the build and would be
  blocked by the browser anyway. Everything is CSS, HTML, and SVG.
- **No network at build or runtime.** No Google Fonts, no CDN stylesheets, no
  remote images, no new npm packages. `astro` is now the only runtime dependency
  and that must stay true.
- **Fonts.** The display face is self-hosted and committed at
  `public/fonts/bodoni-moda-latin-700-normal.woff2` (Bodoni Moda, SIL Open Font
  License, 15 KB, weight 700 only), so titles render identically on every
  platform. Text and label faces still come from a system stack. Adding a weight
  or a style means committing another file and preloading it, so prefer working
  within the one weight that exists.
- **Plain CSS.** Global tokens in `src/styles/global.css`, everything else in
  component `<style>` blocks. No Tailwind, no CSS-in-JS. Astro emits these as
  external files, which the CSP requires, so never hand-write a `<style>` tag
  into markup.

### What you can use to be expressive

The constraints above rule out the usual tricks, and they leave more than they
take. All of the following are available and none of them costs a byte of
JavaScript.

- Inline SVG, generated in the template or hand-written. This is the widest door
  by far, since anything drawable is drawable here, including patterns,
  gradients, filters, masks, and `<animate>`.
- CSS animation and transitions, plus scroll-driven animation through
  `animation-timeline: scroll()` and `view()`.
- CSS-only interaction through `:hover`, `:focus-within`, `:target`, and
  `<details>`.
- Gradients, blend modes, `clip-path`, custom properties, container queries, and
  asymmetric or overlapping grid layouts.
- `@font-face` against locally installed fonts, as long as there is a system
  fallback for machines that lack them.

Anything that moves must be wrapped so that `prefers-reduced-motion: reduce`
turns it off, and the page must still make sense once it is off.

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
import {
  profile,
  education,
  research,
  experience,
  activities,
  awards,
  skills,
} from '../data/profile';
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
- `publications` is an array of
  `{ authors, year, title, venue, detail?, href?, secondary? }` where
  `secondary` is `{ label, href }`.
- `pages` holds every page's `title`, `description`, and the intro and
  empty-state strings. All user-facing copy lives here. **Write no prose of your
  own into templates.** If a string you need is missing, add it to
  `src/data/pages.ts` rather than hardcoding it.

### Collections

```ts
import {
  getResearch,
  getMusic,
  getSoftware,
  RESEARCH_STATUS_LABEL,
} from '../lib/collections';
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

| Route            | File                               | Contents                                                                                                  |
| ---------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`              | `src/pages/index.astro`            | Name, tagline, headshot, `profile.bio` paragraphs, `profile.links`                                        |
| `/research`      | `src/pages/research.astro`         | `pages.research.intro`, then Publications (populated), Independent projects (empty), Software (empty)     |
| `/music`         | `src/pages/music.astro`            | `pages.music.intro`, then the works list (empty)                                                          |
| `/cv`            | `src/pages/cv.astro`               | Education, Experience, Research, Publications, Activities, Awards, Skills, and a link to `profile.resume` |
| `/research/[id]` | `src/pages/research/[...id].astro` | One research entry with its rendered body                                                                 |
| `/music/[id]`    | `src/pages/music/[...id].astro`    | One work with audio, score link, movements, and body                                                      |
| 404              | `src/pages/404.astro`              | Simple, in keeping                                                                                        |

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

Entries may set `audio` to an MP3 path, and may omit it. Use native
`<audio controls>`, which is the only option now that scripting is forbidden.
Style it as far as CSS allows and dress the surrounding figure however you like.
Do not autoplay. Do not preload audio; set `preload="none"` so a page of works
does not pull megabytes on load.

## SEO and metadata

Every page sets `<title>` and `<meta name="description">` from `pages`. Include
Open Graph tags, `<html lang="en">`, and a canonical URL built from Astro's
configured `site`. Add `src/pages/robots.txt.ts` and a sitemap only if you can
do it without a new dependency.

## Definition of done

`npm run verify` exits 0. That single command runs the formatter check, the type
check, the unit tests, and the build, and the build runs an output validator
that fails on a broken link, a missing asset, a page without metadata or without
exactly one `<h1>`, an image lacking alt text or dimensions, and any `<script>`
or inline `<style>`.

Beyond the automated gates, every route must render, the site must be legible at
320px, fully keyboard navigable, and correct in both colour schemes, and every
text and background pair must clear WCAG AA. Report anything you could not do
rather than working around it silently.

# Adding entries

Each entry is one Markdown file: frontmatter carries the structured fields, and
the body carries the prose. Drop a file in the right folder and it appears.
Nothing else needs editing. A section with no entries is left off its page
entirely, so adding the first file is also what makes the section appear.

The body is optional. An entry with frontmatter and nothing after it renders as
a clean entry page with no prose block.

Set `draft: true` on anything unfinished. Drafts show up in `npm run dev` so you
can see how they render, and they are dropped from the built site, so a
half-written entry can sit in the repository without going public.

Ordering is automatic: most recent year first. Add `order: 1` to any entry you
want pinned to the top, and pinned entries sort ahead of the rest by that
number.

---

## Research

Folder: `src/content/research/`. One file per project, for example
`shrinkmuon.md`. The filename becomes the URL slug.

| Field      | Required | Notes                                                              |
| ---------- | -------- | ------------------------------------------------------------------ |
| `title`    | yes      | The paper title, or a working title                                |
| `status`   | yes      | One of `published`, `complete-unsubmitted`, `draft`, `in-progress` |
| `year`     | yes      | Integer                                                            |
| `question` | yes      | One line. The question the project actually asks                   |
| `summary`  | yes      | Two or three sentences for the card                                |
| `tags`     | no       | Array of strings                                                   |
| `links`    | no       | Any of `paper`, `preprint`, `code`, `slides`, each a full URL      |
| `order`    | no       | Pin position                                                       |
| `draft`    | no       | Defaults to `false`                                                |

`status` exists so unsubmitted work is never displayed as though a venue had
accepted it. Use `complete-unsubmitted` for a finished paper with no venue
attached, and `in-progress` for anything still collecting data.

```markdown
---
title: 'When Is Whitening Worth It?'
status: complete-unsubmitted
year: 2026
question:
  "Does a truncated spectral transfer function beat Muon's flat whitening?"
summary: >
  A truncated variant beats Muon at 10.8M parameters, and then three
  prespecified controls invert the result. The ranking turns out to depend on
  the scoring protocol rather than on the optimizer.
tags: ['optimization', 'preregistration']
links:
  code: https://github.com/syz2026/shrinkmuon
---

The body is Markdown and takes as much room as the project needs. It renders on
the entry's own page, below everything in the frontmatter.
```

---

## Music

Folder: `src/content/music/`. One file per work, for example
`the-final-struggle.md`.

| Field             | Required | Notes                                                                |
| ----------------- | -------- | -------------------------------------------------------------------- |
| `title`           | yes      |                                                                      |
| `year`            | yes      | Integer                                                              |
| `instrumentation` | yes      | Free text, for example `Orchestra`                                   |
| `blurb`           | no       | One or two sentences for the card. Fold with `>-`, see below         |
| `duration`        | no       | For example `9:56`                                                   |
| `movements`       | no       | Array of `{ title, duration }`, titles unnumbered, see below         |
| `audio`           | no       | Path under `public/`, for example `/media/audio/final-struggle.mp3`  |
| `score`           | no       | Path under `public/`, for example `/media/scores/final-struggle.pdf` |
| `status`          | no       | `complete` or `in-progress`, defaults to `complete`                  |
| `order`           | no       | Pin position                                                         |
| `draft`           | no       | Defaults to `false`                                                  |

Movement titles must not carry their own numbers. The page numbers them in roman
as it lists them, so a title of `"I. Andante sostenuto"` renders as "I. I.
Andante sostenuto". Write `"Andante sostenuto"` and let the page number it.

The blurb becomes the page's `<meta name="description">`, so fold it with `>-`
rather than `>`. A plain `>` keeps a trailing newline, which then sits inside
the attribute value in the built HTML. Leave `blurb` out and the card and the
page both drop the summary line, and the description falls back to one built
from the title and instrumentation, because the build fails on a page with no
description at all.

An audio player appears only when `audio` is set, and a score link only when
`score` is set. A work with neither still renders as a text entry, so pieces
that exist only as scores in progress can be listed.

```markdown
---
title: 'The Final Struggle'
year: 2026
instrumentation: 'Orchestra'
duration: '9:56'
blurb: >-
  An orchestral piece in one movement, grown from a 48-bar sketch to 254 bars.
audio: /media/audio/the-final-struggle.mp3
score: /media/scores/the-final-struggle.pdf
---

The program note goes here.
```

### Getting the media in

Put audio in `public/media/audio/` and scores in `public/media/scores/`, then
reference them by the paths above.

Audio needs re-encoding first. The renders in `~/Downloads` are large, and the
six Popular Pieces alone come to 18 MB with the concerto finale far bigger. This
brings a file down to a reasonable size for the web:

```bash
ffmpeg -i input.mp3 -codec:a libmp3lame -b:a 128k -ac 2 output.mp3
```

Keep the total under roughly 20 MB. GitHub Pages allows far more, but every
megabyte is a wait for whoever opens the page on a phone.

You cannot ship a broken path. The build resolves every `audio` and `score`
reference against the output and fails if the file is not there, naming the page
and the path, so a typo stops the build rather than producing a player that
silently 404s.

---

## Software

Folder: `src/content/software/`. One file per project.

| Field   | Required | Notes               |
| ------- | -------- | ------------------- |
| `name`  | yes      |                     |
| `blurb` | yes      | One line            |
| `stack` | no       | Array of strings    |
| `repo`  | no       | Full URL            |
| `year`  | no       | Integer             |
| `order` | no       | Pin position        |
| `draft` | no       | Defaults to `false` |

```markdown
---
name: 'HarmonyEngine'
blurb:
  'A CLI that takes a monophonic melody and returns k-best harmonizations in
  eight style packs.'
stack: ['Python']
year: 2026
---

Longer description here.
```

---

## Checking your work

```bash
npm run dev     # preview, drafts included
npm run build   # what actually ships, drafts excluded
npm run verify  # everything CI runs, before you push
```

`npm run build` fails loudly if a required field is missing or a `status` value
is not one of the allowed strings, so a malformed entry cannot reach the site.

One quirk to know about. Astro 7.2 caches collection data in
`node_modules/.astro/data-store.json`, and deleting an entry file does not
always clear it, so a removed piece can keep generating its page. Adding and
editing entries is unaffected. If a deleted entry will not go away:

```bash
rm -rf node_modules/.astro dist && npm run build
```

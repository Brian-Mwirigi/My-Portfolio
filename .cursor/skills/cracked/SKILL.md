---
name: cracked
description: >-
  Manage the BIP-100 / CRACKED section on brianmunene.me — weekly posts,
  voice/tone, frontmatter, and social preview metadata. Use when the user
  invokes /cracked, asks to add a CRACKED post, write a weekly artifact,
  or update the cracked page.
---

# CRACKED (BIP-100)

Personal log at `/cracked` on the portfolio. One post per week. Raw, human, no hype.

## When to use

- User says `/cracked` or asks to add/update a weekly post
- User wants help writing a CRACKED artifact
- User asks about CRACKED page content, layout, or link previews

## Project paths

| What | Path |
|------|------|
| Posts | `content/cracked/*.md` |
| Listing page | `src/app/cracked/page.tsx` |
| Post page | `src/app/cracked/[slug]/page.tsx` |
| OG image | `src/app/cracked/opengraph-image.tsx` |
| Shared metadata | `src/app/cracked/layout.tsx` |
| Data layer | `src/lib/cracked.ts` |

**Live URL for sharing:** `https://www.brianmunene.me/cracked`  
Never share the homepage root if the preview should show Project CRACKED.

## Adding a weekly post

1. Create `content/cracked/week-N-short-title.md` (or descriptive slug)
2. Frontmatter:

```yaml
---
title: "Week N: short title"
excerpt: "One line — what happened, with a number if you have one."
date: "YYYY-MM-DD"
week: N
phase: "Foundations"
tags: ["tag1"]
---
```

3. Body: plain paragraphs. No headers unless the post is long. No bullet lists unless listing real data.
4. Do **not** set `pinned: true` unless user explicitly asks. Only `why-i-started-this.md` is pinned.

## Voice rules (non-negotiable)

Write like a person talking, not a blog template.

- Short paragraphs. Vary length. Some can be one sentence.
- No "In conclusion", no numbered life lessons, no bold slogans every paragraph
- No "It's not X, it's Y" constructions
- No hype: don't reframe demos as wins, don't inflate metrics
- Bad weeks get reported as bad weeks
- Include numbers when they exist (loss, hours, users, latency)
- User may edit in their own words — that's good

**Pinned origin story:** `content/cracked/why-i-started-this.md` — only edit when user asks.

## Page branding

- Project name: **BIP-100** / **Project CRACKED**
- Headline on listing: "BIP-100" + "This is personal."
- Keep layout compact (`max-w-2xl`, small type) — user prefers it not oversized

## Social preview (X/Twitter)

Link previews pull from Open Graph metadata. Requirements:

- Share **`https://www.brianmunene.me/cracked`** (not the homepage)
- After deploy, X caches old previews — refresh with [Twitter Card Validator](https://cards-dev.twitter.com/validator) or post the full `/cracked` URL again
- OG image is generated at `src/app/cracked/opengraph-image.tsx`
- `metadataBase` is set in root `layout.tsx`

If preview still shows homepage: user linked the wrong URL or cache hasn't cleared.

## Checklist after adding a post

- [ ] Frontmatter complete (title, excerpt, date, week)
- [ ] Slug is kebab-case, file ends in `.md`
- [ ] Voice passes the rules above
- [ ] `npm run build` succeeds (static params pick up new slug)
- [ ] Remind user to share `/cracked` or `/cracked/slug` URL

## Example excerpt lines (tone reference)

- "Spent 6 hours on backprop. Still can't explain batchnorm without looking at notes."
- "Training loss flat at 3.2. No fix yet."
- "Merged nothing. Opened three files in vLLM and got lost."

Not: "This week was an incredible journey of growth and learning."

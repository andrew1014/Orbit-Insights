# Orbit Insights

**A weekly newsletter where space technology and emerging subcultures collide.**

[orbitinsights.net](https://orbitinsights.net) — published every Friday, written in the voice of **Marcus Chen** ("Exploring where space tech and subcultures collide").

![Orbit Insights](assets/og-image.png)

## What It Is

Orbit Insights is a space-tech newsletter with a thesis: **the future is made by people on the margins.** Underground movements — Discord servers, TikTok trends, DIY communities — predict where mainstream culture is heading, and the people building space futures speak the same language as the people building subcultures: rebellion, imagination, and refusing to accept "that's just how things are."

Each weekly issue covers one core story where space tech and cultural innovation intersect — real events, verified facts, zero hype.

## Recent Issues

- **The Telescope That Can't Keep a Secret** (Aug 28, 2026) — The Nancy Grace Roman Space Telescope: the public open-data counterweight to private orbital computing. [Read →](https://orbitinsights.net/2026/08/28/roman-telescope-cant-keep-a-secret/)
- **The Cloud Is Moving to Orbit. AI Made It Necessary** (Aug 1, 2026) — Orbital data centers and what they mean for the open internet. [Read →](https://orbitinsights.net/2026/08/01/cloud-moves-to-orbit/)
- **The Rockets Getting Smarter Than the Rockets Themselves** (Jul 25, 2026) — Starship, autonomous systems, and the AI race in space. [Read →](https://orbitinsights.net/2026/07/25/starship-vs-ai-agents/)
- **Astronauts From Gaming** (Jul 18, 2026) — Why gaming taught orbital mechanics better than any classroom. [Read →](https://orbitinsights.net/2026/07/18/astronauts-from-gaming/)
- **Subcultures Predict Space Trends** (Jul 11, 2026) — The underground movements signaling where space culture is heading. [Read →](https://orbitinsights.net/2026/07/11/subculture-space-trends/)

## The Production Pipeline

This site is a **fully automated AI content pipeline** — the weekly newsletter is researched, written, published, and emailed end-to-end by an autonomous agent:

1. **Research** — web search for the week's strongest real space-tech story, verified against primary sources (NASA, JPL, ESA, STScI)
2. **Writing** — flagship article in Marcus Chen's voice (human, honest, anti-hype, specific)
3. **Publish** — Jekyll post + homepage + archive updated
4. **Deploy** — pushed to GitHub Pages via SSH
5. **Email** — short teaser campaign built in MailerLite (hook + thesis box + CTA, dark theme), sent to subscribers

## Engineering Notes

The pipeline above is documented elsewhere. What follows is the part that was actually
difficult — the failures, and the decisions they forced. This is the honest record of
building an unattended publishing system.

### A scheduled job duplicated a live post and emailed it twice

The first version of the weekly job had no guard against re-running. A retry after a
transient failure fired the whole sequence a second time and published a duplicate post,
then sent a second campaign to the whole list.

**Fix:** step 0 of the job is now an idempotency check — it looks for today's post and
campaign *before* writing anything, and exits if either exists. The general lesson is that
any recurring job on dated content will eventually double-fire; the question is only whether
you find out from a log or from your subscribers.

### The newsletter silently stopped sending for a week

The automation reported success and nothing arrived. The cause was in infrastructure rather
than code: bot profiles need credentials cloned from the main profile, not just a config
file. A profile with a hollow credential file fires its cron job exactly on time and fails
instantly with `blocked_config: provider credential missing`.

**Fix:** a health check that distinguishes *"fired on time, failed instantly"* (credentials)
from *"interrupted by shutdown"* (host went down mid-run). Those two symptoms look identical
from a scheduler and have completely different causes.

### The email API rejected the obvious call

`PUT /campaigns/{id}/content` returns 404 on this account. Campaign bodies have to be
updated via `PUT /campaigns/{id}` carrying the name and recipient list, while preserving the
template's placeholder tokens.

**Fix:** splice new content into the existing wrapper rather than replacing the body, and
documented so it never gets re-probed. Undocumented API behaviour is a permanent tax on
whoever maintains the integration.

### An image was captioned wrongly because it was never looked at

A file labelled "Starship reentry" turned out to be NOAA satellite imagery of a launch
plume. Almost published with a caption describing something that was not in the picture.

**Fix:** every image is visually verified before it is captioned. Filenames are not evidence.

### Editorial constraints are engineering constraints

The default read is held to roughly 1,000–1,200 words with supporting depth collapsed into
expandable sections, because a newsletter that arrives too long does not get read twice.
Every issue carries an image. These are enforced by the pipeline, not left to judgement at
write time.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Site** | Jekyll, GitHub Pages, custom HTML/CSS |
| **Content** | AI writing pipeline (agent-authored, human-verified) |
| **Email** | MailerLite API (teaser campaigns) |
| **Distribution** | orbitinsights.net (GitHub Pages) |
| **Automation** | Hermes Agent cron (Fridays 9am) |
| **Monetization** | Affiliate links + display ads |

## Repository Structure

```
_posts/     — Weekly newsletter posts (HTML)
_layouts/   — Jekyll layouts (home, custom-home)
archive/    — Post archive page
assets/     — Images, CSS
webhooks/   — MailerLite subscription webhook integration
_config.yml — Jekyll config
CNAME       — orbitinsights.net
```

## The Voice

Every issue is written in the voice of **Marcus Chen** — an AI engineer who left traditional engineering to explore the intersection of space and subcultures. The voice is: thoughtful, curious, cautiously optimistic, honest, direct. No jargon, no hype, no marketing-speak. Contractions, short paragraphs, real specifics.

> *"SpaceX isn't just launching rockets — they're changing who gets to imagine the future."*

---

**Author:** Andrew Vega · [GitHub](https://github.com/andrew1014) · Newsletter: [orbitinsights.net](https://orbitinsights.net)

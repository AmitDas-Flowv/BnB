# Brain & Bot Films — Website Design Brief & Build Spec

> A production house built around the belief that great production sits at the
> intersection of creative thinking and seamless execution.
> **Think. Create. Produce.**

This document is the single source of truth for building the Brain & Bot Films
website. It captures the design language, the sitemap, the page-by-page content,
and the component spec. It is written to be handed directly to a code agent
(Codex/Claude) to implement.

Reference mockups live alongside this brief (see `/mockups` once exported from
the design tool). Six screens were generated as visual reference:

1. Homepage hero
2. Homepage — Selected Work
3. Studio / About + Team
4. Founder profile — Crystal Carvalho
5. Project detail — Gymshark
6. Mobile homepage

---

## 1. Design language

Derived from the B&B logo (cream/ivory monogram on black) and inspired by
`deepxasleep.com` (structure, project segregation, founder handling) and the
referenced Dribbble photography portfolio (editorial serif, generous
whitespace, image-forward).

**Mood:** luxury film studio. Dark, cinematic, editorial, confident, minimal.
The site should feel like the opening titles of a film — quiet, premium, and
video-first.

### Color
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background (near-black) |
| `--bg-elevated` | `#111111` | Cards, hovered surfaces |
| `--ink` | `#EFE3D2` | Primary text (warm ivory/cream, from the logo) |
| `--ink-dim` | `#B8AE9E` | Secondary text, captions |
| `--ink-faint` | `#6E675C` | Labels, meta, disabled |
| `--line` | `rgba(239,227,210,0.14)` | Hairline dividers/borders |
| `--accent` | `#EFE3D2` | Same cream; accent is contrast + motion, not a 2nd hue |

Keep the palette monochrome-warm. The only "color" on the page comes from the
film stills themselves. No pure white (`#FFFFFF`) and no pure black.

### Typography
- **Display / headlines:** a high-contrast Didone/serif that matches the logo's
  face — e.g. **Canela**, **Ogg**, **PP Editorial New**, or free: **Playfair
  Display** / **Fraunces** (optical, high contrast). Large, tight leading.
- **UI / labels / body-small:** a clean neutral grotesque — e.g. **Suisse
  Int'l**, **Neue Haas Grotesk**, or free: **Inter** / **Söhne** substitute.
  Used in UPPERCASE with wide tracking (`0.18em`) for nav, labels, categories.
- **Type scale (desktop):** hero 96–140px; section titles 40–64px; body 16–18px;
  labels 12–13px uppercase tracked.

### Layout system
- 12-column grid, generous margins (min 64px desktop / 20px mobile), lots of
  negative space.
- **Numbered index** everywhere (`01 / 02 / 03`), à la deepxasleep.
- **Hairline rules** separate sections; no heavy boxes or drop shadows.
- Small-caps eyebrow labels above every section (`SELECTED WORK`, `THE STUDIO`).

### Motion (for the real build)
- Slow, cinematic. Images reveal with a soft scale/opacity on scroll.
- Hover on a project: still cross-fades to a muted autoplaying video loop.
- Custom cursor (small ring → "VIEW"/"PLAY" on interactive media). Optional.
- Page transitions: cover-wipe in cream or a slow fade to black. Keep it subtle.
- Respect `prefers-reduced-motion`.

---

## 2. Sitemap

```
/                     Home (hero → selected work → studio teaser → contact)
/work                 All projects (filterable grid)
/work/gap             Project detail
/work/gymshark        Project detail
/work/infosys         Project detail
/work/eyewear         Project detail (client name TBC)
/studio               About the studio + full team grid
/studio/crystal-carvalho   Founder profile + her film reel (Vimeo)
/studio/[member]      Placeholder team member profiles (x3–4)
/contact              Contact
```

Navigation (persistent, top): `WORK · STUDIO · CONTACT` with the B&B monogram at
top-left. Footer: logo, tagline, Instagram (@brain.and.bot), Vimeo, email,
credit line.

---

## 3. Page content

### Home
- **Hero:** full-viewport. Background = muted showreel loop (or best still).
  Headline (stacked): `THINK.` / `CREATE.` / `PRODUCE.`
  Sub: `BRAIN & BOT FILMS — A PRODUCTION HOUSE`. Index `(01 / 04)` + `SHOWREEL ↗`.
- **Selected Work:** eyebrow `SELECTED WORK`, title `Recent projects`, then the
  four projects as large cinematic cards (see §4).
- **Studio teaser:** the intersection statement + a single BTS image, link to
  `/studio`.
- **Contact strip:** big serif `Let's make something.` + email + socials.

### Work (index)
Editorial grid of all projects. Each item: still (video on hover), title,
category, year, index number. Optional filter by service/year later.

### Project detail (template)
- Breadcrumb `WORK / {CLIENT}`, large serif title `{Client} — {Type}`.
- Hero video player (Vimeo embed) with a thin circular play button.
- Credits column: `CLIENT`, `SERVICE`, `YEAR`, `DIRECTOR`, `AGENCY` (as available).
- Short paragraph. Gallery row of 3+ stills. Next-project link at the bottom.

### Studio (about + team)
- Full brand statement (from the write-up, condensed on screen, full on scroll).
- **Team grid:** Crystal (real) + 3–4 placeholders (`DIRECTOR`, `DOP`,
  `PRODUCER`, `EDITOR` — labelled `PLACEHOLDER` until filled). Each links to a
  profile page.

### Founder profile — Crystal Carvalho
- Name `CRYSTAL CARVALHO`, role `FOUNDER & PRODUCER`.
- Editorial portrait + bio (see write-up). Credits list: Leo Burnett, McCann,
  Native Films, Skylark Productions.
- **Selected Films:** grid of video thumbnails pulled from her Vimeo
  (`vimeo.com/user82535468`) — each opens a lightbox/embed.

---

## 4. Current projects (work in progress)

| # | Client | Category (placeholder) | Year | Notes |
|---|---|---|---|---|
| 01 | GAP | Fashion Film | 2025 | Clothing brand |
| 02 | Gymshark | Brand Campaign | 2025 | Activewear |
| 03 | Infosys | Corporate Film | 2025 | Tech / enterprise |
| 04 | Eyewear (client TBC) | Product Film | 2025 | Eyewear brand — confirm name |

> These are work-in-progress. Until final films are delivered, use stills /
> teaser cuts. Categories above are placeholders — confirm with Crystal.

---

## 5. Team (placeholders)

| Role | Name | Status |
|---|---|---|
| Founder & Producer | Crystal Carvalho | Live — full bio + Vimeo reel |
| Director | — | Placeholder |
| Director of Photography | — | Placeholder |
| Producer | — | Placeholder |
| Editor (optional) | — | Placeholder |

---

## 6. Founder bio (source copy)

Brain & Bot Films is a production house established in August 2025 by Producer
Crystal Carvalho, bringing together a decade of experience across advertising,
production and branded content.

Crystal began her career in 2015 at Leo Burnett (three years), then McCann as a
Senior Producer (three years) — evaluating scripts, collaborating with directors
and production houses, negotiating budgets, and managing projects from
pre-production through delivery. Her experience spans the entire production
process. She later worked with Native Films and Skylark Productions before
establishing Brain & Bot Films in August 2025.

At Brain & Bot, we work with agencies, brands, directors and creative teams to
take an idea from script to screen — attention to both the big picture and the
smallest detail. A young production house backed by years of experience: agile,
collaborative, deeply involved.

**Think. Create. Produce. — Brain & Bot Films.**

---

## 7. Component checklist (for implementation)

- [ ] `Nav` (fixed, transparent → solid on scroll, monogram + 3 links)
- [ ] `Hero` (video/still bg, stacked serif headline, index + showreel cta)
- [ ] `ProjectCard` (still + hover video, title, category, year, index)
- [ ] `ProjectGrid` (home = 4 featured; /work = all)
- [ ] `SectionLabel` (eyebrow small-caps + hairline rule)
- [ ] `StudioStatement`
- [ ] `TeamGrid` + `TeamCard`
- [ ] `FounderProfile` (portrait, bio, credits, film grid)
- [ ] `VideoLightbox` (Vimeo embed)
- [ ] `ContactStrip` + `Footer`
- [ ] Reduced-motion + full mobile responsive

## 8. External sources
- Logo: cream B&B monogram (supplied) — export SVG for crisp nav use.
- Instagram: https://www.instagram.com/brain.and.bot/
- Crystal's Vimeo: https://vimeo.com/user82535468
- Inspiration — structure: https://deepxasleep.com/
- Inspiration — visual language: referenced Dribbble photography portfolio.

## 9. Suggested tech (for Codex build)
Next.js (App Router) + TypeScript, Tailwind for tokens above, Framer Motion or
GSAP for scroll/hover, Vimeo Player SDK for embeds, deployed on Vercel with the
client's domain via DNS. Content in MDX or a light CMS (Sanity) so Crystal can
add projects without a developer.

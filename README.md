# Brain & Bot Films — Website

A clickable prototype for **Brain & Bot Films**, a production house founded by
Crystal Carvalho. Static site (HTML/CSS/vanilla JS), no build step — designed to
be reviewed now and deployed to Vercel with the client's domain.

> Think. Create. Produce.

## Run locally
No dependencies. Just serve the folder:

```bash
# any of these
python3 -m http.server 8080
# or
npx serve .
```
Then open <http://localhost:8080>.

## Pages
| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Hero, selected work, studio teaser |
| Work | `work.html` | All projects |
| Project | `project.html?p=gap` | Data-driven detail + Vimeo player |
| Studio | `studio.html` | About + team grid |
| Crystal | `crystal.html` | Founder profile + film reel |
| Contact | `contact.html` | Email + socials |

## Editing content — one file
Everything (projects, team, films, images, email) lives in
**`assets/js/data.js`**. No other file needs editing for content changes.

### Vimeo videos
Crystal's **24 real films** (from her Vimeo catalogue) drive the reel on her
page — see the `films` array in `data.js` (just video ids). Each film's **title
and thumbnail are fetched live from Vimeo** (oEmbed) in the browser, so the reel
stays correct automatically; add or remove an id to update it.

The four brand projects (Gap, Gymshark, Infosys, Eyewear) currently point their
player at a representative film from the catalogue so playback works — replace
each project's `vimeo:` id with its real project film once available (or tell me
which film maps to which brand and I'll set them).

### Logo
The nav/footer show a faithful CSS stand-in of the B&B mark. For the **exact
brand logo**, drop the official vector at `assets/img/logo.svg` and set
`logoFile: "assets/img/logo.svg"` in `data.js` — it's then used everywhere.

### Missing photos
Anywhere a real photo is still needed (team portraits, extra project stills)
shows a labelled **image box** describing the shot required — swap each for a
real image in `data.js`.

### Images
The prototype **hotlinks** generated images from a CDN so it renders instantly.
Before production, localize them into the repo:

```bash
bash scripts/fetch-assets.sh
git add assets/img assets/js/data.js
git commit -m "Localize image assets"
```

Swap any image (hero, Crystal's portrait, project stills) by changing its entry
in `data.js` — replace Crystal's placeholder portrait with her real photo when
available.

## Design language
Warm ivory-cream (`#EFE3D2`) on near-black (`#0A0A0A`); high-contrast serif
(Fraunces, standing in for the logo's Didone) + wide-tracked grotesque labels;
numbered index, hairline rules, generous negative space, video-first.
Full spec: [`DESIGN-BRIEF.md`](./DESIGN-BRIEF.md).

## Deploy to Vercel
1. Import this repo in Vercel (Framework preset: **Other** — it's static).
2. No build command; output = repo root. `vercel.json` enables clean URLs.
3. Add the client's domain in Vercel → point the domain's DNS at Vercel.

### Handover / ownership
Built on `AmitDas-Flowv/BnB` for speed. When the deal locks, use GitHub
**Settings → Transfer ownership** to move the repo (with full history) to the
client's account/org, then reconnect the Vercel project to the new owner. The
domain + DNS are unaffected.

## To do before launch
- [x] Wire Crystal's 24 real Vimeo films into the reel (live titles + thumbnails)
- [ ] Map the 4 brand projects to their real project films (Gap/Gymshark/Infosys/Eyewear)
- [ ] Drop in the exact B&B logo at `assets/img/logo.svg` + set `logoFile`
- [ ] Replace Crystal's placeholder portrait with a real photograph
- [ ] Fill the labelled image boxes (team portraits, extra project stills)
- [ ] Confirm the eyewear client name + project categories/years
- [ ] Confirm contact email
- [ ] Run `scripts/fetch-assets.sh` to localize images
- [ ] Add real showreel to the hero (video loop) if available

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

### Vimeo videos (important)
Each project and each reel item references a Vimeo **numeric id** — the number at
the end of a `vimeo.com/XXXXXXXX` URL. Right now they use one public **demo id**
so playback + thumbnails are provably working.

**To wire Crystal's real films:** in `data.js`, replace each `vimeo:` /
`id:` value with the real id. In the `reel` array, leave `poster: ""` to
auto-pull the real Vimeo thumbnail, or set `poster` to a specific image.

> The build sandbox can't reach vimeo.com (network egress policy), so the real
> ids couldn't be auto-fetched. Paste Crystal's video URLs (or make her Vimeo
> profile public) and they'll be wired in exactly.

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
- [ ] Replace demo Vimeo ids with Crystal's real film ids
- [ ] Replace Crystal's placeholder portrait with a real photograph
- [ ] Drop in the real B&B logo SVG (currently a CSS wordmark)
- [ ] Confirm the eyewear client name + project categories/years
- [ ] Confirm contact email
- [ ] Run `scripts/fetch-assets.sh` to localize images
- [ ] Add real showreel to the hero (video loop) if available

/* ============================================================
   Brain & Bot Films — site content & data
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT TO UPDATE CONTENT.
   - Add/replace projects, team members, and Crystal's films here.
   - VIDEO IDS: every reel item + project uses a Vimeo numeric id.
     Right now they use a public demo id so playback is provably
     working. Replace each `vimeo` id with Crystal's real Vimeo
     video ids (the number at the end of a vimeo.com/XXXXXXXX url).
   - IMAGES: currently hotlinked from the generation CDN so the
     prototype renders immediately. Run scripts/fetch-assets.sh
     locally to download them into /assets/img and this file will
     be rewritten to local paths before you deploy.
   ============================================================ */

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3EMg9WNOfCEmE3Y8LIFeYZg8yDx/";

/* Temporary demo Vimeo id (a real, public video) — proves the
   lightbox + embed work. Replace per-item with Crystal's ids. */
const DEMO_VIMEO = "863362136";

const IMG = {
  hero:    CDN + "hf_20260911_171758_85607aa0-cbf3-422b-ac8e-bf3e7a3df02e.png",
  crystal: CDN + "hf_20260911_171147_07758b95-5a92-48e4-9781-96e9e040ca38.png",
  gap:     CDN + "hf_20260911_171147_a7fc703d-53bd-4f21-9ea6-06bf9efbd314.png",
  gymshark:CDN + "hf_20260911_171147_b0859fc1-eedb-4217-b0a9-d769af0ffeaf.png",
  infosys: CDN + "hf_20260911_171147_d41cbfab-1d50-4feb-8ad5-38b566a3f1c5.png",
  eyewear: CDN + "hf_20260911_171147_e950fe8e-8f7a-40ba-ba4d-2623a44f13ea.png",
  bts:     CDN + "hf_20260911_171146_0b819023-6d85-4d50-a79f-0e5dc8d591e3.png",
};

const SITE = {
  name: "Brain & Bot Films",
  tagline: "Think. Create. Produce.",
  email: "hello@brainandbot.films",          // TODO: confirm real inbox
  instagram: "https://www.instagram.com/brain.and.bot/",
  vimeo: "https://vimeo.com/user82535468",
  img: IMG,

  /* ---- Projects (Work in progress) ------------------------- */
  projects: [
    {
      slug: "gap", idx: "01",
      client: "Gap", type: "Fashion Film", year: "2025",
      image: IMG.gap, vimeo: DEMO_VIMEO,
      status: "In production",
      summary: "A fashion film for the global clothing brand — clean, character-led and light-driven, translating everyday essentials into a piece of moving-image with a quiet, contemporary confidence.",
      credits: [["Client","Gap"],["Service","Production"],["Category","Fashion Film"],["Year","2025"],["Status","In production"]],
      stills: [IMG.gap, IMG.bts, IMG.hero],
    },
    {
      slug: "gymshark", idx: "02",
      client: "Gymshark", type: "Brand Campaign", year: "2025",
      image: IMG.gymshark, vimeo: DEMO_VIMEO,
      status: "In production",
      summary: "A high-energy brand campaign for the activewear label — motion, sweat and rhythm, built to feel visceral on screen while staying premium in its craft.",
      credits: [["Client","Gymshark"],["Service","Production"],["Category","Brand Campaign"],["Year","2025"],["Status","In production"]],
      stills: [IMG.gymshark, IMG.bts, IMG.hero],
    },
    {
      slug: "infosys", idx: "03",
      client: "Infosys", type: "Corporate Film", year: "2025",
      image: IMG.infosys, vimeo: DEMO_VIMEO,
      status: "In production",
      summary: "A corporate film for the technology major — human, considered and precise, finding the story of people inside an enterprise at scale.",
      credits: [["Client","Infosys"],["Service","Production"],["Category","Corporate Film"],["Year","2025"],["Status","In production"]],
      stills: [IMG.infosys, IMG.bts, IMG.hero],
    },
    {
      slug: "eyewear", idx: "04",
      client: "Eyewear", type: "Product Film", year: "2025",
      image: IMG.eyewear, vimeo: DEMO_VIMEO,
      status: "In production",
      summary: "A product film for an eyewear brand — macro texture, reflection and light, treating the object as sculpture.",
      credits: [["Client","Eyewear — TBC"],["Service","Production"],["Category","Product Film"],["Year","2025"],["Status","In production"]],
      stills: [IMG.eyewear, IMG.bts, IMG.hero],
    },
  ],

  /* ---- Team ------------------------------------------------- */
  team: [
    { slug:"crystal-carvalho", name:"Crystal Carvalho", role:"Founder & Producer", image:IMG.crystal, live:true },
    { name:"", role:"Director", live:false },
    { name:"", role:"Director of Photography", live:false },
    { name:"", role:"Producer", live:false },
  ],

  /* ---- Crystal's film reel (from her Vimeo) ----------------
     Replace `id` with each real Vimeo video id. Leave `poster`
     empty ("") to auto-pull the real Vimeo thumbnail; or set it
     to a specific image. ------------------------------------- */
  reel: [
    { id: DEMO_VIMEO, title: "Fashion Film", cat: "Advertising", poster: IMG.gap },
    { id: DEMO_VIMEO, title: "Brand Campaign", cat: "Advertising", poster: IMG.gymshark },
    { id: DEMO_VIMEO, title: "Corporate Film", cat: "Branded Content", poster: IMG.infosys },
    { id: DEMO_VIMEO, title: "Product Film", cat: "Advertising", poster: IMG.eyewear },
    { id: DEMO_VIMEO, title: "Title Sequence", cat: "Film", poster: IMG.hero },
    { id: DEMO_VIMEO, title: "Behind the Scenes", cat: "Documentary", poster: IMG.bts },
  ],

  credits: [
    ["Leo Burnett","2015 – 2018"],
    ["McCann","Senior Producer"],
    ["Native Films","Production"],
    ["Skylark Productions","Production"],
  ],
};

/* Vimeo thumbnail helper (works client-side; no API key needed). */
function vimeoPoster(item){
  if(item.poster) return item.poster;
  return "https://vumbnail.com/" + item.id + "_large.jpg";
}

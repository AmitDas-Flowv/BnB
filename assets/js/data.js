/* ============================================================
   Brain & Bot Films — site content & data
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT TO UPDATE CONTENT.
   ============================================================ */

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3EMg9WNOfCEmE3Y8LIFeYZg8yDx/";

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

  /* ---- LOGO -------------------------------------------------
     The nav/footer render a faithful CSS stand-in of the B&B
     mark. For the pixel-exact brand logo, drop the official
     vector at assets/img/logo.svg (or .png) and set logoFile
     below to its path — it will then be used everywhere. */
  logoFile: "assets/img/logo-mark.png",       // nav monogram (transparent)
  logoFileFull: "assets/img/logo.png",         // full lockup for the footer

  /* ---- Brand projects (current work in progress) -----------
     These are the studio's WIP campaigns. `vimeo` points at a
     representative film from Crystal's catalogue for now so the
     player works — replace each with the real project film id
     once available (or once you tell me which is which). */
  projects: [
    {
      slug:"gap", idx:"01", client:"Gap", type:"Fashion Film", year:"2025",
      image:IMG.gap, vimeo:"1113175028", status:"In production",
      summary:"A fashion film for the global clothing brand — clean, character-led and light-driven, translating everyday essentials into moving-image with quiet, contemporary confidence.",
      credits:[["Client","Gap"],["Service","Production"],["Category","Fashion Film"],["Year","2025"],["Status","In production"]],
      stills:[
        {img:IMG.gap},
        {box:"Additional still — model / product detail, warm daylight"},
        {box:"Additional still — wide environment frame"},
      ],
    },
    {
      slug:"gymshark", idx:"02", client:"Gymshark", type:"Brand Campaign", year:"2025",
      image:IMG.gymshark, vimeo:"1113163679", status:"In production",
      summary:"A high-energy brand campaign for the activewear label — motion, sweat and rhythm, built to feel visceral on screen while staying premium in its craft.",
      credits:[["Client","Gymshark"],["Service","Production"],["Category","Brand Campaign"],["Year","2025"],["Status","In production"]],
      stills:[
        {img:IMG.gymshark},
        {box:"Additional still — athlete mid-motion, rim light"},
        {box:"Additional still — detail / texture frame"},
      ],
    },
    {
      slug:"infosys", idx:"03", client:"Infosys", type:"Corporate Film", year:"2025",
      image:IMG.infosys, vimeo:"1113163060", status:"In production",
      summary:"A corporate film for the technology major — human, considered and precise, finding the story of people inside an enterprise at scale.",
      credits:[["Client","Infosys"],["Service","Production"],["Category","Corporate Film"],["Year","2025"],["Status","In production"]],
      stills:[
        {img:IMG.infosys},
        {box:"Additional still — interview / portrait setup"},
        {box:"Additional still — environment / technology frame"},
      ],
    },
    {
      slug:"eyewear", idx:"04", client:"Eyewear", type:"Product Film", year:"2025",
      image:IMG.eyewear, vimeo:"1113162319", status:"In production",
      summary:"A product film for an eyewear brand — macro texture, reflection and light, treating the object as sculpture.",
      credits:[["Client","Eyewear — name TBC"],["Service","Production"],["Category","Product Film"],["Year","2025"],["Status","In production"]],
      stills:[
        {img:IMG.eyewear},
        {box:"Additional still — macro product detail"},
        {box:"Additional still — model wearing product"},
      ],
    },
  ],

  /* ---- Team ------------------------------------------------
     Boxes describe the photo needed for each placeholder. */
  team: [
    { slug:"crystal-carvalho", name:"Crystal Carvalho", role:"Founder & Producer", image:IMG.crystal, live:true },
    { name:"", role:"Director", live:false, box:"Photo — editorial portrait, dark background" },
    { name:"", role:"Director of Photography", live:false, box:"Photo — editorial portrait, dark background" },
    { name:"", role:"Producer", live:false, box:"Photo — editorial portrait, dark background" },
  ],

  /* ---- Crystal's film reel — REAL Vimeo videos ------------
     24 ids from her Vimeo catalogue. Titles + thumbnails are
     fetched live from Vimeo (oEmbed) in the browser, so this
     stays correct automatically. Add/remove ids to update. */
  films: [
    "1113175028","1113163679","1113163060","1113162319","1113162283","1113162245",
    "1113162214","1113160584","1113159781","1113159658","1113159548","1113159427",
    "1113158771","1113158687","1113157339","1113157305","1113157126","1113156939",
    "1113156809","1113156105","1113155396","1113155117","1113155058","1113154992"
  ],
};

/* Immediate Vimeo thumbnail (no API key). oEmbed later upgrades it. */
function vimeoPoster(id){ return "https://vumbnail.com/" + id + "_large.jpg"; }

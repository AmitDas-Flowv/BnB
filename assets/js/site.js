/* ============================================================
   Brain & Bot Films — site behaviour
   ============================================================ */
(function(){
  "use strict";

  /* ---------- logo ------------------------------------------ */
  /* Faithful CSS stand-in of the B&B mark (used until SITE.logoFile is set,
     and as an automatic fallback if the logo file fails to load). */
  const CSS_LOCKUP = `<span class="brand-lockup">
      <span class="mono">B<span class="amp">&amp;</span>B<i class="play" aria-hidden="true"></i></span>
      <span class="wordmark">Brain &amp; Bot Films</span>
    </span>`;
  window.__bbLockup = CSS_LOCKUP;
  function logoMarkup(){
    if (typeof SITE !== "undefined" && SITE.logoFile){
      return `<img class="brand-svg" src="${SITE.logoFile}" alt="Brain & Bot Films" onerror="this.outerHTML=window.__bbLockup">`;
    }
    return CSS_LOCKUP;
  }
  function brand(){
    return `<a class="brand" href="index.html" aria-label="Brain & Bot Films — home">${logoMarkup()}</a>`;
  }

  /* ---------- nav ------------------------------------------- */
  function buildNav(active){
    const el = document.querySelector("[data-nav]");
    if(!el) return;
    el.className = "nav";
    el.innerHTML = `
      ${brand()}
      <button class="nav-toggle" aria-label="Menu" data-toggle><span></span><span></span><span></span></button>
      <nav class="nav-links" data-links>
        <a href="work.html" class="${active==='work'?'active':''}">Work</a>
        <a href="index.html#team" class="${active==='team'?'active':''}">Team</a>
        <a href="studio.html" class="${active==='studio'?'active':''}">Studio</a>
        <a href="contact.html" class="${active==='contact'?'active':''}">Contact</a>
      </nav>`;
    const toggle = el.querySelector("[data-toggle]");
    const links = el.querySelector("[data-links]");
    const setMenu = (open)=>{ links.classList.toggle("open",open); el.classList.toggle("menu-open",open); document.body.style.overflow = open ? "hidden" : ""; };
    toggle.addEventListener("click", ()=> setMenu(!links.classList.contains("open")) );
    links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=> setMenu(false) ));
    const onScroll = ()=> el.classList.toggle("solid", window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, {passive:true});
  }

  /* ---------- footer --------------------------------------- */
  function buildFooter(){
    const el = document.querySelector("[data-footer]");
    if(!el) return;
    const yr = new Date().getFullYear();
    el.className = "footer";
    el.innerHTML = `
    <div class="wrap">
      <div class="footer-top">
        <div class="big serif">Let’s make<br>something.</div>
        <div class="cols">
          <div class="col">
            <div class="label" style="margin-bottom:14px">Menu</div>
            <a href="work.html">Work</a><a href="studio.html">Studio</a><a href="contact.html">Contact</a>
          </div>
          <div class="col">
            <div class="label" style="margin-bottom:14px">Connect</div>
            <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
            <a href="${SITE.vimeo}" target="_blank" rel="noopener">Vimeo</a>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${yr} Brain &amp; Bot Films — A production house.</span>
        <span>Think. Create. Produce.</span>
      </div>
    </div>`;
  }

  /* ---------- scroll reveal -------------------------------- */
  function reveals(){
    const items = document.querySelectorAll(".reveal:not(.in)");
    if(!("IntersectionObserver" in window)){ items.forEach(i=>i.classList.add("in")); return; }
    const io = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }); },
      {threshold:0.12, rootMargin:"0px 0px -8% 0px"});
    items.forEach(i=>io.observe(i));
  }

  /* ---------- vimeo lightbox ------------------------------- */
  let lb;
  function ensureLightbox(){
    if(lb) return lb;
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<div class="box"><button class="close" data-close>Close ✕</button><div data-frame></div></div>`;
    document.body.appendChild(lb);
    lb.addEventListener("click",(e)=>{ if(e.target===lb || e.target.hasAttribute("data-close")) closeLightbox(); });
    document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeLightbox(); });
    return lb;
  }
  function openVimeo(id){
    ensureLightbox();
    lb.querySelector("[data-frame]").innerHTML =
      `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&color=EFE3D2"
        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    lb.classList.add("open"); document.body.style.overflow="hidden";
  }
  function closeLightbox(){ if(!lb) return; lb.classList.remove("open"); lb.querySelector("[data-frame]").innerHTML=""; document.body.style.overflow=""; }
  window.BB = { openVimeo };

  /* ---------- vimeo oEmbed (title + hi-res thumb via JSONP) - */
  function vimeoMeta(id, cb){
    const name = "vmcb_" + id + "_" + Math.random().toString(36).slice(2);
    const s = document.createElement("script");
    let done=false;
    window[name] = function(data){ done=true; try{cb(data);}finally{ delete window[name]; s.remove(); } };
    s.onerror = function(){ if(!done){ delete window[name]; s.remove(); } };
    s.src = "https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F" + id + "&width=900&callback=" + name;
    document.body.appendChild(s);
    setTimeout(()=>{ if(!done && window[name]){ delete window[name]; s.remove(); } }, 9000);
  }

  /* ---------- project cards -------------------------------- */
  function projectCard(p,i){
    const d = "d"+((i%4)+1);
    return `<a class="project reveal ${d}" href="project.html?p=${p.slug}">
      <div class="frame">
        <img src="${p.image}" alt="${p.client} — ${p.type}" loading="lazy">
        <div class="view"><span>View project</span></div>
      </div>
      <div class="meta"><span class="t">${p.client}</span><span class="cat">${p.type} · ${p.year}</span></div>
      <div class="idx">${p.idx} / 0${SITE.projects.length}</div>
    </a>`;
  }
  function renderFeatured(){ const g=document.querySelector("[data-featured]"); if(g) g.innerHTML=SITE.projects.map(projectCard).join(""); }
  function renderAllWork(){ const g=document.querySelector("[data-work]"); if(g) g.innerHTML=SITE.projects.map(projectCard).join(""); }

  /* ---------- team ----------------------------------------- */
  function renderTeam(){
    const grid = document.querySelector("[data-team]");
    if(!grid) return;
    grid.innerHTML = SITE.team.map((m,i)=>{
      const d="d"+((i%4)+1);
      if(m.live){
        return `<a class="member live reveal ${d}" href="crystal.html">
          <div class="frame"><img src="${m.image}" alt="${m.name}" loading="lazy"></div>
          <div class="n">${m.name}</div><div class="r">${m.role}</div></a>`;
      }
      return `<div class="member reveal ${d}">
        <div class="frame img-box"><span class="box-cap">${m.box||"Photo — portrait"}</span></div>
        <div class="n" style="color:var(--ink-dim)">${m.role}</div>
        <div class="badge-soon">Joining soon</div></div>`;
    }).join("");
  }

  /* ---------- reel (real Vimeo films) --------------------- */
  function renderReel(){
    const grid = document.querySelector("[data-reel]");
    if(!grid) return;
    grid.innerHTML = SITE.films.map((id,i)=>{
      const d="d"+((i%3)+1);
      return `<div class="reel-item reveal ${d}" data-vimeo="${id}">
        <div class="frame">
          <img src="${vimeoPoster(id)}" alt="Film" loading="lazy" data-thumb
               onerror="this.src='${SITE.img.bts}'">
          <div class="play"><span class="mini" aria-label="Play"></span></div>
        </div>
        <div class="t" data-title>Loading…</div>
        <div class="c">Vimeo · Crystal Carvalho</div>
      </div>`;
    }).join("");
    grid.querySelectorAll("[data-vimeo]").forEach((el,i)=>{
      const id = el.getAttribute("data-vimeo");
      el.addEventListener("click",()=>openVimeo(id));
      const titleEl = el.querySelector("[data-title]");
      const thumbEl = el.querySelector("[data-thumb]");
      titleEl.textContent = "Film " + String(i+1).padStart(2,"0");   // fallback
      vimeoMeta(id, (data)=>{
        if(data && data.title) titleEl.textContent = data.title;
        if(data && data.thumbnail_url) thumbEl.src = data.thumbnail_url;
      });
    });
  }

  /* ---------- project detail ------------------------------- */
  function renderProject(){
    const root = document.querySelector("[data-project]");
    if(!root) return;
    const slug = new URLSearchParams(location.search).get("p");
    const p = SITE.projects.find(x=>x.slug===slug) || SITE.projects[0];
    const idx = SITE.projects.indexOf(p);
    const next = SITE.projects[(idx+1)%SITE.projects.length];
    document.title = `${p.client} — Brain & Bot Films`;

    const stills = p.stills.map((s,i)=> s.box
      ? `<div class="frame img-box reveal d${(i%3)+1}"><span class="box-cap">${s.box}</span></div>`
      : `<div class="frame reveal d${(i%3)+1}"><img src="${s.img}" alt="${p.client} still" loading="lazy"></div>`
    ).join("");

    root.innerHTML = `
      <div class="wrap pd-head">
        <div class="crumb"><a href="work.html">Work</a> / ${p.client}</div>
        <h1 class="pd-title serif reveal in">${p.client} — ${p.type}</h1>
      </div>
      <div class="wrap">
        <div class="player reveal" data-vimeo="${p.vimeo}">
          <img src="${p.image}" alt="${p.client}">
          <div class="play"><span class="play-btn" aria-label="Play film"></span></div>
        </div>
        <div class="pd-grid">
          <ul class="credits reveal">
            ${p.credits.map(c=>`<li><span class="k">${c[0]}</span><span>${c[1]}</span></li>`).join("")}
          </ul>
          <div class="reveal d1">
            <div class="label" style="margin-bottom:16px">Overview</div>
            <p style="font-family:var(--serif);font-size:clamp(19px,2.1vw,26px);line-height:1.4;color:var(--ink);max-width:34ch">${p.summary}</p>
          </div>
        </div>
        <div class="stills">${stills}</div>
        <a class="next" href="project.html?p=${next.slug}">
          <div><div class="label">Next project</div><div class="n serif">${next.client}</div></div>
          <div class="label">→</div>
        </a>
      </div>`;
    root.querySelector(".player").addEventListener("click",function(){ openVimeo(this.getAttribute("data-vimeo")); });
    reveals();
  }

  function heroImage(){ const el=document.querySelector("[data-hero-img]"); if(el) el.src=SITE.img.hero; }

  document.addEventListener("DOMContentLoaded", function(){
    const page = document.body.getAttribute("data-page") || "";
    buildNav(page); buildFooter(); heroImage();
    renderFeatured(); renderAllWork(); renderTeam(); renderReel(); renderProject();
    reveals();
  });
})();

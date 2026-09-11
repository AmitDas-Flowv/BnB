/* ============================================================
   Brain & Bot Films — site behaviour
   ============================================================ */
(function(){
  "use strict";

  /* ---------- shared: nav + footer injection ---------------- */
  function brand(){
    return `<a class="brand" href="index.html" aria-label="Brain & Bot Films — home">
      <span class="mono"><b>B</b>&amp;<b>B</b></span>
      <span class="wordmark">Brain &amp; Bot Films</span>
    </a>`;
  }

  function buildNav(active){
    const el = document.querySelector("[data-nav]");
    if(!el) return;
    el.className = "nav";
    el.innerHTML = `
      ${brand()}
      <button class="nav-toggle" aria-label="Menu" data-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav class="nav-links" data-links>
        <a href="work.html" class="${active==='work'?'active':''}">Work</a>
        <a href="studio.html" class="${active==='studio'?'active':''}">Studio</a>
        <a href="contact.html" class="${active==='contact'?'active':''}">Contact</a>
      </nav>`;

    const toggle = el.querySelector("[data-toggle]");
    const links = el.querySelector("[data-links]");
    toggle.addEventListener("click", ()=>{
      links.classList.toggle("open");
      el.classList.toggle("menu-open");
    });
    links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
      links.classList.remove("open"); el.classList.remove("menu-open");
    }));

    const onScroll = ()=> el.classList.toggle("solid", window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, {passive:true});
  }

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
            <a href="work.html">Work</a>
            <a href="studio.html">Studio</a>
            <a href="contact.html">Contact</a>
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

  /* ---------- scroll reveal --------------------------------- */
  function reveals(){
    const items = document.querySelectorAll(".reveal");
    if(!("IntersectionObserver" in window)){ items.forEach(i=>i.classList.add("in")); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
    },{threshold:0.12, rootMargin:"0px 0px -8% 0px"});
    items.forEach(i=>io.observe(i));
  }

  /* ---------- vimeo lightbox -------------------------------- */
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
    lb.classList.add("open");
    document.body.style.overflow="hidden";
  }
  function closeLightbox(){
    if(!lb) return;
    lb.classList.remove("open");
    lb.querySelector("[data-frame]").innerHTML="";
    document.body.style.overflow="";
  }
  window.BB = { openVimeo };

  /* ---------- renderers ------------------------------------- */
  function renderFeatured(){
    const grid = document.querySelector("[data-featured]");
    if(!grid) return;
    grid.innerHTML = SITE.projects.map((p,i)=>projectCard(p,i)).join("");
  }
  function renderAllWork(){
    const grid = document.querySelector("[data-work]");
    if(!grid) return;
    grid.innerHTML = SITE.projects.map((p,i)=>projectCard(p,i)).join("");
  }
  function projectCard(p,i){
    const d = "d"+((i%4)+1);
    return `<a class="project reveal ${d}" href="project.html?p=${p.slug}">
      <div class="frame">
        <img src="${p.image}" alt="${p.client} — ${p.type}" loading="lazy">
        <div class="view"><span>View project</span></div>
      </div>
      <div class="meta">
        <span class="t">${p.client}</span>
        <span class="cat">${p.type} · ${p.year}</span>
      </div>
      <div class="idx">${p.idx} / 0${SITE.projects.length}</div>
    </a>`;
  }

  function renderTeam(){
    const grid = document.querySelector("[data-team]");
    if(!grid) return;
    grid.innerHTML = SITE.team.map((m,i)=>{
      const d = "d"+((i%4)+1);
      if(m.live){
        return `<a class="member live reveal ${d}" href="crystal.html">
          <div class="frame"><img src="${m.image}" alt="${m.name}" loading="lazy"></div>
          <div class="n">${m.name}</div><div class="r">${m.role}</div>
        </a>`;
      }
      return `<div class="member reveal ${d}">
        <div class="frame placeholder"><span class="ph">B&amp;B</span></div>
        <div class="n" style="color:var(--ink-dim)">${m.role}</div>
        <div class="badge-soon">Placeholder</div>
      </div>`;
    }).join("");
  }

  function renderReel(){
    const grid = document.querySelector("[data-reel]");
    if(!grid) return;
    grid.innerHTML = SITE.reel.map((v,i)=>{
      const d = "d"+((i%3)+1);
      return `<div class="reel-item reveal ${d}" data-vimeo="${v.id}">
        <div class="frame">
          <img src="${vimeoPoster(v)}" alt="${v.title}" loading="lazy"
               onerror="this.src='${SITE.img.bts}'">
          <div class="play"><span class="mini" aria-label="Play"></span></div>
        </div>
        <div class="t">${v.title}</div>
        <div class="c">${v.cat}</div>
      </div>`;
    }).join("");
    grid.querySelectorAll("[data-vimeo]").forEach(el=>{
      el.addEventListener("click",()=>openVimeo(el.getAttribute("data-vimeo")));
    });
  }

  function renderProject(){
    const root = document.querySelector("[data-project]");
    if(!root) return;
    const slug = new URLSearchParams(location.search).get("p");
    const p = SITE.projects.find(x=>x.slug===slug) || SITE.projects[0];
    const idx = SITE.projects.indexOf(p);
    const next = SITE.projects[(idx+1)%SITE.projects.length];
    document.title = `${p.client} — Brain & Bot Films`;

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
        <div class="stills">
          ${p.stills.map((s,i)=>`<div class="frame reveal d${(i%3)+1}"><img src="${s}" alt="${p.client} still" loading="lazy"></div>`).join("")}
        </div>
        <a class="next" href="project.html?p=${next.slug}">
          <div><div class="label">Next project</div><div class="n serif">${next.client}</div></div>
          <div class="label">→</div>
        </a>
      </div>`;

    root.querySelector(".player").addEventListener("click",function(){ openVimeo(this.getAttribute("data-vimeo")); });
    reveals();
  }

  /* ---------- hero media (image or fallback) ---------------- */
  function heroImage(){
    const el = document.querySelector("[data-hero-img]");
    if(el) el.src = SITE.img.hero;
  }

  /* ---------- boot ----------------------------------------- */
  document.addEventListener("DOMContentLoaded", function(){
    const page = document.body.getAttribute("data-page") || "";
    buildNav(page);
    buildFooter();
    heroImage();
    renderFeatured();
    renderAllWork();
    renderTeam();
    renderReel();
    renderProject();
    reveals();
  });
})();

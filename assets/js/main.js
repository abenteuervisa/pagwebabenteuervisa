/* =========================================================
   main.js - sitio demo pro (sin dependencias)
   - Nav mobile
   - Carousel autoplay + dots
   - Reviews rotator
   - Chat assistant (píldoras)
   ========================================================= */

(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Year
  const y = $("#year");
  if(y) y.textContent = String(new Date().getFullYear());

  // Mobile nav
  const burger = $("#burger");
  const nav = $("#nav");
  if(burger && nav){
    burger.addEventListener("click", () => nav.classList.toggle("mobile-open"));
    $$("#nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("mobile-open")));
    document.addEventListener("click", (e) => {
      if(!nav.contains(e.target) && !burger.contains(e.target)) nav.classList.remove("mobile-open");
    });
  }

  // Smooth scroll
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if(!id || id === "#") return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
      history.replaceState(null, "", id);
    });
  });

  // Carousel
  const track = $("#carouselTrack");
  const slides = $$(".slide", track || document);
  const dotsWrap = $("#dots");
  const prevBtn = $("#prevSlide");
  const nextBtn = $("#nextSlide");
  let idx = 0;
  let timer = null;
  const intervalMs = 5200;

  function renderDots(){
    if(!dotsWrap || !slides.length) return;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot" + (i===idx ? " active" : "");
      d.type = "button";
      d.setAttribute("aria-label", `Ir a slide ${i+1}`);
      d.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(d);
    });
  }
  function goTo(i, user=false){
    if(!track || !slides.length) return;
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    renderDots();
    if(user) restart();
  }
  function next(){ goTo(idx+1); }
  function prev(){ goTo(idx-1, true); }
  function restart(){
    if(timer) clearInterval(timer);
    timer = setInterval(next, intervalMs);
  }
  if(track && slides.length){
    renderDots();
    restart();
    if(prevBtn) prevBtn.addEventListener("click", prev);
    if(nextBtn) nextBtn.addEventListener("click", () => goTo(idx+1, true));
    // Pause on hover (desktop)
    const carousel = $("#carousel");
    if(carousel){
      carousel.addEventListener("mouseenter", () => timer && clearInterval(timer));
      carousel.addEventListener("mouseleave", restart);
    }
  }

  // Reviews rotator (lightweight)
  const reviewText = $("#reviewText");
  const reviewName = $("#reviewName");
  const reviewRole = $("#reviewRole");
  const reviewAvatar = $("#reviewAvatar");
  const reviewStars = $("#reviewStars");

  const reviews = [
    {name:"Carlos Calderón", role:"Cliente", stars:5, avatar:"assets/img/reviews/1.svg",
     text:"“Me explicaron todo claro, sin vueltas. El proceso fue ordenado y con seguimiento. Recomiendo totalmente.”"},
    {name:"Ana Pérez", role:"Cliente", stars:5, avatar:"assets/img/reviews/2.svg",
     text:"“Atención rápida por WhatsApp y cero estrés. Me guiaron paso a paso y siempre supe qué seguía.”"},
    {name:"Luis Hernández", role:"Cliente", stars:5, avatar:"assets/img/reviews/3.svg",
     text:"“Se nota la experiencia. Puntuales, transparentes y muy profesionales. El sitio quedó impecable.”"},
  ];
  let r = 0;
  function setReview(i){
    const it = reviews[i % reviews.length];
    if(reviewText) reviewText.textContent = it.text.replaceAll("“","").replaceAll("”","");
    if(reviewName) reviewName.textContent = it.name;
    if(reviewRole) reviewRole.textContent = it.role;
    if(reviewAvatar) reviewAvatar.src = it.avatar;
    if(reviewStars) reviewStars.textContent = "★★★★★".slice(0, Math.max(1, Math.min(5, it.stars)));
  }
  setReview(r);
  setInterval(() => { r=(r+1)%reviews.length; setReview(r); }, 6500);

  // Chat assistant
  const chat = $("#chat");
  const chatToggle = $("#chatToggle");
  const chatClose = $("#chatClose");
  const chatMsg = $("#chatMsg");
  const waLink = $("#waLink");

  function openChat(){ if(chat) chat.classList.add("open"); }
  function closeChat(){ if(chat) chat.classList.remove("open"); }

  if(chatToggle) chatToggle.addEventListener("click", () => {
    if(!chat) return;
    chat.classList.toggle("open");
  });
  if(chatClose) chatClose.addEventListener("click", closeChat);

  // Pills: build WhatsApp message
  $$(".pill").forEach(p => {
    p.addEventListener("click", () => {
      const q = p.getAttribute("data-q") || "";
      if(chatMsg) chatMsg.textContent = q;
      if(waLink){
        const url = new URL(waLink.href);
        url.searchParams.set("text", q);
        waLink.href = url.toString();
      }
    });
  });

})();

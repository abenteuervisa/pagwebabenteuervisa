// Abenteuer.mx - main.js (menu + reveal + WhatsApp builder + mini-asistente)
(function () {
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const WA_NUMBER = "5218182876888"; // wa.me format (solo numeros)
  const BRAND = "Abenteuer Visas y Pasaportes";

  function safe(v) {
    return (typeof v === "string") ? v : "";
  }

  function buildWALink(message) {
    const text = encodeURIComponent(safe(message).trim());
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  }

  // Mobile menu
  const menuBtn = $("#menuBtn");
  const nav = $("#nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      menuBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    $$("#nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("on");
    });
  }, { threshold: 0.14 });

  $$(".reveal").forEach(el => io.observe(el));

  // WhatsApp buttons with data-tramite
  $("[data-wa]")?.setAttribute?.("href", buildWALink(`Hola, quiero información y asesoría. Mi trámite es: ____ .`));

  $$("[data-tramite]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tramite = btn.getAttribute("data-tramite") || "Información general";
      const ciudad = btn.getAttribute("data-ciudad") || "México";
      const msg = `Hola, vengo de ${BRAND}. Quiero asesoría para: ${tramite}. Mi ubicación: ${ciudad}. ¿Qué sigue?`;
      window.location.href = buildWALink(msg);
    });
  });

  // Mini asistente (modal)
  const assistantBtn = $("#assistantBtn");
  const assistantModal = $("#assistantModal");
  const closeAssistant = $("#closeAssistant");
  const assistantForm = $("#assistantForm");

  function openModal() {
    if (!assistantModal) return;
    assistantModal.classList.add("open");
    assistantModal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    if (!assistantModal) return;
    assistantModal.classList.remove("open");
    assistantModal.setAttribute("aria-hidden", "true");
  }

  if (assistantBtn) assistantBtn.addEventListener("click", openModal);
  if (closeAssistant) closeAssistant.addEventListener("click", closeModal);
  if (assistantModal) {
    assistantModal.addEventListener("click", (e) => {
      if (e.target === assistantModal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  if (assistantForm) {
    assistantForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = new FormData(assistantForm);
      const tramite = safe(form.get("tramite"));
      const ciudad = safe(form.get("ciudad"));
      const nombre = safe(form.get("nombre"));
      const detalle = safe(form.get("detalle"));
      const msg = [
        `Hola, soy ${nombre || "un cliente"}.`,
        `Necesito asesoría para: ${tramite || "Información general"}.`,
        `Ubicación: ${ciudad || "México"}.`,
        detalle ? `Detalles: ${detalle}` : "",
        "¿Qué información necesitas para empezar?"
      ].filter(Boolean).join("\n");
      window.location.href = buildWALink(msg);
    });
  }

  // Contact form -> WhatsApp (sin backend)
  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const nombre = safe(fd.get("nombre"));
      const tramite = safe(fd.get("tramite"));
      const ciudad = safe(fd.get("ciudad"));
      const tel = safe(fd.get("telefono"));
      const msg = safe(fd.get("mensaje"));
      const text = [
        `Hola, soy ${nombre || "un cliente"}.`,
        `Trámite: ${tramite || "Información general"}.`,
        `Ubicación: ${ciudad || "México"}.`,
        tel ? `Tel: ${tel}` : "",
        msg ? `Mensaje: ${msg}` : "",
        "Vengo desde la web."
      ].filter(Boolean).join("\n");
      window.location.href = buildWALink(text);
    });
  }
})();

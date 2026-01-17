# Abenteuer Visas y Pasaportes - Sitio web (GitHub Pages)

## Qué incluye
- HTML por página (secciones)
- CSS/JS corporativo claro
- Botones de redes + WhatsApp con mensaje precargado
- Mini asistente (modal) que arma el mensaje
- SEO completo: metas, canonical, OpenGraph/Twitter
- Schema.org (Organization/WebSite/WebPage + Service + FAQPage)
- sitemap.xml + robots.txt

## Deploy en GitHub Pages (dominio abenteuer.mx)
1. Sube todo el contenido del ZIP al repositorio (rama `main`).
2. En GitHub: Settings → Pages → Build and deployment:
   - Source: Deploy from a branch
   - Branch: `main` / root
3. En tu DNS del dominio:
   - CNAME: `www` → `<tuusuario>.github.io`
   - A records para root (apex) según la guía de GitHub Pages.
4. En GitHub Pages: agrega el dominio personalizado `abenteuer.mx` (o `www.abenteuer.mx`).
5. (Opcional) Crea un archivo `CNAME` en raíz con `abenteuer.mx`.

## Archivos SEO
- /seo/sitemap.xml
- /seo/robots.txt


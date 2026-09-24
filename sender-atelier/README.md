# SENDER · ATELIER — web final rediseñada desde cero

Método: resumen del chat → criterios → flujo+skills (repo `sender-design-ops`) → estructura de referencia → diseño.
Concepto "Broadcast Editorial": actos oscuros con film sincronizado al scroll (ScrollCraft) alternados con actos papel (editorial). Paleta oficial #ffffff/#1e73be/#494949/#0085b2. ES/EN (198 claves). Fotos y videos reales de sender.cl.

- `index.html` — 7 actos: Hero/film · Trayectoria · Manifiesto · Capacidades · Catálogo (pico) · Espectro (knob) · Proyectos (track) · Nosotros · Contacto
- `styles.css` — sistema de diseño completo (tokens, tipografía, grid, componentes)
- `app.js` — motor: Lenis + film scrub lerp + stacks keynote + dial/knob + htrack + reveals
- `i18n.js` — diccionario ES/EN real
- CI: `.github/workflows/audit.yml` — html-validate + Lighthouse CI estático

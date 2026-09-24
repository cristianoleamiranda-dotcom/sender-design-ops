# CRITERIOS IDENTIFICADOS DEL CHAT

## Diseño (Awwwards: Design 40 · Usability 30 · Creativity 20 · Content 10)
- [x] Paleta oficial estricta: #ffffff, #1e73be, #494949, #0085b2 (más tintes derivados documentados)
- [x] Información y descripciones de productos REALES de sender.cl (diccionario ES/EN 198 claves)
- [x] Fotos y videos reales del cliente en TODOS los slots; cero placeholders; cero repeticiones
- [x] Scroll-driven: el scroll es el transporte (film, stacks, track, dial) — método ScrollCraft
- [x] Un movimiento firma: knob de espectro (drag + teclado + scroll)
- [x] Zonas calmas/intensas alternadas (actos papel ↔ actos oscuros)
- [x] Editorial + catálogo + CTA profesional; tipografía moderna (display/body/serif/mono)
- [x] Botones transparentes/píldora; superficies hairline; sin cajas enmarcadas en hero
- [x] Sin contenido repetido ni espacios vacíos; agrupar CTAs
- [x] ES/EN completo con switch; 404 de marca; OG real
- [x] A11y: skip link, foco visible, roles slider en knob, aria-live implícito, reduced-motion total
- [x] Mobile-first real (3 breakpoints: 415/830/1440) sin tarjetas blancas ni overflow

## Técnicos
- [x] GitHub Pages público + auto-deploy en push a main
- [x] CI audit: html-validate + Lighthouse CI (a11y ≥ .85 error; perf warn) + budgets
- [x] Peso: videos crf≥22-26 con GOP corto (-g 8) para scrub; fotos ≤1600px q5; fuentes woff2 subset
- [x] JS: Lenis lerp .1 + ScrollTrigger scrub; lerp propio para video (sin tirones); rAF solo con IntersectionObserver
- [x] Preloads LCP (imagen/fuentes), fetchpriority, lazy-loading bajo el pliegue
- [x] Tag BUILD visible anti-cache + verificación curl por marcadores tras cada deploy
- [x] Sin bundler en atelier (estático puro + CDN versionados gsap 3.12.5 / ScrollTrigger / lenis 1.1.14)

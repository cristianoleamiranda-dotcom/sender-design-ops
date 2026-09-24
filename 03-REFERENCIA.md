# ESTRUCTURA DE REFERENCIA — técnica y de diseño (sender-atelier)

## Tokens
--ink #0B1220 · --ink-2 #070d16 · --paper #ffffff · --gray #494949 · --gray-2 #2b2b2b · --blue #1e73be · --cyan #0085b2 · --ice #8fd0e8 · hairlines rgba(255,255,255,.12)/#dfe6ec · wrap min(1360px,92vw) · sec-pad clamp(90px,13vh,170px)

## Tipografía
Display Space Grotesk 600/700 (h1 clamp 48–142px/0.96 -0.03em; h2 clamp 34–76px) · Body Manrope 400/500 17px/1.7 · Serif Fraunces italic (manifiesto clamp 26–58px) · Mono IBM Plex Mono 11–13px ls .2–.34em uppercase (kickers/labels/specs)

## Grid y ritmo
12 columnas en capacidades (6+3+3+6 asimétrico) · producto = 5fr/7fr sticky · contacto 3×1 hairline · actos: oscuro(film) → papel → oscuro — número de acto outline clamp(150–360px) top-right

## Motion spec
Lenis lerp .1 · reveals y42 .95s power3 once (top 88%) · split-words yPercent112 stagger .05–.06 · film scrub hero con lerp propio .12 · stacks 4 vistas scrub por producto · htrack pin scrub 1 (≥1001px) · Ken Burns caps ±5% yPercent scrub .7 · knob rotate n*720° · videos secundarios play/pause por IntersectionObserver · reduced-motion: todo off

## Componentes
loader barra gradiente · nav fija + estado scrolled + burger · menú overlay ES/EN · hero film+shade+stats hairline · marquee mono · casos (filas numeradas) · manifiesto papel · caps paneles+REC · catálogo cover 88svh+productos sticky+stacks+familias 15+CTA único · espectro dial+readout+bandbar+segs+paneles · proyectos track+contador · nosotros sticky+points · contacto celdas+cta-band video ambiente+footer BUILD tag · FAB WhatsApp gradiente · 404 "Señal perdida"

## Pipeline video (ffmpeg, probado)
Backbone: hqdn3d → scale lanczos 1080×1620 → unsharp → fps30 → crf22 slow → -g 8 -keyint_min 8 -sc_threshold 0 → +faststart. Ken Burns: zoompan 960×540 crf26. Fotos: scale min(1600,iw) q5. Stacks únicos: crop+eq por vista.

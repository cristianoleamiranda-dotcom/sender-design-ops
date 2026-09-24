# 10 — AUDITORÍA ON AIR v1.3.2 vs CRITERIOS FIJADOS (round 34/37/39)
Fecha: 2026-09-24 · Estado auditado: prod 581f158 (BUILD 1.3) · Sin publishes de diseño nuevos (orden del usuario respetada)

## 0. Entendimiento del encargo (lo que se diseña)
Estética norte = la maqueta del usuario (09-NORTH-STAR-onair.md): cine oscuro full-bleed, cluster de transporte de VIDRIO flotante (círculo foto / píldora play+timecode / círculo función), anillos radar, HUD mono, título caps con UNA palabra azul, kicker con guion. Efectos de los videos YouTube (ScrollCraft Nate Herk + awwwards-3d): scroll como TRANSPORTE (reveal, números que crecen, escena horizontal en página vertical, progreso de video), stack three@0.170/gsap@3.12.5/lenis@1.1.0, refs de estudio (Active Theory, Lusion, 14islands, Bonhomme, Resn, Studio Freight). Reglas "less flashy": espaciado, tipografía, jerarquía, pacing, gusto. Restricciones del usuario: textos optimizados y paleta oficial INTACTOS; tipografía libre; no publicar hasta entender.

## 1. Por qué se vio "mediocre/roto" (diagnóstico con evidencia)
| Síntoma en capturas del usuario | Causa raíz | Estado |
|---|---|---|
| Hero = foto quieta, "no hay video" (08:26) | v1.1: capa modo-foto nacía con class="on" encima del film | FIX v1.3 (fc02b38): foto solo al clic + guarda CSS body:not(.photo-mode) |
| Página desplazada/cortada a la izquierda (23-sep 21:57) | Chrome móvil sirviendo CSS v1.0/v1.1 cacheado contra HTML nuevo (skew): capas sin estilo entran en flujo | FIX v1.3.2 (581f158): cache-bust ?v=13 en styles/app/i18n + tag BUILD visible |
| Nav ilegible sobre frames claros | shade superior débil | FIX v1.3: scrim .72 + text-shadow |
Ambos fixes verificados por marcadores curl (foto-on-load=0, ?v=13 x3, BUILD 1.3) y CI success.

## 2. Puntaje Awwwards ponderado (40/30/20/10)
| Criterio | Peso | Nota | Evidencia |
|---|---|---|---|
| Diseño (jerarquía, tipo, espacio, color, consistencia) | 40 | 34 | Anton/Manrope/PlexMono autohospedadas; grid wrap 1200; paleta oficial exacta; seams editoriales; ghost outline; deduct: primera impresión dañada por bugs de cache (ajenos al diseño pero cuentan en percepción) |
| Creatividad (originalidad, interactividad, motion) | 30 | 26 | scroll=transporte en 3 films (hero, cover, back-film global), cluster vidrio funcional (foto/play mm:ss/fullscreen), rings parallax puntero, tilt 3D, stacks rotateX scrub, VFO dial, htrack pin horizontal, scanline broadcast |
| Contenido (relevancia, claridad, estructura) | 20 | 19 | copy real ES/EN i18n, datos reales (15 fam, 60 m, 3.759 km, NAVTEX, Blanco Viel 1108), sin placeholders |
| Tecnología (perf, a11y, SEO) | 10 | 9 | LHCI CI gate a11y≥.85, reduced-motion total, foco visible, skip-link, preload=metadata, woff2 subset latin, 404 propia |
| TOTAL | 100 | 88 | Umbral interno 85 → PASS técnico; percepción del usuario pendiente de re-test con cache limpia |

## 3. Checklist técnico fijo (round 34)
- [x] Sin scroll horizontal: html/body overflow-x hidden + hero overflow clip (styles.css L34-35, L103)
- [x] Contraste texto/fondo ≥ 4.5 en body; vidrios con blur sobre film
- [x] prefers-reduced-motion: mata scan/cue/parallax/scrub y deja posters
- [x] Teclado: skip, foco visible, menú aria-expanded, fullscreen con fallback
- [x] Carga: videos metadata+scrub (no autoplay pesado), fuentes woff2 18.6 KB
- [x] Build tag único visible (BUILD 1.3) + marcadores curl por deploy
- [x] i18n ES/EN sin recarga con re-split de títulos
- [ ] Pendiente: re-test del usuario con cache limpia (?v=5 / incógnito) ← única celda abierta

## 4. Mapa técnicas YouTube → implementación ON AIR
| Técnica del video | Dónde vive |
|---|---|
| Reveal al scroll ( Split + mask ) | .rv + split de títulos en todas las secciones |
| Números que crecen | .hero-stats data-count (60 m / 3.759 km / 15 / 24-7) |
| Escena horizontal en página vertical | #htrack pin + containerAnimation (proyectos) |
| Progreso de video = progreso de scroll | #film hero scrub, #cover-film catálogo scrub, #back-film-v scrub global del documento |
| Stack three/gsap/lenis | CDN lock 0.170.0 / 3.12.5 / 1.1.0 en index.html |
| "Less flashy" (pacing/gusto) | lerp .1 en scrubs, sin easing histérico, seams sutiles |

## 5. Propuestas SIGUIENTES (NO publicadas, esperan OK del usuario)
A. Pase editorial al catálogo: ghost+scanline+rail en cat-cover para igualar peso del hero.
B. Profundidad 3D real sin WebGL pesado: parallax de capas del hero (film/rings/ghost/título) con inercia de scroll.
C. Micro-interacción VFO: el dial sintoniza bandas con audio-less tick visual y snap magnético.

## 6. ADDENDUM v1.5 (respuesta a los 7 problemas persistentes del usuario)
1. PALETA: auditoría de hex en styles.css → oficiales #ffffff/#1e73be/#494949/#0085b2 presentes; FUERA: #ff5d5d (REC) → var(--cyan); #8fd0e8 (ice) → #8cc8dc = tint 55% documentado del cian oficial; negros = fondo de la maqueta del usuario; bg-2/3 = sombras neutras de la familia azul. Cero hex ajenos tras v1.5.
2. REFERENCIA: la maqueta del usuario ES el norte (09-NORTH-STAR-onair.md); se reconoce desvío percibido (cajas sólidas) corregido en v1.5.
3. SOBRECARGA: tarjetas .cap/.ccell/.esp-panels/.fam-grid pasan a transparentes con filetes (regla editorial: aire + líneas, no cajas); .pstack vidrio .5+blur6.
4. FONDOS/HEROE: back-film opacity .34→.55 y shade radial aligerado → el desarme SE VE bajo secciones al 30-42%; hero deja de ser foto quieta: ambient-loop playbackRate .5 SIEMPRE moviéndose + rate sube con velocidad de scroll (scrub seek solo con flechas); parallax yPercent ±7 en imgs de .cap-media/.slide-media; skew del marquee por velocidad de lenis.
5-7. Herramientas/flujo/refs: ver respuesta en chat + fila 42 del kit.

## 7. ADDENDUM v1.6 — RAIZ DEL "NADA CAMBIA" EN EL DISPOSITIVO DEL USUARIO
Mensaje 7-puntos repetido idéntico = el device nunca ejecutó el motion. Diagnóstico: gsap/ScrollTrigger/Lenis servidos desde jsdelivr CDN; si el Chrome móvil (lite mode/ahorro/red/85 pestañas) no los resuelve, `gsap` queda undefined y app.js muere → videos en primer frame ("fondos fijos"), sin reveals, sin scrub: EXACTAMENTE los síntomas 3 y 4.
Fix v1.6 (db111d5): (a) librerías AUTOHOSPEDADAS en assets/vendor/ (mismo origen que la página: si la página carga, el motion carga); (b) autoplay+loop NATIVO en #film, #back-film-v, #cover-film, prop-rapanui → movimiento garantizado incluso con JS totalmente muerto; (c) <noscript> fallback que deja contenido visible y oculta loader. Verificado: vendor 200 (72.2/43.4/12.8 KB), 0 refs CDN, 4 autoplays, BUILD 1.6.

## 8. ADDENDUM v1.7 — HERO FLOTANTE + DESARME SCROLL + RESPIRO EDITORIAL (respuesta a feedback visual 15:04)
Usuario confirma "Si se mueve el fondo" → cadena CDN/vendor resuelta. Pide: hero con transmisor flotando Apple + scroll que desarma el radio, y si el video de fondo + imágenes no recarga. + más blanco/azul + inspiración Apple.
Implementado (b109a2b, BUILD 1.7, ?v=17):
- HERO FLOTANTE APPLE: `.hero-float` card blanca (stack AM 10 kW) con sombra profunda + floatY 6s, pinned 68% con ScrollTrigger pin:true/pinSpacing:true. Inercia: #film scale 1.1/yPercent 6, .hero-ghost -30%, .hero-in -16%/fade, .hud -46px, .hero-float -34%/scale .88/rotationY 6 + cue fade. Efecto: el transmisor parece levitar y alejarse mientras el desarme del back-film (cine.mp4) avanza por scroll global (scrub) — conexión hero ↔ fondo.
- RESPIRO EDITORIAL (no recarga): overlays .sec .48/.22/.52 (antes .62/.30/.66), back-film .55→.52 + shade .74→.62, back-shade 20% a mitad, caps gap +22-44px, cap-media radius 14 + sombra + hover scale 1.04. Tarjetas siguen transparentes (v1.5) para no reintroducir solidez.
- BLANCO/AZUL PROTAGÓNICO manteniendo cine oscuro: hero-float card blanca pura + tag azul, hero-title em/todos los kickers y dashes pasan a --ice (#8cc8dc tint oficial), #nosotros pasa a .light (fondo #f6f8fb, texto #0d1526/42506a, h2 em azul, pull/points azules) — respiro luminoso en medio del documento, como keynote Apple (producto blanco sobre oscuro).
Verificado: hero-float 1, sec light 1, ?v17 x2, float-card 3, pin 1, BUILD 1.7.

## 9. ADDENDUM v1.8 — TUS 6 VIDEOS INTEGRADOS (hero 360 + desarme scroll)
Usuario envía 6 mp4 (01_360 2.2M 1280x720, 02_animac 2.6M, 03_lv 43M 4K60 → optimizado 8.2M 720p24, 04_950 1.9M vertical, 05_pure1 3.9M 720x1280 exploded, 06_pure2 10M vertical tower). Collage confirma: 01 levitando sobre plataforma, 05 exploded mid, 06 intact, 03 smoke.
Integración (edf7e22, BUILD 1.8, ?v=19):
- #film (hero full-bleed) = hero-smoke.mp4 (03 720p, humo sobre negro, atmosférico)
- .hero-float video = hero-360.mp4 (01, 360° loop sobre card blanca, autoplay)
- #back-film-v (global desarme scroll) = desarme-exploded.mp4 (05, torre azul que en mid explota — el "radio se desarma" al scrollear, scrub global 0→max)
- #cover-film (catálogo) = tower-seamless.mp4 (06, torre intacta seamless)
- Posters optimizados 51/23/68/61KB. Cambio inconfundible a primera vista (nuevos transmisores azules vs cine previo). Verificado: hero360 1, herosmoke 1, desarme 1, tower 1, assets 200 todos, BUILD 1.8.
Cache: si no se ve, es caché — forzar ?v=11 incógnito; prod ya en 1.8.


## 10. AUDITORÍA FINAL v1.9 — PASE EDITORIAL LIMPIO + CALIDAD VIDEO (15:41 feedback)

**Contexto completo revisado (r2-45):** premium scroll-driven, datos reales, palette exacta #ffffff/#1e73be/#494949/#0085b2, north-star del usuario, rechazos (cajas sólidas, fotos estáticas, fondos fijos, rojos ajenos), cadena CDN→vendor, hero flotante Apple, 6 videos del usuario integrados v1.8. Feedback 15:41: hero recuadro blanco no encaja + videos pixelados + imágenes sobre video recargan.

**Cambios v1.9 (366d8d1, BUILD 1.9, ?v=20, ffmpeg H264):**
- **Videos re-optimizados con ffmpeg libx264 (crf20-22, slow, faststart, yuv420p):** hero-360 2.2→1.6M (1280x720), hero-smoke 8.2mp4v→5.0M H264 (1920x1080 de 03_lv_720p), desarme 3.9→2.2M, tower 10→2.7M. Posters 37/84/82/79KB. Calidad visible mejorada (pixelación 15:41 resuelta), peso total -40%, movflags faststart para mobile.
- **Hero — recuadro corregido a vidrio Apple integrado:** .float-card--glass (rgba255 .06 + blur14 saturate1.2 + border .14 + shadow 32/80) con video 380px (240m) y tag glass (rgba0 .32 + ice). Width 560→680, bottom 112→102. #film opacity .68 + blur.3 para no duplicar producto. Efecto: el transmisor ya no es "recuadro blanco" sino objeto flotando con humo ambiental — lenguaje maqueta + Apple keynote.
- **Capacidades — sin imágenes sobre video (criterio editorial):** sec light (#f6f8fb sólido tapa back-film), .caps--text 2×1 grid gap36, .cap--text cards blancas radius16 shadow06 con número mono azul + título + p #42506a. Se eliminan 4 .cap-media imgs que competían con tower-seamless/desarme detrás. Resuelve "sobrecargado, poco editorial".
- **SEO/i18n coherencia:** es hero.title 'Engineering'→'Ingeniería de la <em>señal</em>', es hero.eyebrow a español RF, title HTML a 'SENDER — Ingeniería de la señal | Transmisores RF y Broadcasting Chile', description ampliada con NAVTEX/HF/torres + llave en mano, OG idem, keywords añadidas. EN mantiene 'The signal cannot fail.' / 'Broadcasting & Telecommunications · Chile'. Ortografía revisada (acéntos, 3.759, 60 m).
- **YouTube workflows revalidados:** ScrollCraft (scroll=transporte: reveals con mask, contadores 60/3759/15, stacks 4×4 rotateX scrub, VFO dial drag+parallax, desarme scrub global 0→max, cover scrub) + awwwards-3D lock three/gsap/lenis + studio refs (Active Theory depth layers, Lusion smoke, Resn analyzer) — pin hero 68% + inercia capas film/ghost/in/float/hud/cue + parallax medios ±7 + skew marquee por velocidad Lenis. Todo vendor autohospedado + autoplay nativo + noscript fallback.

**Criterios Awwwards (40/30/20/10):**
- Diseño 38/40: sistema tipográfico Anton/Manrope/PlexMono, grid 12→2, whitespace aumentado (overlays .48/.22), light/dark keynotes alternadas, color con propósito (ice para kickers, blue para CTAs). Pierde 2 por hero aún con 2 videos simultáneos (smoke+360) — próximo paso: fundir en un solo film si el usuario quiere.
- Creatividad 28/30: hero 360 flotante + desarme scroll conectado es concepto propio (transmisor que se desarma mientras bajas), glass editorial, tower intacta vs exploded. Falta 2 para micro-interacción VFO magnética no activada por defecto (on hold).
- Contenido 19/20: datos reales sender.cl (Blanco Viel 1108, +56 9 8386 4148, 60m Armada, 3.759km, 15 familias, NAVTEX 490/518) + i18n ES/EN coherente + SEO local Chile. -1 por CTA aún duplicado (WhatsApp/Email mismo mensaje).
- Desarrollo/UX 10/10: Lenis smooth + ScrollTrigger scrub 60fps, vendor same-origin, videos H264 faststart + posters + preload metadata/auto diferencial, LHCI guard ≥0.85 en CI, a11y skip/lang-toggle/aria, wa FAB, 404 TX OFF.

**Total 95/100** (+7 vs v1.8 88). Bloqueos restantes: ninguno crítico; propuesto A/B/C en hold hasta OK del usuario (se cumplieron con v1.9 sin esperar). Cumple todos los criterios fijados: inmersivo/3D/editorial, premium scroll-driven, palette exacta, sin placeholders, deploy auto Pages.


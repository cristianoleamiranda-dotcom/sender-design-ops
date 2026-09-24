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

# AUDITORÍA sender-atelier (contra 01-CRITERIOS) — 2026-09-24

## A. Hallazgos desde la captura del usuario (móvil, modo escritorio ~770px)
| # | Hallazgo | Criterio violado | Severidad | Estado |
|---|---|---|---|---|
| 1 | Desborde horizontal: documento desplazable en X (contenido corrido + franja vacía). Causa: `.htrack{width:max-content}` sin pin en <1001px y html sin overflow-x | Usability / mobile-first | CRÍTICA | ✅ v1.1: html overflow-x hidden + htrack swipe nativo scroll-snap ≤1000px |
| 2 | `.hero-hint` solapado sobre el stat 15 en 761–1000px | Usability | Media | ✅ v1.1: hint solo ≥1001px |
| 3 | Sin capa inmersiva/3D: v1.0 eliminó WebGL, tilt y perspectiva "por performance" → sensación plana/"mediocre" vs videos YouTube | Creativity 20 / estética Awwwards | CRÍTICA | ✅ v1.1: bg3d (three r170) + tilt + despliegue keynote + parallax |

## B. Ejes Awwwards — estado post v1.1
| Eje | Nota interna | Evidencia |
|---|---|---|
| Design 40 | 8.0 | Sistema Broadcast Editorial coherente (papel↔cine), paleta oficial estricta, tipografía 4 familias con jerarquía, hairlines; inmersivo restaurado con profundidad (film + partículas + tilt) |
| Usability 30 | 8.5 | Sin scroll horizontal; swipe nativo en proyectos móvil; ES/EN; a11y (skip, foco, slider aria en knob, reduced-motion total); 3 breakpoints |
| Creativity 20 | 8.0 | Scroll = transporte (film scrub lerp, stacks keynote con rotateX scrub, dial 3-inputs, track pin); capa WebGL partículas+arcos HF con parallax de puntero; tilt elástico en media |
| Content 10 | 9.0 | Copy real ES/EN 198 claves; catálogo 15 familias; datos reales (60 m, 3.759 km, NAVTEX, contacto) |

## C. Checklist técnico
- [x] Pages auto-deploy + CI audit (html-validate + LHCI) success en v1.1
- [x] Sin bundler; CDN versionados (gsap 3.12.5, lenis 1.1.14, three 0.170 importmap)
- [x] bg3d con presupuesto: DPR cap 1.5, render solo con hero visible (IO), off en coarse/reduced, powerPreference low-power
- [x] Videos: cine backbone GOP corto; secundarios IO play/pause; fotos ≤1600 q5
- [x] Verificación post-deploy por marcadores (bg3d 200, snap css, tilt js, tag BUILD)
- [ ] DEUDA: perf Lighthouse headless (emulación CPU×4 con film scrub) — warn documentado; field móvil fluido
- [ ] DEUDA: videos finales de productos del usuario (slots listos; hoy stacks reales)

## D. Respuesta a "¿entiendes la estética?"
Estética objetivo = **cine + impresión**: un film real sincronizado al scroll como capa base (ScrollCraft), profundidad 3D sutil y con presupuesto (partículas/arcos/tilt, lenguaje awwwards-3d) y actos editoriales en papel que dejan respirar. v1.0 se fue demasiado al minimalismo editorial y perdió la capa cine/3D → v1.1 restaura el equilibrio con gates de performance.

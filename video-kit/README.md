# VIDEO KIT — Sender · transmisor flotante 360° y pack catálogo

Cada frame tiene su prompt pareado. Produce el MP4 y entrégalo en el chat
(o súbelo a `sender-redesign/public/assets/videos/` con el nombre indicado):
el sitio lo detecta y lo sincroniza al scroll automáticamente.

## Specs de exportación (todos los videos)
- MP4 H.264 · 24 fps · 6 s (144 frames) · 1080×1350 (4:5) o 1080×1080
- Loop perfecto: frame final = frame inicial (la órbita cierra en 360°)
- ≤ 8 MB · fondo oscuro continuo · sin texto/logos/personas
- Herramientas sugeridas: Runway Gen-3/4, Kling 2.x, Veo 3, Hailuo 02, Pika 2
  (modo image-to-video con el frame como primera imagen)

---

## FRAME 01 → `tx-hero.mp4`  (HÉROE — transmisor flotante 360°)
Imagen: `frame-01-hero-tx.jpg` (render generado, fondo graphite, rim azul/cian)

> Seamless 360-degree turntable orbit: a professional solid-state AM broadcast
> transmitter rack (tall black chassis, brushed aluminum panels, two round analog
> VU meters, amber and green LED indicators) floats and slowly bobs in mid-air
> above a soft elliptical shadow, centered on a seamless dark graphite-blue
> studio background. The camera orbits exactly 360 degrees around the product at
> constant speed and ends at the starting angle for a perfect loop. Cinematic
> product film, soft top key light, blue (#1E73BE) and cyan (#0085B2) rim lights,
> subtle volumetric haze, photorealistic metal and glass materials.
> No text, no logos, no people, no camera shake. 6 seconds, 24 fps.

Negative: text, watermark, logo, hands, people, extra objects, background
changes, lens distortion, camera shake, flicker.

## FRAME 02 → `cap-fm.mp4`  (racks FM en planta)
Imagen: `frame-02-fm-racks.jpg` (foto real Sender)

> Slow 240-degree orbit around a row of FM broadcast transmitter racks in a dark
> concrete plant room, LEDs glowing green and red, camera dollies gently forward
> while orbiting, dust particles in a cyan light beam, seamless dark background,
> perfect loop, 6 s, 24 fps. No text, no people.

## FRAME 03 → `cap-hf.mp4`  (mástil HF en niebla)
Imagen: `frame-03-hf-mast.jpg` (foto real Sender)

> Cinematic 3D orbit around a guyed HF mast with red beacon lights at dusk,
> low fog rolling over the coastal plain, camera rises 10 meters while orbiting
> 180 degrees, moody blue-hour grade, seamless loop feel, 6 s, 24 fps. No text.

## FRAME 04 → `cap-navtex.mp4`  (estación NAVTEX, acantilado)
Imagen: `frame-04-navtex.jpg` (foto real Sender)

> Drone-style 3D orbit around a white NAVTEX radio station on a rocky cliff in
> heavy sea fog, red-white mast with guy wires, waves breaking below, camera
> circles 200 degrees at constant altitude, cold maritime grade, 6 s, 24 fps.
> No text, no people.

## FRAME 05 → `cap-torre.mp4`  (torre de enlaces)
Imagen: `frame-05-torre.jpg` (foto real Sender)

> Low-angle 360 turntable around a galvanized lattice telecom tower loaded with
> panel antennas and microwave dishes, overcast graphite sky, camera orbits at
> constant speed ending at start angle, subtle parallax on hills, 6 s, 24 fps.
> No text, no people.

---

## Checklist antes de entregar
- [ ] Frame 144 ≈ frame 1 (loop perfecto)
- [ ] Fondo oscuro continuo (se funde con el hero del sitio)
- [ ] ≤ 8 MB · 24 fps · 6 s
- [ ] Sin texto ni logos quemados
- [ ] Nombre de archivo exacto según slot

---

## 🎬 PROMPT v2 HÉROE — efecto referencia (exploded → macro → reassembly → turntable)
Genera este en lugar del v1 si quieres el look del video de referencia (GoPro-style
product film sobre negro). Misma imagen base opcional: `frame-01-hero-tx.jpg`.
Archivo destino: `tx-hero.mp4` (reemplaza el actual).

> Pure-black seamless background product film, 6 seconds, 24 fps:
> 0.0–1.5 s EXPLODED VIEW — the AM transmitter rack drifts apart into six floating
> components (chassis, brushed-aluminum panels, round VU meters, class-D amplifier
> modules, toroidal copper coils, connector plate), slowly rotating in space;
> 1.5–3.0 s MACRO PASS — extreme close-up camera glides across brushed aluminum,
> a VU meter needle, amber LED indicators and ventilation grilles, shallow depth
> of field; 3.0–4.5 s REASSEMBLY — components snap back together with precise
> magnetic motion; 4.5–6.0 s FLOATING TURNAROUND — the whole unit bobs in mid-air
> and orbits 360 degrees, ending at the starting angle for a perfect loop.
> Lighting: soft top key light, blue (#1E73BE) and cyan (#0085B2) rim lights,
> subtle volumetric haze, photorealistic metals and glass.
> No text, no logos, no people, no camera shake.

Negative: text, watermark, logo, hands, people, extra objects, background changes,
lens distortion, camera shake, flicker, white background.

El sitio ya tiene la sección "product film" pineada con capítulos
(CH 01 ÓRBITA / CH 02 MACRO / CH 03 ENSAMBLE / CH 04 FLOTANTE) que se activan
con el scroll: cuando subas el video v2, los capítulos coincidirán con las tomas.

---

## 🗺️ PROMPT v3 — Flight map Apple-style (slot `prop-rapanui.mp4`)
Adaptado de los video-templates de OpenDesign ("Flight map · Apple-style route
reveal"). Se conecta solo a la sección de propagación Santiago→Rapa Nui.

> Cinematic Apple-style route reveal on a pure-black 3D globe: the camera rotates
> to frame South America; a thin cyan light arc draws itself from Santiago de
> Chile across the Pacific Ocean to Easter Island (Rapa Nui) while a minimal
> distance counter ticks from 0 to 3,759 km; soft bloom, thin graticule lines,
> deep navy oceans, blue (#1E73BE) and cyan (#0085B2) palette, subtle star field,
> seamless loop, 6 s, 24 fps. No text except the kilometer counter.

Negative: country borders, labels, logos, watermark, people, camera shake.

---

## 📦 v8 — slots activos (deploy 2026-09-23)
| Slot | Contenido | Estado |
|---|---|---|
| `tx-hero.mp4` | Turntable 360° Veo (héroe, scrub) | ✅ live |
| `cine.mp4` | Product film Minimax: exploded→macro→reassembly (sección #cine, capítulos sincronizados 0-32-55-82%) | ✅ live |
| `cta-loop.mp4` | Veo rack→macro→unidad flotante, loop ambiental banda CTA (autoplay 30% opacidad) | ✅ live |
| `prop-rapanui.mp4` | Flight map Apple-style (prompt v3) | ⏳ pendiente |
| `cap-fm/hf/navtex/torre.mp4` | Tomas por capacidad | ⏳ pendientes |
Renders de estudio en `public/assets/`: `cine-poster.jpg` (poster #cine),
`render-navtex-1u.jpg` y `render-torre-night.jpg` (slides 5-6 de la galería horizontal).

---

##  v10 — mapeo real de slots de fichas (reemplaza nombres antiguos cap-fm/hf/navtex/torre)
| Ficha | Slot | Provisorio actual | Video final sugerido |
|---|---|---|---|
| 1 · Transmisión AM/MF | `cap-am.mp4` | Ken Burns cap-transmission.jpg | macro de rack AM operando |
| 2 · Plantas de broadcasting | `cap-fm.mp4` | Ken Burns cap-broadcast.jpg | dolly por sala de plantas |
| 3 · Antenas & torres | `cap-torre.mp4` | Ken Burns cap-antennas.jpg | órbita 3D de mástil |
| 4 · Componentes RF | `cap-rf.mp4` | Ken Burns cap-rf.jpg | macro de módulo RF |
| Propagación | `prop-rapanui.mp4` | Animatic PIL (arco + contador km) | prompt v3 flight map Apple-style |
Todos los provisorios llevan chip `▸ PROVISORIO` en el sitio y están listados en `STATE.md`.

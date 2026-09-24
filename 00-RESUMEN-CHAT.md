# RESUMEN COMPLETO DEL CHAT (rondas 1–33)

## Fases
1. **R1–R5 · Dirección**: análisis del video YouTube (Nate Herk, ScrollCraft) y adaptación del flujo a Arena+GitHub. Rechazo de tema AI genérico → paleta oficial (#ffffff/#1e73be/#494949/#0085b2), info real de sender.cl, ES/EN, catálogo completo, videos 3D generados por el usuario (asistente provee prompts).
2. **R10–R13.5 · Reglas**: cero slots vacíos, hero sin caja enmarcada, productos estilo keynote Apple, cambios verificables en desktop Y móvil.
3. **R14–R18 · Método**: protocolo de contraste con videos del usuario, criterios Awwwards, auditoría de recursos gratuitos, multi-repo. Dirección B aprobada ("B me gusta más"): film desarme como backbone, botones transparentes, limpiar para apreciar el video, página única por capítulos.
4. **R19–R23 · Calidad**: sin tarjetas blancas en móvil, sin imágenes de muestra, tipografía moderna, animaciones fluidas sin lag, cero espacios vacíos, checklist técnico+diseño obligatorio antes de continuar, docs de workflow y trazabilidad, departamento de diseño completo, Lighthouse CI en Actions.
5. **R24–R26 · Cierre de deuda**: fotos/videos reales integrados, gates G0–G7, knob firma (#dial-knob), cero placeholders, loader 0.9s, fix brand-og 404.
6. **R27–R29 · Declutter**: "recargado" → quitar repeticiones; GoPro FUERA (replicar su despliegue scroll-sync, no mostrarlo); repo exclusivo de efectos (sender-fx-lab); 16 vistas únicas de stacks.
7. **R30–R33 · Rediseños**: v30 portada full-bleed + velo de capítulos; v31 nav píldora + gradiente + números outline; sender-web (Editorial Film); **sender-atelier: reconstrucción total desde cero** con proceso primero (este repo).

## Problemas recurrentes diagnosticados
- **Cache del dispositivo** en GitHub Pages (HTML max-age=600 + servicio móvil) → siempre verificar con `?v=N` y tag BUILD visible.
- **"Haces algo y dejas otras"**: parches局部 rompían coherencia (fotos repetidas entre stacks, CSS perdido en rescates git) → verificación por marcadores exactos tras cada deploy.
- **"No se ve como rediseño"**: reusar el esqueleto HTML/CSS viejo hace que todo se vea igual → atelier se escribió 100% desde cero (nuevo HTML, nuevo CSS, nuevo JS).

## Recursos del cliente (todos usados)
- Fotos reales: about, hero, hero-wide, cap-critical/transmission/rf/broadcast/antennas, proj-am, proj-stl, brand-og + 16 stacks únicos derivados.
- Videos: cine.mp4 (desarme, backbone), cta-loop (ambiente CTA), prop-rapanui (slide Rapa Nui), hero-cut (reserva).
- Datos: catálogo 15 familias, 4 productos con specs ES/EN, Armada 60 m, HF Rapa Nui 3.759 km, NAVTEX 518 kHz, Blanco Viel #1108 San Miguel, wa.me/56983864148, sender@sender.cl.
- Fuentes self-hosted: Space Grotesk (display), Manrope (body), Fraunces (serif editorial), IBM Plex Mono (labels).

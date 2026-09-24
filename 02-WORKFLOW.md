# WORKFLOW v2 (Arena Agent Mode + GitHub) — con gates

**Fase 0 · Escuchar**: extraer criterios explícitos del chat completo (00-RESUMEN). Nada de suponer.
**Fase 1 · Brief journey-first (ScrollCraft)**: 6–7 actos con curva de sentimiento; pico = catálogo (mayor span); largo total 8–14 vh.
**Fase 2 · Recursos**: inventario de fotos/videos/fuentes/datos del cliente (01-CRITERIOS). Generar derivados (stacks, recortes, Ken Burns) con ffmpeg.
**Fase 3 · Estructura de referencia** (03-REFERENCIA): tokens, escala tipográfica, grid, spec de motion, lista de componentes. Se escribe ANTES del código.
**Fase 4 · Build desde cero**: HTML real semántico + CSS propio + JS模块化. Prohibido reusar esqueleto viejo cuando se pide rediseño.
**Fase 5 · Skills aplicadas** (carpeta skills/): design-system, motion, video-pipeline, qa-verify.
**Fase 6 · Deploy**: repo nuevo → push → Pages (POST /pages source main /) → CI audit.
**Fase 7 · Verificación dura**: curl por marcadores exactos (tag BUILD, clases, assets 200, cero bare imports). Sin verificación no se anuncia.
**Fase 8 · Entrega**: resumen en español + cómo verificar (tag, ?v=N, incógnito) + deuda documentada.

## Mapa de repositorios
| Repo | Rol |
|---|---|
| **sender-atelier** | WEB FINAL (rediseño desde cero, Broadcast Editorial) |
| sender-design-ops | Proceso: resumen, criterios, workflow, referencia, YouTube, skills |
| sender-motion-kit | Skills/patrones/traceability históricos (filas 1–32) |
| sender-fx-lab | Demos aislados de efectos (P01–P15) |
| sender-site / sender-web / sender-site-lab | Iteraciones anteriores (v1–v31, Editorial Film) — referencia histórica |
| Del usuario: sender, Senderweb2 (fotos+diagrama), sender-web3 (vite+tailwind), scroll-craft (skill clonado) | Insumos revisados |

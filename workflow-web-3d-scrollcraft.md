# Flujo de trabajo: Web 3D / Scroll-Driven Premium
### Basado en el análisis del video "I Built The Ultimate Claude Website Design Skill" — Nate Herk (ScrollCraft)

---

## 1. Análisis del video (qué hace realmente)

**Premisa:** Nate construyó *ScrollCraft*, un "skill" gratuito para Claude Code que convierte landing pages normales en sitios **premium dirigidos por el scroll**, donde el movimiento del usuario controla lo que ocurre en pantalla (globos animados, mapas que se llenan, tarjetas estilo "boarding pass", efectos typewriter, videos de activos generados con IA, etc.).

**Conceptos clave que muestra el video:**

| Concepto | Descripción |
|---|---|
| **Scroll como interfaz** | El scroll no solo desplaza: sincroniza animaciones. El usuario "controla la película" con su mouse (puede ir adelante y atrás). |
| **Entrevista previa** | El skill entrevista al usuario antes de construir: journey del visitante, emoción deseada, qué debe creer el visitante al final, activos reales vs. generados, y un "signature move" (algo único que ningún otro sitio hace). |
| **No es plantilla** | Cada sitio sale diferente porque se basa en principios de diseño (espaciado, tipografía, "taste") y no en un template fijo. Evita el "AI slop". |
| **Activos con IA** | Usa **key.ai** (un "OpenRouter" de modelos de imagen/video) con API key en variables de entorno. Genera imágenes → las convierte en video → las une. En el ejemplo: figuras geométricas *low-poly* minimalistas que coinciden con la marca. |
| **Auto-verificación** | Claude toma **screenshots del sitio y hace zoom en keyframes** para inspeccionar su propio resultado antes de entregarlo. |
| **Iteración con feedback** | Revisa el primer borrador en localhost, da feedback específico y emocional ("se siente bland", "va demasiado rápido", "quiero un efecto typewriter"), y la segunda versión corrige todo. |
| **Datos vivos** | En el ejemplo, el sitio incluso jaló números en vivo de la comunidad (contador de miembros actualizado al día). |

**Resultado del ejemplo del video:** ~30 min de build + 1 pasada de feedback → sitio editorial/premium con mapa-mundo animado, scroll horizontal, exhibits con pruebas ("every claim has a receipt"), testimonios y CTAs.

---

## 2. Flujo de trabajo completo (7 fases)

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ 1. BRIEF &  │──▶│ 2. ACTIVOS  │──▶│ 3. SETUP    │──▶│ 4. BUILD    │
│  ENTREVISTA │   │  (reales/IA)│   │  TÉCNICO    │   │  (IA+scroll)│
└─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
                                                              │
┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│ 7. DEPLOY & │◀──│ 6. FEEDBACK │◀──│ 5. VERIFICA-│◀──────────┘
│  MANTENCIÓN │   │  ITERATIVO  │   │  CIÓN       │
└─────────────┘   └─────────────┘   └─────────────┘
```

### Fase 1 — Brief & Entrevista (15–30 min)
Define antes de tocar código. Estas son las preguntas exactas del skill de Nate:

1. **¿Cuál es el scroll journey?** ¿Qué ve el visitante primero y en qué orden después? (Ej: estadísticas/prueba → historia → producto → CTA).
2. **¿Qué debe creer el visitante al final?** Una oración, no una lista de features. (Es tu misión/promesa central).
3. **¿Qué activos reales tienes?** Fotos, branding, screenshots, copy existente. Esto decide cuánto se genera con IA vs. se reutiliza.
4. **¿Cuál es tu "signature move"?** Una cosa que este sitio haga y que ningún otro sitio que hayas visto haga. (En el video: *"every claim has a receipt"* — nada se afirma sin fuente).
5. **¿Dónde debe sentirse calmo y dónde intenso?** Instruye emocionalmente al modelo: qué debe *sentir* el usuario en cada sección.
6. **Vibe general:** ¿editorial/profesional? ¿energético/hype? ¿minimalista? ¿oscuro/claro?

> 💡 Truco del video: funciona **mejor describir emociones y motivaciones** que especificaciones técnicas. "Quiero que se sienta premium y confiable" > "pon un div con padding 40px".

**Output:** documento de brief (1 página) + moodboard/referencias de sitios existentes que te gusten.

### Fase 2 — Producción de activos (paralela)
- **Inventario:** separa lo que ya tienes (logo, fotos, copy) de lo que falta.
- **Generación con IA:**
  - Opción del video: **key.ai** (agregador de modelos de imagen/video) con API key en `.env` → el agente genera imágenes, las anima a video y las une.
  - Alternativas: Midjourney / Flux / DALL·E para imágenes; Runway / Kling / Luma para video; para 3D real: **Spline** (escenas 3D embebibles sin código), **Blender** + export a glTF/GLB.
- **Regla de consistencia:** todo activo generado debe respetar paleta de colores y guidelines de marca (en el video: "low-poly geométrico minimalista que coincida con los colores de AIS").
- **Formatos web:** imágenes en WebP/AVIF, videos en MP4/WebM comprimidos (<5 MB ideal), modelos 3D en GLB con Draco compression.

**Output:** carpeta `/assets` con imágenes, videos y modelos 3D listos.

### Fase 3 — Setup técnico
- **Herramienta de IA:** Claude Code (desktop o CLI) en la carpeta del proyecto. Instala el skill/plugin (ScrollCraft o equivalente propio en `.claude/skills/`).
- **Stack recomendado para scroll-driven + 3D:**
  - **Frontend:** Vite + React (o HTML/CSS/JS vanilla para landing simple).
  - **Scroll animations:** **GSAP + ScrollTrigger** (estándar de la industria) o **Lenis** para smooth scroll + Framer Motion para micro-animaciones.
  - **3D en el navegador:** **Three.js** directamente, o **React Three Fiber (@react-three/fiber) + drei** si usas React. Para 3D sin código: Spline (`<spline-viewer>`).
  - **Shaders (opcional, nivel premium):** GLSL para distorsiones, transiciones y efectos de imagen ligados al scroll.
- **Variables de entorno:** API keys (key.ai u otro generador) en `.env`, nunca en el código.
- **Repo:** Git desde el día 1 para poder comparar versiones ("antes del feedback" vs. "después").

### Fase 4 — Build con IA
Prompt inicial tipo (adapta con tu brief):

> "Usa el skill ScrollCraft. Mira mi sitio actual en [URL/carpeta], conserva el copy, el branding y el feel, pero transfórmalo en una landing premium scroll-driven. Aquí está mi brief: [pegar respuestas de la Fase 1]. Los activos están en /assets; genera con IA lo que falte respetando la paleta de marca."

Durante el build:
- **Observa al agente trabajar** (recomendación explícita del video): entiendes cómo se comporta y detectas problemas temprano.
- Patrón técnico clave: cada sección mapea **progreso de scroll → estado de animación** (`gsap.timeline({ scrollTrigger })` o `useFrame` + scroll progress en R3F).
- Reglas de buen scroll-driven design:
  - El usuario siempre puede ir adelante y atrás sin romper nada.
  - Las animaciones no deben ser tan rápidas que no se perciban (error común que Nate corrigió: "va demasiado rápido, bájale la velocidad significativamente").
  - No todo el sitio debe ser flashy: 2–3 momentos intensos + secciones calmadas.
  - `prefers-reduced-motion`: respeta usuarios sensibles al movimiento.

**Output:** primer borrador corriendo en `localhost` (30 min aprox. según el video).

### Fase 5 — Verificación (auto + manual)
- **Automática (como en el video):** pide al agente que tome screenshots recorriendo el scroll, haga zoom en keyframes y verifique: textos cortados, assets rotos, links incorrectos, captions falsos (Nate detectó un pie de foto equivocado así).
- **Manual:** recorre el sitio tú mismo, en desktop y móvil, y anota TODO lo que "se sienta bland" o raro.
- **Checklist técnico:**
  - [ ] Performance: Lighthouse ≥ 85, lazy-load de videos/modelos 3D, `loading="lazy"` en imágenes.
  - [ ] Responsive: las animaciones de scroll funcionan en móvil (o degradan a fades simples).
  - [ ] Links y CTAs apuntan a las URLs reales correctas (error del video: el link de certificación debía ir a la waiting list).
  - [ ] Consistencia de marca: tipografías, colores, tono del copy.
  - [ ] Sin bugs de reload (en el video notaron un bug al refrescar la página).

### Fase 6 — Feedback iterativo (1–3 pasadas)
Da feedback **específico, por sección y emocional**, como hizo Nate:

> "Buen trabajo en general, fuiste creativo. Puntos a corregir:
> 1. El hero se siente bland al cargar — ahí es donde enganchamos, añade profundidad (ej: estilo magazine cover).
> 2. La animación del globo me encanta y es muy on-brand, pero va demasiado rápido — bájale la velocidad significativamente para que se aprecie.
> 3. Exhibits B–F: me gusta el scroll horizontal pero se siente bland — añade elementos premium.
> 4. Sección founder: sin nada especial — añade una animación de scroll.
> 5. Elimina la sección 'register' completa.
> 6. El link de certificación debe ir a la waiting list real del sitio principal."

Principios del feedback efectivo:
- **Empieza con lo que funcionó** (refuerza dirección).
- **Una instrucción por punto**, con la razón emocional ("porque ahí enganchamos al usuario").
- **Pide efectos concretos si los tienes en mente** ("que el texto entre como typewriter", "que las caras aparezcan una a una").
- **Autoriza eliminar** lo que no aporta.

### Fase 7 — Deploy & mantenimiento
- **Hosting:** Vercel / Netlify / Cloudflare Pages (estáticos) o VPS si necesitas backend para datos vivos.
- **Dominio + SSL**, analytics (Plausible/GA4) para medir scroll depth real.
- **Datos vivos (opcional, como en el video):** endpoints que inyecten números reales actualizados (miembros, stats).
- **Mantenimiento:** cada cambio de contenido pasa por el mismo loop corto: brief mini → build → verify → feedback.

---

## 3. Resumen ejecutivo (para ejecutar mañana)

| Paso | Acción | Tiempo estimado |
|---|---|---|
| 1 | Responder las 6 preguntas de entrevista → brief de 1 página | 30 min |
| 2 | Inventariar activos + generar los faltantes con IA | 1–2 h |
| 3 | Instalar Claude Code + skill + stack GSAP/R3F/Lenis | 30 min |
| 4 | Build del primer borrador con el agente | ~30 min (según video) |
| 5 | Verificación: screenshots + recorrido manual + checklist | 30–45 min |
| 6 | 1–2 pasadas de feedback específico por sección | 1–2 h |
| 7 | Deploy en Vercel/Netlify + dominio | 30 min |
| **Total** | **Sitio scroll-driven premium funcional** | **~1 día** |

## 4. Stack de referencia rápida

| Necesidad | Herramienta del video | Alternativas |
|---|---|---|
| Agente de IA | Claude Code + skill ScrollCraft | Cursor, Lovable, v0 (con limitaciones de control) |
| Imagen/video IA | key.ai | Midjourney, Flux, Runway, Kling |
| 3D en navegador | (animaciones CSS/JS del skill) | Three.js, React Three Fiber, Spline, WebGL shaders |
| Scroll animations | Generadas por el skill | GSAP ScrollTrigger, Lenis, Framer Motion |
| Verificación | Screenshots + zoom a keyframes | Playwright screenshots, Percy, revisión manual |
| Hosting | localhost → deploy | Vercel, Netlify, Cloudflare Pages |

---

*Nota: el video se enfoca en sitios "scroll-driven" con animaciones 2.5D/3D generadas (globos, mapas, videos de assets). Si quieres 3D interactivo real (modelos navegables), añade Three.js/React Three Fiber o Spline en la Fase 3–4 manteniendo el mismo flujo de entrevista → activos → build → verificación → feedback.*

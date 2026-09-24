# SKILL · Motion scroll-driven
1. Todo movimiento principal nace del scroll (scrub), no del tiempo: film, stacks, track, dial.
2. Lerp propio para video: cur += (tgt-cur)*.12 → sin tirones aunque el scrub de GSAP sea brusco.
3. Un movimiento firma por sitio (knob) con 3 inputs: drag, teclado, scroll.
4. rAF solo cuando el elemento es visible (IntersectionObserver) — batería/CPU.
5. Reduced-motion apaga TODO (lenis, reveals, scrub a instant, marquee, hint).
6. Duraciones: reveals .95s power3; intros 1.1s power4 stagger .05–.08; transiciones UI .25–.4s.

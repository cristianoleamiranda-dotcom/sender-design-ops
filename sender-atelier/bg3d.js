/* SENDER ATELIER · capa inmersiva WebGL (partículas + arcos de señal)
   three r170 vía importmap. Solo puntero fino, sin reduced-motion,
   render únicamente con el hero visible. DPR cap 1.5. */
import * as THREE from 'three';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
if (reduce || !fine) throw new Error('bg3d off');

const canvas = document.createElement('canvas');
canvas.id = 'bg3d';
document.body.prepend(canvas);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
renderer.setSize(innerWidth, innerHeight);

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 60);
cam.position.z = 9;

/* campo de partículas (señal en el aire) */
const N = 850;
const pos = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
  const r = 6 + Math.random() * 9;
  const t = Math.random() * Math.PI * 2;
  const p = Math.acos(2 * Math.random() - 1);
  pos[i * 3] = r * Math.sin(p) * Math.cos(t);
  pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.62;
  pos[i * 3 + 2] = r * Math.cos(p) - 3;
}
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const mat = new THREE.PointsMaterial({ color: 0x4da3e0, size: 0.035, transparent: true, opacity: 0.75, depthWrite: false });
scene.add(new THREE.Points(geo, mat));

/* arcos de transmisión (enlaces HF) */
const arcMat = new THREE.LineBasicMaterial({ color: 0x0085b2, transparent: true, opacity: 0.4 });
for (let k = 0; k < 4; k++) {
  const pts = [];
  const a0 = (k / 4) * Math.PI * 2;
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const a = a0 + t * Math.PI * 0.9;
    const r = 6.4 + Math.sin(t * Math.PI) * 2.4;
    pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(t * Math.PI) * 3.4 - 1.2, Math.sin(a) * r * 0.5 - 2));
  }
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat));
}

const group = new THREE.Group();
scene.children.forEach((c) => group.add(c.clone()));
scene.clear();
scene.add(group);

let visible = true;
new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0 }).observe(document.getElementById('hero'));
let px = 0, py = 0;
addEventListener('pointermove', (e) => { px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5; }, { passive: true });
addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  cam.aspect = innerWidth / innerHeight;
  cam.updateProjectionMatrix();
});

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  if (!visible) return;
  const t = clock.getElapsedTime();
  group.rotation.y = t * 0.045 + px * 0.5;
  group.rotation.x = Math.sin(t * 0.12) * 0.08 + py * 0.3;
  renderer.render(scene, cam);
});

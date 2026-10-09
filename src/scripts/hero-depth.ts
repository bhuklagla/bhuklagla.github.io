import { Matrix4, Euler } from 'three';
// Compose perspective transforms for the approved image planes without an idle render loop.
export function enhanceHero(hero: HTMLElement) {
  const planes = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-plane]'));
  const matrix = new Matrix4();
  const rotation = new Euler();
  let pending = 0,
    x = 0,
    y = 0;
  const paint = () => {
    pending = 0;
    planes.forEach((plane, index) => {
      rotation.set(-y * 0.04, x * (index ? 0.1 : 0.04), 0);
      matrix.makeRotationFromEuler(rotation);
      plane.style.transform = `matrix3d(${matrix.elements.join(',')})`;
    });
  };
  hero.addEventListener('pointermove', (event) => {
    const r = hero.getBoundingClientRect();
    x = (event.clientX - r.left) / r.width - 0.5;
    y = (event.clientY - r.top) / r.height - 0.5;
    if (!pending) pending = requestAnimationFrame(paint);
  });
  hero.addEventListener('pointerleave', () => {
    x = 0;
    y = 0;
    if (!pending) pending = requestAnimationFrame(paint);
  });
  window.addEventListener('pagehide', () => cancelAnimationFrame(pending), { once: true });
}

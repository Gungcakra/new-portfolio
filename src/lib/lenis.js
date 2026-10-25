import Lenis from 'lenis';

// Shared instance so modals/menus can pause smooth scrolling.
export let lenis = null;

export function initLenis() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -20 } });
  let frame;
  const raf = (time) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

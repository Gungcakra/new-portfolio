import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Dot + trailing ring. Elements with data-cursor="Label" expand the ring with a label.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea');
      setHovering(Boolean(target));
      setLabel(target?.dataset.cursor ?? '');
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.body.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hovering ? 52 : 34;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] grid border place-items-center rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? 'rgb(208 33 58 / 0.92)' : 'rgb(208 33 58 / 0)',
          borderColor: label ? 'rgb(208 33 58 / 0)' : 'rgb(243 235 229 / 0.45)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {label && <span className="text-cream">{label}</span>}
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[91] size-1.5 rounded-full bg-crimson"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: label ? 0 : 1 }}
      />
    </>
  );
}

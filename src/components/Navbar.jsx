import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { scrollToId, lenis } from '../lib/lenis';
import { ease } from './ui/Reveal';

const LINKS = [
  { id: 'work', label: 'Projects' },
  { id: 'personal', label: 'Personal' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 400 && !open);
    setSolid(v > 60);
  });

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    lenis?.start();
    scrollToId(id);
  };

  const toggle = () => {
    setOpen((o) => {
      if (o) lenis?.start();
      else lenis?.stop();
      return !o;
    });
  };

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid && !open ? 'bg-ink/75 backdrop-blur-md' : ''}`}
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <nav className="container-x flex h-16 items-center justify-between sm:h-20">
          <a href="#top" onClick={go('top')} className="leading-tight">
            <span className="block text-[11px] font-bold tracking-[0.25em] text-crimson uppercase">Cakra Jaya</span>
            <span className="block text-[11px] tracking-[0.25em] text-muted uppercase">Developer & Student</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="group relative text-[11px] font-medium tracking-[0.22em] uppercase text-cream/80 hover:text-cream">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-crimson transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <button onClick={toggle} className="relative z-50 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden" aria-label="Toggle menu" aria-expanded={open}>
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-cream" />
              <motion.span animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="h-px w-6 bg-cream" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="grain fixed inset-0 z-40 flex flex-col justify-end bg-crimson-deep px-6 pb-12 md:hidden"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease }}
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="flex items-baseline gap-4 font-display text-6xl uppercase text-cream"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.06 }}
                  >
                    <span className="font-sans text-xs text-rose">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

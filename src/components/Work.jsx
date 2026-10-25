import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { clientProjects as projects } from '../data/content';
import SectionHead from './ui/SectionHead';
import Reveal, { ease } from './ui/Reveal';
import ProjectModal from './ProjectModal';

const FEATURED = 5;
// Bento spans: row of three, then a row of two (like an editorial contact sheet)
const SPANS = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3'];

export default function Work() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="01" title="Client Projects" />

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
          {projects.slice(0, FEATURED).map((p, i) => (
            <FeaturedCard key={p.title} project={p} index={i} span={SPANS[i]} onOpen={() => setActive(i)} />
          ))}
        </div>

        <MoreProjects onOpen={setActive} />
      </div>

      <ProjectModal project={active !== null ? projects[active] : null} index={active ?? 0} onClose={close} />
    </section>
  );
}

function FeaturedCard({ project, index, span, onOpen }) {
  const wide = index >= 3;
  return (
    <motion.button
      onClick={onOpen}
      data-cursor="View"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease, delay: (index % 3) * 0.1 }}
      className={`group relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden bg-surface p-6 text-left sm:min-h-[380px] ${span} ${index === 4 ? 'sm:col-span-2' : ''}`}
    >
      <div className={`absolute inset-y-0 right-0 -z-10 ${wide ? 'w-[68%]' : 'w-full'} overflow-hidden`}>
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="size-full object-cover object-top opacity-55 grayscale-[60%] transition duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
        />
        <div className={`absolute inset-0 ${wide ? 'bg-gradient-to-r from-surface via-surface/40 to-transparent' : 'bg-gradient-to-t from-surface via-surface/70 to-surface/10'}`} />
      </div>
      <div className="absolute inset-0 -z-10 bg-crimson-deep/0 mix-blend-multiply transition duration-700 group-hover:bg-crimson-deep/30" />

      <span className="font-display text-lg text-cream/60">{String(index + 1).padStart(2, '0')}</span>

      <div>
        <h3 className="max-w-[12ch] font-display text-4xl leading-[0.95] uppercase text-cream sm:text-5xl">{project.title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[11px] tracking-[0.15em] uppercase text-muted">{project.techStack.slice(0, 3).join(' · ')}</p>
          <span className="grid size-10 place-items-center rounded-full border border-line text-cream transition duration-500 group-hover:rotate-45 group-hover:border-crimson group-hover:bg-crimson">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function MoreProjects({ onOpen }) {
  const [hover, setHover] = useState(null);
  const listRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });

  const move = (e) => {
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const rest = projects.slice(FEATURED);

  return (
    <div className="mt-20">
      <Reveal className="mb-6 flex items-end justify-between gap-4">
        <h3 className="text-sm font-semibold tracking-[0.25em] uppercase">More Projects</h3>
        <span className="eyebrow">{rest.length} more</span>
      </Reveal>

      <div ref={listRef} onPointerMove={move} onPointerLeave={() => setHover(null)} className="relative border-t border-line">
        {rest.map((p, i) => {
          const n = i + FEATURED;
          return (
            <Reveal key={p.title} y={20} delay={Math.min(i, 6) * 0.04}>
              <button
                onClick={() => onOpen(n)}
                onPointerEnter={() => setHover(n)}
                data-cursor="Open"
                className="group relative isolate grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 overflow-hidden border-b border-line py-5 text-left sm:grid-cols-[3.5rem_1.4fr_1fr_auto] sm:py-7"
              >
                <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-crimson-deep/40 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
                <span className="font-display text-xl text-crimson">{String(n + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl uppercase text-cream transition-transform duration-500 group-hover:translate-x-3 sm:text-4xl">{p.title}</span>
                <span className="hidden text-[11px] tracking-[0.12em] uppercase text-muted sm:block">{p.techStack.join(' · ')}</span>
                <ArrowRight size={20} className="text-cream/60 transition duration-500 group-hover:-rotate-45 group-hover:text-crimson" />
              </button>
            </Reveal>
          );
        })}

        {/* floating preview that follows the pointer */}
        <AnimatePresence>
          {hover !== null && (
            <motion.div
              className="pointer-events-none absolute top-0 left-0 z-20 hidden w-72 overflow-hidden border border-line lg:block"
              style={{ x: sx, y: sy, translateX: '-50%', translateY: '-110%' }}
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, ease }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={hover}
                  src={projects[hover].image}
                  alt=""
                  className="aspect-[16/10] w-full object-cover object-top"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.45, ease }}
                />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

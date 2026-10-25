import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { experience } from '../data/content';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';

const isCurrent = (e) => /present/i.test(e.period);
const startYear = (e) => e.period.match(/\d{4}/)?.[0];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          index="04"
          title="Experience"
          aside={
            <>
              <span className="md:hidden">Newest first</span>
              <span className="hidden md:inline">Scroll to travel through time</span>
            </>
          }
        />
        <MobileTimeline />
      </div>
      <DesktopTimeline />
    </section>
  );
}

/* ---------- mobile: vertical rail on the left, newest first ---------- */
function MobileTimeline() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });

  return (
    <ol ref={listRef} className="relative md:hidden">
      <span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-px bg-line" />
      <motion.span
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-crimson"
      />

      {experience.map((e, i) => {
        const current = isCurrent(e);
        return (
          <li key={e.company + e.role} className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 pb-12 last:pb-0">
            <span className="relative col-start-1 row-span-2 row-start-1 mt-1.5 flex justify-center">
              <Node current={current} />
            </span>

            <Reveal y={20} delay={0.05} className="col-start-2 row-start-1 mb-4 flex flex-wrap items-center gap-3 self-start">
              <span className="font-display text-2xl leading-none uppercase text-cream sm:text-3xl">{e.period}</span>
              {current && <span className="chip border-crimson/60 text-crimson">Now</span>}
            </Reveal>

            <Reveal y={30} className="col-start-2 row-start-2">
              <article className="group panel relative isolate overflow-hidden p-6 transition-colors duration-500 hover:border-crimson/50 sm:p-7">
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-crimson-deep/40 to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-3xl leading-none text-crimson">{String(i + 1).padStart(2, '0')}</span>
                  <span className="chip">{e.type}</span>
                </div>
                <h3 className="mt-5 font-display text-3xl leading-none uppercase text-cream">{e.role}</h3>
                <p className="mt-2 text-sm text-rose">{e.company}</p>
                <p className="mt-4 text-sm leading-relaxed text-cream/65">{e.description}</p>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- desktop: pinned, horizontally scrolling journey, oldest → now ---------- */
function DesktopTimeline() {
  const items = [...experience].reverse();
  const first = startYear(items[0]);

  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  // how far the track has to slide so the last card ends up in view
  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div ref={wrapRef} className="relative hidden md:block" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* giant ghost word behind the track */}
        <span
          aria-hidden
          className="text-outline pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[26vw] leading-none whitespace-nowrap uppercase opacity-20 select-none"
        >
          Journey
        </span>

        <motion.ol
          ref={trackRef}
          style={{ x, paddingLeft: 'calc(max(0px, (100vw - 80rem) / 2) + 2.5rem)' }}
          className="relative flex w-max items-stretch gap-8 pr-[12vw]"
        >
          {/* rail through every node; the crimson fill's tip travels across the screen */}
          <span aria-hidden className="absolute top-[11px] right-0 left-0 h-px bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute top-[10px] right-0 left-0 h-[3px] origin-left bg-gradient-to-r from-crimson-deep via-crimson to-crimson shadow-[0_0_12px_rgb(208_33_58/0.6)]"
          />

          <li className="relative flex w-[min(26rem,34vw)] shrink-0 flex-col">
            <span className="relative z-10 grid size-[23px] place-items-center rounded-full border border-line bg-ink">
              <span className="size-2 rounded-full bg-cream/40" />
            </span>
            <div className="mt-10 flex flex-1 flex-col justify-end pb-2">
              <p className="eyebrow">Career Timeline</p>
              <h3 className="mt-4 font-display text-[clamp(4rem,8vw,7.5rem)] leading-[0.85] uppercase text-cream">
                {first}
                <span className="block text-crimson">→ Now</span>
              </h3>
              <p className="mt-6 flex items-center gap-3 text-sm text-cream/60">
                {items.length} roles
                <span className="h-px w-10 bg-line" />
                <span className="inline-flex items-center gap-2 text-cream/80">
                  Keep scrolling <ArrowRight size={14} className="text-crimson" />
                </span>
              </p>
            </div>
          </li>

          {items.map((e, i) => (
            <Stop key={e.company + e.role} e={e} i={i} progress={scrollYProgress} />
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

function Stop({ e, i, progress }) {
  const current = isCurrent(e);
  // the outlined year drifts against the scroll for a bit of depth
  const yearX = useTransform(progress, [0, 1], [120, -120]);

  return (
    <li className="relative flex w-[min(34rem,44vw)] shrink-0 flex-col">
      <div className="flex items-center gap-1">
        <Node current={current} />
        {/* ink backing so the rail stops at the label */}
        <span className="relative z-10 bg-ink px-3 font-display text-2xl leading-none uppercase text-cream">{e.period}</span>
        {current && <span className="chip relative z-10 border-crimson/60 bg-ink text-crimson">Now</span>}
      </div>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`group panel relative isolate mt-8 flex h-[min(30rem,58vh)] flex-col overflow-hidden p-8 transition-colors duration-500 lg:p-10 ${
          current ? 'border-crimson/50 bg-gradient-to-br from-crimson-deep/35 via-surface/60 to-surface/60' : 'hover:border-crimson/50'
        } ${i % 2 ? 'translate-y-6' : ''}`}
      >
        <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-t from-crimson-deep/45 to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
        <motion.span
          aria-hidden
          style={{ x: yearX }}
          className="text-outline pointer-events-none absolute -top-6 -right-6 -z-10 font-display text-[11rem] leading-none opacity-50 transition-opacity duration-500 select-none group-hover:opacity-100"
        >
          {startYear(e)}
        </motion.span>

        <div className="flex items-center gap-4">
          <span className="font-display text-5xl leading-none text-crimson">{String(i + 1).padStart(2, '0')}</span>
          <span className="chip bg-ink/60">{e.type}</span>
        </div>

        <div className="mt-auto">
          <h3 className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-[0.9] uppercase text-cream transition-transform duration-500 group-hover:-translate-y-1">
            {e.role}
          </h3>
          <p className="mt-3 text-sm tracking-wide text-rose">{e.company}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/65">{e.description}</p>
        </div>
      </motion.article>
    </li>
  );
}

function Node({ current }) {
  return (
    <span
      className={`relative z-10 grid size-[23px] shrink-0 place-items-center rounded-full border bg-ink ${
        current ? 'border-crimson' : 'border-line'
      }`}
    >
      <span className={`size-2 rounded-full ${current ? 'bg-crimson' : 'bg-cream/40'}`} />
      {current && <span className="absolute inset-0 animate-ping rounded-full border border-crimson/60" />}
    </span>
  );
}

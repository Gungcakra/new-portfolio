import { Download, GraduationCap } from 'lucide-react';
import { education, profile, stack } from '../data/content';
import cv from '../assets/CV.pdf';
import SectionHead from './ui/SectionHead';
import Reveal, { SplitReveal } from './ui/Reveal';
import Marquee from './ui/Marquee';
import Sparkle from './ui/Sparkle';

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="02" title="About Me" />

        <div className="grid gap-px border border-line bg-line lg:grid-cols-12">
          {/* Statement */}
          <div className="bg-ink p-6 sm:p-10 lg:col-span-7">
            <p className="font-serif text-3xl leading-tight text-sand sm:text-5xl">
              <SplitReveal text="Web Developer and" />{' '}
              <em className="text-rose"><SplitReveal text="Information Systems" delay={0.2} /></em>{' '}
              <SplitReveal text="student at ITB Stikom Bali." delay={0.35} />
            </p>
            <div className="mt-10 grid gap-6 text-sm leading-relaxed text-cream/70 sm:grid-cols-2">
              {profile.about.map((p, i) => (
                <Reveal key={i} delay={0.1 * i}><p>{p}</p></Reveal>
              ))}
            </div>
            <Reveal className="mt-10 flex flex-wrap items-center gap-6">
              <a href={cv} download="Cakra_Jaya_CV.pdf" className="group inline-flex items-center gap-3 rounded-full border border-cream/30 px-6 py-3 text-[11px] font-bold tracking-[0.22em] uppercase transition hover:border-crimson hover:bg-crimson">
                Download CV <Download size={15} className="transition group-hover:translate-y-0.5" />
              </a>
              <span className="font-script text-5xl text-crimson">Cakra</span>
            </Reveal>
          </div>

          {/* Education */}
          <div className="bg-ink p-6 sm:p-10 lg:col-span-5">
            <p className="mb-6 flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-crimson">
              <GraduationCap size={16} /> Education
            </p>
            <ul className="space-y-6">
              {education.map((e, i) => (
                <Reveal as="li" key={e.title} delay={i * 0.1} className="flex items-start justify-between gap-4 border-b border-line pb-6 last:border-0">
                  <div>
                    <p className="font-semibold text-cream">{e.title}</p>
                    <p className="mt-1 text-sm text-muted">{e.place}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <p className="mt-10 mb-5 text-xs font-bold tracking-[0.25em] uppercase text-crimson">Tech Stack</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {stack.map((t, i) => (
                <Reveal key={t.name} y={16} delay={i * 0.03}>
                  <div className="group flex items-center gap-3 border border-line bg-surface/60 px-3 py-2.5 transition hover:border-crimson/60 hover:bg-crimson-deep/30">
                    <img src={t.src} alt="" width="22" height="22" loading="lazy" className="size-[22px] rounded-[5px] grayscale-[35%] transition group-hover:grayscale-0" />
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-cream/80">{t.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stack marquee */}
      <div className="mt-20 overflow-hidden py-6">
      <div className="-mx-[5%] -rotate-2 border-y border-line bg-crimson py-4 text-cream">
        <Marquee speed={40}>
          {stack.map((t) => (
            <span key={t.name} className="flex items-center gap-6 px-6 font-display text-3xl uppercase sm:text-5xl">
              {t.name} <Sparkle size={20} />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="-mx-[5%] rotate-1 border-y border-line bg-surface py-3">
        <Marquee speed={55} reverse>
          {[...stack].reverse().map((t) => (
            <span key={t.name} className="text-outline px-6 font-display text-3xl uppercase sm:text-5xl">{t.name} ✦</span>
          ))}
        </Marquee>
      </div>
      </div>
    </section>
  );
}

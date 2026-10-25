import { experience } from '../data/content';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="04" title="Experience" />

        <ol className="border-t border-line">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.company + e.role} delay={i * 0.05}>
              <div className="group relative isolate grid gap-3 border-b border-line py-8 sm:grid-cols-[4rem_1.2fr_1.5fr_auto] sm:items-center sm:gap-8">
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-crimson-deep/50 to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
                <span className="font-display text-4xl text-crimson">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-3xl leading-none uppercase text-cream transition-transform duration-500 group-hover:translate-x-2">{e.role}</h3>
                  <p className="mt-2 text-sm text-rose">{e.company}</p>
                </div>
                <p className="text-sm leading-relaxed text-cream/65">{e.description}</p>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className="text-xs tracking-[0.15em] uppercase text-cream/80">{e.period}</span>
                  <span className="chip">{e.type}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

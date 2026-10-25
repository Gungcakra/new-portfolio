import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { personalProjects as projects } from '../data/content';
import SectionHead from './ui/SectionHead';
import { ease } from './ui/Reveal';
import ProjectModal from './ProjectModal';
import NoShot from './ui/NoShot';

export default function Personal() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="personal" className="relative border-y border-line bg-surface/40 py-20 sm:py-28">
      <div className="container-x">
        <SectionHead index="02" title="Personal Projects" />

        <div className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <motion.button
              key={p.title}
              onClick={() => setActive(i)}
              data-cursor="View"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="group flex flex-col bg-ink p-5 text-left sm:p-6"
            >
              {/* screenshot in a minimal browser frame */}
              <div className="overflow-hidden border border-line bg-surface">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="size-1.5 rounded-full bg-crimson" />
                  <span className="size-1.5 rounded-full bg-cream/25" />
                  <span className="size-1.5 rounded-full bg-cream/25" />
                </div>
                <div className="aspect-[16/10] overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      loading="lazy"
                      className="size-full object-cover object-top grayscale-[40%] transition duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <NoShot title={p.title} />
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <span className="font-display text-3xl text-crimson">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="flex-1 font-display text-2xl leading-none uppercase text-cream sm:text-3xl">{p.title}</h3>
                <ArrowRight size={20} className="text-cream/60 transition duration-500 group-hover:-rotate-45 group-hover:text-crimson" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.techStack.map((t) => <span key={t} className="chip group-hover:border-crimson/50">{t}</span>)}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal project={active !== null ? projects[active] : null} index={active ?? 0} onClose={close} />
    </section>
  );
}

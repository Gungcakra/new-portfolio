import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { lenis } from '../lib/lenis';
import { ease } from './ui/Reveal';

export default function ProjectModal({ project, index, onClose }) {
  useEffect(() => {
    if (!project) return;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden border border-line bg-surface"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-line bg-ink/70 text-cream transition hover:rotate-90 hover:bg-crimson" aria-label="Close">
              <X size={18} />
            </button>

            <div className="overflow-y-auto">
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="size-full object-cover object-top"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>

              <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1fr_220px]">
                <div>
                  <p className="font-display text-xl text-crimson">{String(index + 1).padStart(2, '0')}</p>
                  <h3 id="project-title" className="mt-1 font-display text-4xl leading-none uppercase text-cream sm:text-5xl">{project.title}</h3>
                  <p className="mt-2 eyebrow">{project.kind}</p>
                  <p className="mt-6 leading-relaxed text-cream/75">{project.description}</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="eyebrow mb-3">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((t) => <span key={t} className="chip">{t}</span>)}
                    </div>
                  </div>
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-crimson px-5 py-4 text-xs font-bold tracking-[0.2em] uppercase text-cream transition hover:bg-[#b51a30]">
                      Visit Live Site
                      <ArrowUpRight size={18} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <p className="border border-dashed border-line px-5 py-4 text-[11px] tracking-[0.18em] uppercase text-muted">Private / client project</p>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

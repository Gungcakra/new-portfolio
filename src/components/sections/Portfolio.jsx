import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import portfolioData from '../../data/portfolio.json';
import Badge from '../ui/Badge';
import SectionTitle from '../ui/SectionTitle';

// Eagerly import every .webp under src/assets/projects/
const projectImageModules = import.meta.glob(
  '../../assets/projects/*.webp',
  { eager: true }
);

// Resolve a JSON path like "/assets/projects/foo.webp" → Vite-hashed URL
function resolveImage(jsonPath) {
  if (!jsonPath) return null;
  const filename = jsonPath.split('/').pop();
  const key = `../../assets/projects/${filename}`;
  return projectImageModules[key]?.default ?? null;
}

const GRADIENTS = [
  'from-primary-500 to-primary-700',
  'from-sky-400 to-blue-600',
  'from-indigo-500 to-violet-600',
  'from-cyan-500 to-blue-600',
];

export default function Portfolio() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-800/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle>Portfolio</SectionTitle>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.slice().reverse().map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-left w-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group"
    >
      <CardThumbnail project={project} />

      <div className="p-5">
        <h3 className="font-display font-semibold text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map(tech => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.techStack.length > 3 && (
            <Badge variant="muted">+{project.techStack.length - 3}</Badge>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function CardThumbnail({ project }) {
  const src = resolveImage(project.thumbnail) ?? resolveImage(project.images?.[0]);

  if (src) {
    return (
      <div className="h-48 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-900">
        <img
          src={src}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {project.featured && <FeaturedBadge />}
      </div>
    );
  }

  return (
    <div
      className={`h-48 w-full relative flex items-center justify-center bg-gradient-to-br ${
        GRADIENTS[project.id % GRADIENTS.length]
      }`}
    >
      <span className="font-display font-extrabold text-4xl text-white/70 select-none">
        {project.title[0]}
      </span>
      {project.featured && <FeaturedBadge />}
    </div>
  );
}

function FeaturedBadge() {
  return (
    <span className="absolute top-3 right-3 text-xs px-2.5 py-0.5 rounded-full bg-primary-600 text-white font-medium shadow">
      Featured
    </span>
  );
}

function ProjectModal({ project, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = (project.images ?? []).map(resolveImage).filter(Boolean);
  const hasImages = images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Image area */}
        <div className="relative h-72 w-full flex-shrink-0 bg-slate-900 group overflow-hidden rounded-t-2xl">
          {hasImages ? (
            <>
              <img
                src={images[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <CarouselBtn
                    side="left"
                    onClick={() =>
                      setImgIndex(i => (i - 1 + images.length) % images.length)
                    }
                  />
                  <CarouselBtn
                    side="right"
                    onClick={() => setImgIndex(i => (i + 1) % images.length)}
                  />
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          i === imgIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${
                GRADIENTS[project.id % GRADIENTS.length]
              }`}
            >
              <span className="font-display font-extrabold text-6xl text-white/70 select-none">
                {project.title[0]}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.map(tech => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <FaGithub size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CarouselBtn({ side, onClick }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-2' : 'right-2'} p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors`}
    >
      <Icon size={18} />
    </button>
  );
}

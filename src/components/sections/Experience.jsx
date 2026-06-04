import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import experienceData from '../../data/experience.json';
import SectionTitle from '../ui/SectionTitle';

const TYPE_STYLES = {
  'Full-time': 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
  'Intern': 'bg-sky-50 text-sky-600 border border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800',
  'Part-time': 'bg-yellow-50 text-yellow-600 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
};

export default function Experience() {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true, margin: '-10% 0px' });

  return (
    <section id="experience" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionTitle>Experience</SectionTitle>

        <div className="mt-14 relative" ref={lineRef}>
          {/* animated vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800" />
          <motion.div
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary-500 via-primary-400 to-transparent origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="flex flex-col gap-6">
            {experienceData.slice().reverse().map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} isLatest={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index, isLatest }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-14"
    >
      {/* timeline dot — pulse ring only on the active/latest entry */}
      <div className="absolute left-5 top-6 -translate-x-1/2">
        {isLatest && (
          <span className="absolute inset-0 rounded-full bg-primary-400/30 animate-ping" />
        )}
        <div className="relative w-4 h-4 rounded-full bg-primary-500 border-2 border-white dark:border-slate-900 shadow-md shadow-primary-500/30" />
      </div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group relative bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-lg hover:shadow-primary-500/5 hover:border-primary-200/60 dark:hover:border-primary-700/40 transition-all duration-300 overflow-hidden"
      >
        {/* left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

        <div className="p-5">
          {/* header row */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              {/* company icon */}
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/40 dark:to-primary-800/20 flex items-center justify-center border border-primary-100 dark:border-primary-800/50">
                {exp.logo ? (
                  <img src={exp.logo} alt={exp.company} className="w-7 h-7 object-contain" />
                ) : (
                  <Briefcase size={18} className="text-primary-600 dark:text-primary-400" />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-display font-semibold text-slate-900 dark:text-white leading-tight text-[0.95rem]">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Building2 size={12} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  <span className="text-primary-600 dark:text-primary-400 text-sm font-medium truncate">
                    {exp.company}
                  </span>
                </div>
              </div>
            </div>

            {/* right meta */}
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              {exp.type && (
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold tracking-wide ${TYPE_STYLES[exp.type] ?? TYPE_STYLES['Intern']}`}>
                  {exp.type}
                </span>
              )}
              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                <Calendar size={11} />
                <span className="text-[11px] font-medium">{exp.period}</span>
              </div>
            </div>
          </div>

          {/* description */}
          <p className="mt-3.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-14">
            {exp.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

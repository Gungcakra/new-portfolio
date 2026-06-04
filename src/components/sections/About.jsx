import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-800/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle>About Me</SectionTitle>

        <div className="mt-14 grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Hi! I'm{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">
                Cakra Jaya
              </strong>
              , a Web Developer and Information Systems student at ITB Stikom
              Bali. I focus on creating functional web applications and
              intuitive digital experiences, combining my technical studies with
              a passion for building efficient solutions in the ever-evolving
              tech landscape.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              I love learning new technologies and strive to write clean,
              efficient, and maintainable code. I'm committed to developing
              solutions that make a real impact for users while continuously
              exploring the latest advancements in web development.
            </p>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-5">
              Tech Stack
            </h3>
            <div className="flex flex-wrap items-center justify-start gap-4">
              {[
                { src: 'https://skillicons.dev/icons?i=php', alt: 'php logo' },
                { src: 'https://skillicons.dev/icons?i=laravel', alt: 'laravel logo' },
                { src: 'https://icon.icepanel.io/Technology/svg/Alpine.js.svg', alt: 'alpinejs logo' },
                { src: 'https://icon.icepanel.io/Technology/svg/Livewire.svg', alt: 'livewire logo' },
                { src: 'https://skillicons.dev/icons?i=mysql', alt: 'mysql logo' },
                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', alt: 'bootstrap logo' },
                { src: 'https://skillicons.dev/icons?i=tailwind', alt: 'tailwindcss logo' },
                { src: 'https://skillicons.dev/icons?i=js', alt: 'javascript logo' },
                { src: 'https://skillicons.dev/icons?i=astro', alt: 'astro logo' },
                { src: 'https://skillicons.dev/icons?i=react', alt: 'react logo' },
                { src: 'https://cdn.brandfetch.io/idzGRYC3u5/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B', alt: 'expo logo' },
                { src: 'https://skillicons.dev/icons?i=express', alt: 'express logo' },
                { src: 'https://skillicons.dev/icons?i=nodejs', alt: 'nodejs logo' },
                { src: 'https://skillicons.dev/icons?i=vite', alt: 'vite logo' },
                { src: 'https://skillicons.dev/icons?i=java', alt: 'java logo' },
                { src: 'https://skillicons.dev/icons?i=androidstudio', alt: 'androidstudio logo' },
                { src: 'https://skillicons.dev/icons?i=vercel', alt: 'vercel logo' },
                { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: 'figma logo' },
                { src: 'https://skillicons.dev/icons?i=postman', alt: 'postman logo' },
              ].map((tech, idx) => (
                <img key={idx} src={tech.src} height="40" width="40" alt={tech.alt} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

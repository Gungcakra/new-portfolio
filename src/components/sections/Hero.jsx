import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import heroImg from '../../assets/profile.webp';
import Button from '../ui/Button';
import CV from '../../assets/CV.pdf';
import SectionTitle from '../ui/SectionTitle';
const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/gungcakra', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/cakra-jaya-323722338', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com/caakrraaa', label: 'Instagram' },
  { icon: MdEmail, href: 'mailto:agungcakra888@gmail.com', label: 'Email' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center gap-7"
        >
          <motion.div variants={item}>
            <div className="w-36 h-36 rounded-full ring-4 ring-primary-500 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 overflow-hidden mx-auto">
              <img
                src={heroImg}
                alt="Cakra Jaya"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <SectionTitle>Cakra Jaya</SectionTitle>
            <p className="mt-2 text-lg sm:text-xl text-primary-600 dark:text-primary-400 font-semibold tracking-wide">
              Developer &amp; Student
            </p>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-md text-slate-500 dark:text-slate-400 leading-relaxed"
          >
            Passionate about building clean, user-focused web applications.
            Currently developing full-stack solutions while pursuing my degree.
          </motion.p>

          <motion.div variants={item} className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3 flex-wrap justify-center">
            <Button href={CV} download="Cakra_Jaya_CV.pdf">
              Download CV
            </Button>
            <Button href="#portfolio" variant="outline">
              See Portfolio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

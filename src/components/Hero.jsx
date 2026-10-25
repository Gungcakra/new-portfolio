import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail } from 'lucide-react';
import { profile, stats } from '../data/content';
import portrait from '../assets/foto new-feathered.webp';
import Counter from './ui/Counter';
import RotatingBadge from './ui/RotatingBadge';
import { ease } from './ui/Reveal';

const WORD = 'PORTFOLIO'.split('');

export default function Hero({ ready }) {
  const { scrollYProgress } = useScroll();
  const lettersY = useTransform(scrollYProgress, [0, 0.25], ['0%', '35%']);
  const photoY = useTransform(scrollYProgress, [0, 0.25], ['0%', '-8%']);
  const photoScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);
  const state = ready ? 'show' : 'hidden';

  return (
    <section id="top" className="grain relative overflow-hidden pt-20 sm:pt-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_30%,rgb(110_15_28/0.55),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x relative">
        {/* Giant word */}
        <motion.div style={{ y: lettersY }} className="relative z-0 flex justify-between font-display leading-[0.82] select-none" aria-hidden>
          {WORD.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden" aria-hidden>
              <motion.span
                className="inline-block bg-gradient-to-b from-crimson via-[#a3182c] to-crimson-deep bg-clip-text text-[clamp(4.6rem,20.5vw,17.5rem)] text-transparent"
                initial={{ y: '105%' }}
                animate={ready ? { y: 0 } : { y: '105%' }}
                transition={{ duration: 1.1, ease, delay: 0.1 + i * 0.05 }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.div>

        {/* Portrait */}
        <motion.div
          style={{ y: photoY, scale: photoScale }}
          className="pointer-events-none relative z-10 mx-auto -mt-[24vw] w-[72vw] max-w-[460px] sm:-mt-[20vw] lg:-mt-[18.5rem]"
        >
          {/* crimson rim light behind the cut-out (outside the mask so it isn't clipped) */}
          <motion.div
            className="absolute inset-x-[5%] top-[15%] bottom-[25%] rounded-full bg-crimson/30 blur-[100px]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.4, ease, delay: 0.5 }}
            className="relative [mask-image:linear-gradient(to_bottom,#000_70%,transparent_98%)]"
          >
            <img
              src={portrait}
              alt="Portrait of Cakra Jaya"
              width="941"
              height="1672"
              fetchPriority="high"
              className="h-auto w-full contrast-[1.15] brightness-[0.85] grayscale drop-shadow-[0_30px_60px_rgb(0_0_0/0.6)]"
            />
            {/* crimson duotone, masked to the cut-out's own alpha so the transparent area stays clear */}
            <div
              className="absolute inset-0 bg-crimson-deep opacity-70 mix-blend-multiply"
              style={{ maskImage: `url("${portrait}")`, WebkitMaskImage: `url("${portrait}")`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
            />
          </motion.div>
        </motion.div>

        {/* Overlay content */}
        <div className="relative z-20 -mt-[38vw] grid gap-10 pb-16 sm:-mt-[30vw] lg:-mt-[22rem] lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:pb-20">
          <motion.div initial="hidden" animate={state} variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }} className="max-w-md">
            <motion.p variants={fade} className="font-script text-5xl text-rose sm:text-6xl">Hello, I'm</motion.p>
            <motion.h1 variants={fade} className="-mt-2 font-display text-[clamp(3.6rem,9vw,6.5rem)] leading-[0.9] uppercase text-cream">
              {profile.firstName}
              <br />
              {profile.lastName}
            </motion.h1>
            <motion.p variants={fade} className="mt-4 text-lg font-bold tracking-wide uppercase text-crimson">
              {profile.role}
            </motion.p>
            <motion.p variants={fade} className="mt-4 text-sm leading-relaxed text-cream/70">{profile.intro}</motion.p>
          </motion.div>

          <div className="hidden lg:block lg:w-[300px]" />

          <motion.div initial="hidden" animate={state} variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.1 } } }} className="flex flex-col gap-8 lg:items-end">
            <motion.ul variants={fade} className="flex items-center gap-3">
              {profile.socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full border border-line text-cream/80 transition hover:border-crimson hover:bg-crimson hover:text-cream">
                    <Icon size={16} />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-full border border-line text-cream/80 transition hover:border-crimson hover:bg-crimson hover:text-cream">
                  <Mail size={16} />
                </a>
              </li>
            </motion.ul>

            <motion.ul variants={fade} className="grid grid-cols-2 gap-4 lg:w-[260px] lg:grid-cols-1 lg:gap-0">
              {stats.map((s, i) => (
                <li key={s.label} className="flex flex-col gap-1 border-line py-3 lg:flex-row lg:items-center lg:gap-4 lg:border-b lg:last:border-0">
                  <span className="font-display text-4xl lg:w-20 text-crimson sm:text-5xl">
                    <Counter to={s.value} delay={1.3 + i * 0.15} />
                  </span>
                  <span className="whitespace-pre-line text-[10px] leading-relaxed tracking-[0.2em] uppercase text-muted">{s.label}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fade} className="hidden text-cream lg:block">
              <RotatingBadge />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

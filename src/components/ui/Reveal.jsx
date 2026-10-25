import { motion } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1];

export default function Reveal({ children, delay = 0, y = 36, className = '', as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

// Text that slides up from behind a mask, word by word.
// The observer sits on the visible wrapper — the clipped words themselves never intersect.
export function SplitReveal({ text, className = '', delay = 0, stagger = 0.06 }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delayChildren: delay, staggerChildren: stagger }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

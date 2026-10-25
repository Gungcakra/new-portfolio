import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from './ui/Reveal';

const WORDS = ['Hello', 'Halo', 'Om Swastiastu', 'Bonjour', 'こんにちは', 'Hola'];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.ceil(Math.random() * 9));
      setCount(n);
      if (n >= 100) {
        clearInterval(id);
        setTimeout(onDone, 450);
      }
    }, 55);
    const w = setInterval(() => setWord((i) => (i + 1) % WORDS.length), 260);
    return () => {
      clearInterval(id);
      clearInterval(w);
    };
  }, [onDone]);

  return (
    <motion.div
      className="grain fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 sm:p-10"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1, ease }}
    >
      <div className="flex justify-between eyebrow">
        <span>Cakra Jaya</span>
        <span>Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center gap-3 self-center">
        <span className="size-2 rounded-full bg-crimson" />
        <span className="font-serif text-3xl italic text-sand sm:text-5xl">{WORDS[word]}</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="h-px flex-1 bg-line">
          <motion.div className="h-px bg-crimson" animate={{ width: `${count}%` }} transition={{ ease: 'linear' }} />
        </div>
        <span className="font-display text-7xl leading-none text-cream tabular-nums sm:text-9xl">
          {String(count).padStart(3, '0')}
        </span>
      </div>
    </motion.div>
  );
}

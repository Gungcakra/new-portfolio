import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { initLenis, lenis } from './lib/lenis';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => initLenis(), []);
  useEffect(() => {
    if (loading) lenis?.stop();
    else lenis?.start();
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Cursor />
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-crimson" style={{ scaleX: progress }} />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <Work />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

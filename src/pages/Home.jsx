import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Portfolio from '../components/sections/Portfolio';
import Contact from '../components/sections/Contact';
import personalData from '../data/personal.json';

export default function Home({ dark, toggleDark }) {
  return (
    <div className="min-h-screen">
      <Navbar dark={dark} toggleDark={toggleDark} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Portfolio />
        <Portfolio
          id="personal"
          title="Personal Projects"
          data={personalData}
          className="bg-white dark:bg-slate-900"
        />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
}

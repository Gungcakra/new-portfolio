import { ArrowUp } from 'lucide-react';
import { profile } from '../data/content';
import { scrollToId } from '../lib/lenis';
import Marquee from './ui/Marquee';
import Sparkle from './ui/Sparkle';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink pt-14">
      <Marquee speed={45}>
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="flex items-center gap-10 px-10 font-display text-[clamp(4rem,14vw,12rem)] leading-none uppercase">
            <span className="text-outline">Cakra Jaya</span>
            <Sparkle size={48} className="text-crimson" />
            <span className="text-cream">Web Developer</span>
            <Sparkle size={48} className="text-crimson" />
          </span>
        ))}
      </Marquee>

      <div className="container-x mt-14 flex flex-col gap-6 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">© {new Date().getFullYear()} {profile.firstName} {profile.lastName}. All rights reserved.</p>
        <p className="eyebrow flex items-center gap-2">Thank you for visiting <Sparkle size={10} className="text-crimson" /></p>
        <div className="flex items-center gap-3">
          {profile.socials.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-9 place-items-center rounded-full border border-line text-cream/70 transition hover:border-crimson hover:bg-crimson hover:text-cream">
              <Icon size={14} />
            </a>
          ))}
          <button onClick={() => scrollToId('top')} aria-label="Back to top" className="ml-2 grid size-9 place-items-center rounded-full bg-cream text-ink transition hover:-translate-y-1 hover:bg-crimson hover:text-cream">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

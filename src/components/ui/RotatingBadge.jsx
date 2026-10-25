import { useId } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function RotatingBadge({ text = "LET'S WORK TOGETHER • LET'S WORK TOGETHER • ", href = '#contact', className = '' }) {
  const id = useId();
  return (
    <a href={href} className={`group relative grid size-32 place-items-center ${className}`} aria-label="Let's work together" data-cursor="Hire">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[7.4px] font-semibold tracking-[0.12em]">
          <textPath href={`#${id}`} textLength="236" lengthAdjust="spacingAndGlyphs">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full border border-current transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
        <ArrowUpRight size={20} />
      </span>
    </a>
  );
}

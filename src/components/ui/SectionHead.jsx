import { ArrowDownRight } from 'lucide-react';
import Reveal from './Reveal';

export default function SectionHead({ index, title, aside }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="flex items-center gap-3 text-sm font-semibold tracking-[0.25em] uppercase text-cream sm:text-base">
        {index && <span className="font-display text-crimson tracking-normal">{index}</span>}
        {title}
        <ArrowDownRight size={16} className="text-crimson" />
      </h2>
      {aside && <p className="eyebrow max-w-xs sm:text-right">{aside}</p>}
    </Reveal>
  );
}

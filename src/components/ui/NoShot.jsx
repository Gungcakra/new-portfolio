// Stand-in for projects that have no screenshot yet.
export default function NoShot({ title }) {
  return (
    <div className="grain relative grid size-full place-items-center overflow-hidden bg-gradient-to-br from-crimson-deep via-surface to-ink">
      <span className="text-outline font-display text-[clamp(3rem,8vw,6rem)] uppercase transition-transform duration-[1.2s] group-hover:scale-105">{title}</span>
    </div>
  );
}

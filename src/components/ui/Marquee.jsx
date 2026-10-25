export default function Marquee({ children, speed = 30, reverse = false, className = '' }) {
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 animate-marquee items-center"
        style={{ '--marquee-speed': `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

export default function Button({ children, variant = 'primary', href, download, onClick, className = '' }) {
  const base = 'inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-colors';
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    outline: 'border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} download={download} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export default function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    muted: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
  };

  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${styles[variant]}`}>
      {children}
    </span>
  );
}

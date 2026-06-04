export default function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
        {children}
      </h2>
      <div className="mt-3 mx-auto w-12 h-1 rounded-full bg-primary-500" />
    </div>
  );
}

# Cakra Jaya — Portfolio v2

Editorial dark/crimson portfolio built with React 19 + Vite, Tailwind CSS v4, Framer Motion and Lenis.

```bash
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

- **Content**: everything lives in `src/data/content.js` (profile, stats, stack, experience, process, projects). Project screenshots are in `src/assets/projects/` and picked up by filename.
- **Contact form**: EmailJS, configured via `.env.local` (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
- **Design tokens**: colors and fonts are in the `@theme` block of `src/index.css` (Anton, Cormorant Garamond, Mrs Saint Delafield, Manrope).
- **Custom cursor**: add `data-cursor="Label"` to any element to show a labelled cursor bubble on hover.

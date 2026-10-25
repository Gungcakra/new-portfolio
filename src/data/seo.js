// Copy for search results and link previews. Facts only — everything here comes from content.js.

// Set VITE_SITE_URL in .env (e.g. https://yourdomain.com) once the site has a domain.
// Without it, canonical/og:url and the sitemap are skipped rather than pointing somewhere wrong.
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');

export const seo = {
  title: 'Cakra Jaya — Web Developer & Student',
  // ~150 chars so Google shows it in full
  description:
    'Cakra Jaya is a web developer and Information Systems student at ITB Stikom Bali, building web apps with Laravel, Livewire, React and Astro.',
  // Link previews have more room, so this one tells a bit more of the story
  shareDescription:
    "I'm a web developer and Information Systems student at ITB Stikom Bali. Take a look at what I've built, from healthcare platforms and booking systems to queue systems for recruitment.",
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Cakra Jaya portfolio: Developer & Student',
  locale: 'en_US',
  themeColor: '#0a0707',
};

export const absolute = (path) => (siteUrl ? `${siteUrl}${path}` : path);

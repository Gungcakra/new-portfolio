import { seo, siteUrl, absolute } from '../data/seo';
import { profile, experience, education, stack } from '../data/content';

// Rendered to static HTML at build time (see seoPrerender in vite.config.js),
// so crawlers and link-preview bots that don't run JavaScript still see every tag.
export default function Seo() {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const current = experience.find((e) => e.period.includes('Present'));

  const person = {
    '@type': 'Person',
    '@id': siteUrl ? `${siteUrl}/#person` : '#person',
    name: fullName,
    jobTitle: 'Web Developer',
    description: profile.intro,
    email: `mailto:${profile.email}`,
    image: absolute(seo.ogImage),
    ...(siteUrl && { url: siteUrl }),
    ...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
    affiliation: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.place })),
    knowsAbout: stack.map((t) => t.name),
    sameAs: profile.socials.map((s) => s.href),
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        name: seo.title,
        description: seo.description,
        ...(siteUrl && { url: siteUrl }),
        mainEntity: { '@id': person['@id'] },
      },
      person,
      {
        '@type': 'WebSite',
        name: fullName,
        ...(siteUrl && { url: siteUrl }),
        inLanguage: 'en',
      },
    ],
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={fullName} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content={seo.themeColor} />
      {siteUrl && <link rel="canonical" href={`${siteUrl}/`} />}

      {/* Open Graph — WhatsApp, LinkedIn, Facebook, Discord */}
      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content={fullName} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.shareDescription} />
      {siteUrl && <meta property="og:url" content={`${siteUrl}/`} />}
      <meta property="og:image" content={absolute(seo.ogImage)} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.ogImageAlt} />
      <meta property="profile:first_name" content={profile.firstName} />
      <meta property="profile:last_name" content={profile.lastName} />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.shareDescription} />
      <meta name="twitter:image" content={absolute(seo.ogImage)} />
      <meta name="twitter:image:alt" content={seo.ogImageAlt} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

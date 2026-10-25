import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createServer, defineConfig, loadEnv } from 'vite'

// Renders <Seo /> to static markup and injects it into index.html's <head>,
// and emits robots.txt + sitemap.xml. Keeps SEO in one React component while
// still serving plain HTML to crawlers that don't execute JavaScript.
function seoPrerender() {
  let siteUrl = ''

  async function renderSeo(server) {
    const [{ default: Seo }, { renderToStaticMarkup }, { createElement }] = await Promise.all([
      server.ssrLoadModule('/src/components/Seo.jsx'),
      import('react-dom/server'),
      import('react'),
    ])
    return renderToStaticMarkup(createElement(Seo))
  }

  let devServer
  return {
    name: 'seo-prerender',
    configResolved(config) {
      siteUrl = (loadEnv(config.mode, config.root, 'VITE_').VITE_SITE_URL || '').replace(/\/$/, '')
    },
    configureServer(server) {
      devServer = server
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        const server = devServer ?? (await createServer({ configFile: false, plugins: [react()], server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' }))
        try {
          return html.replace('<!--seo-->', await renderSeo(server))
        } finally {
          if (!devServer) await server.close()
        }
      },
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? [`Sitemap: ${siteUrl}/sitemap.xml`] : [])].join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` })
      if (!siteUrl) {
        this.warn('VITE_SITE_URL is not set — skipping sitemap.xml, canonical and og:url.')
        return
      }
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPrerender()],
})

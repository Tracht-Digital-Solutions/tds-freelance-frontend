import { allRoutes, pathFor } from '../data/content';
export function GET() {
  const origin = 'https://freelance.tracht-digital.de';
  const pathOf = (r: ReturnType<typeof allRoutes>[number], lang: 'de' | 'en') =>
    `${origin}${pathFor(r.id, lang)}${'detail' in r && r.detail ? `${r.detail}/` : ''}`;
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${allRoutes()
      .map(
        (r) =>
          `<url><loc>${origin}${r.path}</loc>` +
          `<xhtml:link rel="alternate" hreflang="de" href="${pathOf(r, 'de')}"/>` +
          `<xhtml:link rel="alternate" hreflang="en" href="${pathOf(r, 'en')}"/>` +
          `<xhtml:link rel="alternate" hreflang="x-default" href="${pathOf(r, 'de')}"/>` +
          `</url>`,
      )
      .join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}

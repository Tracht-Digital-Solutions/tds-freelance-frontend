import { allRoutes } from '../data/content';
export function GET() {
  const origin = 'https://freelance.tracht-digital.de';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allRoutes()
      .map((r) => `<url><loc>${origin}${r.path}</loc></url>`)
      .join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}

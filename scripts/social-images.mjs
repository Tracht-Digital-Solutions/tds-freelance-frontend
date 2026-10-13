import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/images', { recursive: true });
for (const [lang, role, values] of [
  [
    'de',
    'Fullstack-Entwickler &amp; Projektmanagement',
    'QUALITÄT. TRANSPARENZ. FAIRNESS.',
  ],
  [
    'en',
    'Full-Stack Developer &amp; Project Management',
    'QUALITY. TRANSPARENCY. FAIRNESS.',
  ],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#fafaf7"/><rect x="930" width="270" height="630" fill="#050f68"/><circle cx="1120" cy="100" r="170" fill="none" stroke="#ff7a9c" stroke-width="2"/><text x="65" y="90" font-family="Arial" font-size="21" fill="#820933" letter-spacing="3">SOFTWARE / JULIAN TRACHT</text><text x="65" y="245" font-family="Arial" font-weight="bold" font-size="120" fill="#050f68">Julian</text><text x="115" y="365" font-family="Arial" font-weight="bold" font-size="120" fill="#050f68">Tracht<tspan fill="#820933">.</tspan></text><text x="65" y="440" font-family="Arial" font-size="29" fill="#1a1a17">${role}</text><line x1="65" y1="500" x2="860" y2="500" stroke="#e3e0d8"/><text x="65" y="550" font-family="Arial" font-size="19" fill="#6b6b66">${values}</text><text x="65" y="595" font-family="Arial" font-size="19" fill="#6b6b66">freelance.tracht-digital.de</text></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`public/images/og-${lang}.png`);
}

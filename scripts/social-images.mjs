// Renders public/images/og-{de,en}.png in Chromium so the cards use the
// site's own typefaces (Bricolage Grotesque, Instrument Sans, JetBrains Mono)
// and the same composition as the home hero. Run: node scripts/social-images.mjs
import { chromium } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';

const asData = async (path, type) =>
  `data:${type};base64,${(await readFile(path)).toString('base64')}`;
const fonts = 'node_modules/@fontsource-variable';
const display = await asData(
  `${fonts}/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2`,
  'font/woff2',
);
const body = await asData(
  `${fonts}/instrument-sans/files/instrument-sans-latin-wght-normal.woff2`,
  'font/woff2',
);
const mono = await asData(
  `${fonts}/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2`,
  'font/woff2',
);
const portrait = await asData('public/images/julian-840.webp', 'image/webp');

const cards = [
  {
    lang: 'de',
    role: 'Fullstack-Entwickler &amp; Projektmanagement',
    values: 'Qualität. Transparenz. Fairness.',
  },
  {
    lang: 'en',
    role: 'Full-Stack Developer &amp; Project Management',
    values: 'Quality. Transparency. Fairness.',
  },
];

const page = ({ lang, role, values }) => `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face { font-family: D; src: url(${display}) format('woff2'); font-weight: 200 800; }
@font-face { font-family: B; src: url(${body}) format('woff2'); font-weight: 400 700; }
@font-face { font-family: M; src: url(${mono}) format('woff2'); font-weight: 100 800; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { display: grid; grid-template-columns: 22px 1fr 430px; background: #fafaf7; color: #1a1a17; font-family: B, sans-serif; }
.spine { background: #050f68; }
.copy { padding: 62px 40px 52px 62px; display: flex; flex-direction: column; }
.eyebrow { align-self: flex-start; display: inline-flex; gap: 10px; padding: 7px 16px 7px 12px; border-radius: 999px; background: #f1efe9; color: #820933; font-family: M; font-size: 17px; letter-spacing: 0.08em; text-transform: uppercase; }
h1 { margin-top: 34px; font-family: D; font-weight: 800; font-size: 124px; line-height: 0.92; letter-spacing: -0.03em; color: #050f68; }
h1 span { display: inline-block; padding-left: 0.42em; }
h1 i { font-style: normal; color: #ff7a9c; }
.bar { display: flex; gap: 6px; margin: 30px 0 22px; }
.bar b { height: 5px; border-radius: 3px; }
h2 { font-family: D; font-weight: 600; font-size: 31px; letter-spacing: -0.015em; }
.foot { margin-top: auto; display: flex; flex-direction: column; gap: 8px; padding-top: 18px; border-top: 1px solid #e3e0d8; font-family: M; font-size: 17px; color: #6b6b66; letter-spacing: 0.04em; }
.foot span:first-child { color: #820933; text-transform: uppercase; letter-spacing: 0.1em; }
.stage { position: relative; overflow: hidden; background: #050f68; }
.type { position: absolute; left: 22px; top: 6px; font-family: D; font-weight: 800; font-size: 220px; line-height: 1; letter-spacing: -0.08em; color: #ffffff14; }
.orbit { position: absolute; right: 0; bottom: 0; width: 96%; aspect-ratio: 1; border-radius: 100% 0 0 0; background: #820933; }
img { position: absolute; right: 0; bottom: 0; width: 100%; height: 560px; object-fit: contain; object-position: right bottom; }
</style></head><body>
<div class="spine"></div>
<div class="copy">
  <span class="eyebrow"><span>＋</span>Software / Julian Tracht</span>
  <h1>Julian<br><span>Tracht<i>.</i></span></h1>
  <div class="bar"><b style="width:52px;background:#820933"></b><b style="width:24px;background:#ff7a9c"></b><b style="width:14px;background:#b9791c"></b></div>
  <h2>${role}</h2>
  <div class="foot"><span>${values}</span><span>freelance.tracht-digital.de</span></div>
</div>
<div class="stage"><span class="type">JT</span><div class="orbit"></div><img src="${portrait}" alt=""></div>
</body></html>`;

await mkdir('public/images', { recursive: true });
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of cards) {
  await tab.setContent(page(card), { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: `public/images/og-${card.lang}.png` });
}
await browser.close();

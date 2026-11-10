import type { Locale } from './content';

/**
 * English names for the German technology/topic tags in `projects.json` and
 * `content.ts`. The data keeps one German tag per entry; product and
 * framework names (Astro, Rust, WordPress …) are the same in both languages
 * and are listed in `NEUTRAL_TECH` so the test can tell a forgotten
 * translation from a proper name.
 */
export const TECH_EN: Record<string, string> = {
  Automatisierung: 'Automation',
  Datenmigration: 'Data migration',
  Informationsarchitektur: 'Information architecture',
  Produktkatalog: 'Product catalogue',
  Projektmanagement: 'Project management',
  'QR-Code': 'QR code',
  'TDS Designsystem': 'TDS design system',
  'Tool-Pakete': 'Tool packages',
  Wartung: 'Maintenance',
  Webentwicklung: 'Web development',
};

export const NEUTRAL_TECH = new Set([
  '.NET', 'Android USB Host', 'ASP.NET Core', 'Astro', 'Axum', 'BPMN',
  'Browser APIs', 'C#', 'C++', 'Claude Code', 'CMake', 'CSS', 'Debian',
  'E-Commerce', 'Gitea API', 'GitHub Actions', 'GPT/MBR', 'GTK 4', 'HTML',
  'Jenkins', 'JavaScript', 'Jetpack Compose', 'Kotlin', 'libaums', 'Magento 2',
  'MCP', 'Node.js', 'Preact', 'PWA', 'QR-Code', 'Raspberry Pi OS', 'RDP',
  'Responsive', 'Responsive Design', 'REST', 'Rust', 'SEO', 'Shopware 6',
  'SQL', 'SQLite', 'Stripe', 'Testing', 'TypeScript', 'UI/UX', 'UX', 'vCard',
  'Vue.js', 'Wayland', 'Webdesign', 'Windows', 'WooCommerce', 'WordPress',
  'XML',
]);

export function techLabel(tag: string, lang: Locale): string {
  return lang === 'en' ? (TECH_EN[tag] ?? tag) : tag;
}

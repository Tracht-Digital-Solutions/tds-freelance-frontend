import {
  siAngular,
  siAstro,
  siBitbucket,
  siCamunda,
  siClaude,
  siConfluence,
  siCplusplus,
  siCss,
  siDocker,
  siDotnet,
  siFigma,
  siGit,
  siGitea,
  siGithubactions,
  siGitlab,
  siGrafana,
  siGtk,
  siHtml5,
  siJavascript,
  siJenkins,
  siJetpackcompose,
  siJira,
  siJson,
  siKnime,
  siKotlin,
  siLinux,
  siMariadb,
  siModelcontextprotocol,
  siMysql,
  siN8n,
  siNodedotjs,
  siPandas,
  siPhp,
  siPostgresql,
  siPreact,
  siPython,
  siRaspberrypi,
  siReact,
  siRust,
  siShopware,
  siSqlite,
  siStoryblok,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siTypo3,
  siVitest,
  siVuedotjs,
  siWebcomponentsdotorg,
  siWoocommerce,
  siWordpress,
  siXml,
} from 'simple-icons';

// Brand marks come from Simple Icons (CC0) and are inlined at build time.
// Marks are drawn in their brand colour on a white chip (`.skill-symbol--logo`);
// skills without a published mark get a navy line glyph instead.
// Keys are the English skill names from `content.ts`.
const brands: Record<string, { path: string; hex: string }> = {
  'Vue.js': siVuedotjs,
  React: siReact,
  Angular: siAngular,
  Astro: siAstro,
  Preact: siPreact,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  HTML: siHtml5,
  CSS: siCss,
  'Tailwind CSS': siTailwindcss,
  Figma: siFigma,
  'Web Components': siWebcomponentsdotorg,
  PHP: siPhp,
  Python: siPython,
  '.NET': siDotnet,
  'ASP.NET Core': siDotnet,
  'Node.js': siNodedotjs,
  'Swagger / OpenAPI': siSwagger,
  Camunda: siCamunda,
  MCP: siModelcontextprotocol,
  Kotlin: siKotlin,
  'Jetpack Compose': siJetpackcompose,
  Rust: siRust,
  'C++': siCplusplus,
  'GTK 4': siGtk,
  'Raspberry Pi': siRaspberrypi,
  MySQL: siMysql,
  MariaDB: siMariadb,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  XML: siXml,
  JSON: siJson,
  WooCommerce: siWoocommerce,
  'Shopware 6': siShopware,
  WordPress: siWordpress,
  TYPO3: siTypo3,
  Storyblok: siStoryblok,
  KNIME: siKnime,
  n8n: siN8n,
  Pandas: siPandas,
  Claude: siClaude,
  Git: siGit,
  'GitHub Actions': siGithubactions,
  'Gitea Actions': siGitea,
  'GitLab CI': siGitlab,
  Jenkins: siJenkins,
  Docker: siDocker,
  Linux: siLinux,
  Vitest: siVitest,
  Grafana: siGrafana,
  Jira: siJira,
  Confluence: siConfluence,
  Bitbucket: siBitbucket,
};

const code = '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>';
const window =
  '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 13h8M8 16h5"/>';
const table =
  '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16M15 4v16"/>';
const check =
  '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9"/>';
const spark =
  '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m12 8 1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5Z"/>';
const board =
  '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16M5.5 8h1.5M11 8h2M11 11.5h2M17 8h1.5"/>';
const lines: Record<string, string> = {
  'C#': code,
  'Slim 4': code,
  WPF: window,
  WinForms: window,
  XAML: code,
  SQL: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  'REST APIs': '<path d="M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4"/>',
  CSV: table,
  Excel: table,
  'Magento 2':
    '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  'Multichannel feeds':
    '<circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="19" cy="12" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7.5 12h9M7 10.5l9.5-4.5M7 13.5l9.5 4.5"/>',
  'PIM / ERP': '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  'Local LLMs': spark,
  'LoRA Fine-Tuning':
    '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
  'Prompt Engineering':
    '<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/><path d="m8 8 2.5 2L8 12M12 12h4"/>',
  ComfyUI:
    '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>',
  Codex: '<path d="m5 8 4 4-4 4M12 17h7"/>',
  BPMN: '<circle cx="5" cy="12" r="2.5"/><rect x="9.5" y="8.5" width="6" height="7" rx="1.5"/><path d="M7.5 12h2M15.5 12h2"/><path d="m20.5 9.5 2 2.5-2 2.5-2-2.5Z"/>',
  'Project management': board,
  Scrum:
    '<path d="M20 12a8 8 0 1 1-3-6.2"/><path d="M20 4v5h-5"/><circle cx="12" cy="12" r="2"/>',
  'Azure DevOps': board,
  'CI/CD':
    '<path d="M20 12a8 8 0 0 1-13.7 5.7M4 12a8 8 0 0 1 13.7-5.7"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  Deployment:
    '<path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
  Testing: check,
  Playwright:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="m9 14 2 2 4-4"/>',
  xUnit: check,
  'UX mockups':
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
  Consulting:
    '<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/><path d="M8 8h8M8 12h5"/>',
  'Process design':
    '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8.5 6h7M7.3 8.2l3.5 7.6M16.7 8.2l-3.5 7.6"/>',
};

/** Inline SVG markup for a skill (by English name), or undefined for initials. */
export function skillIcon(name: string): string | undefined {
  const brand = brands[name];
  if (brand)
    return `<svg viewBox="0 0 24 24" width="22" height="22" fill="#${brand.hex}" focusable="false"><path d="${brand.path}"/></svg>`;
  const glyph = lines[name];
  if (glyph)
    return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#050f68" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">${glyph}</svg>`;
  return undefined;
}

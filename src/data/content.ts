import { z } from 'zod';
import certificateData from './certificates.json' with { type: 'json' };
export type Locale = 'de' | 'en';
export const localized = z.object({
  de: z.string().min(1),
  en: z.string().min(1),
});
export const l = (de: string, en: string) => ({ de, en });
export const profile = {
  name: 'Julian Tracht',
  company: 'Tracht Digital Solutions',
  city: 'Schwarzenbek',
  email: 'kontakt@tracht-digital.de',
  phone: '+49 178 822 4022',
  github: 'https://github.com/jtracht',
  linkedin: 'https://www.linkedin.com/in/julian-tracht/',
  role: l(
    'Fullstack-Entwickler & Projektmanagement',
    'Full-Stack Developer & Project Management',
  ),
};
export const views = [
  {
    id: 'home',
    paths: { de: '/', en: '/en/' },
    title: l('Start', 'Home'),
    description: l(
      'Julian Tracht: Fullstack-Entwicklung, Projektmanagement und digitale Lösungen. Persönlichkeit, Berufserfahrung und Kompetenzen im Überblick.',
      'Meet Julian Tracht: full-stack development, project management and digital solutions. Explore his background, skills and approach.',
    ),
  },
  {
    id: 'about',
    paths: { de: '/ueber-mich/', en: '/en/about/' },
    title: l('Über mich', 'About me'),
    description: l(
      'Von LEGO Mindstorms zur Softwareentwicklung: meine Geschichte, Motivation und die Werte Qualität, Transparenz und Fairness.',
      'From LEGO Mindstorms to software development: my story, motivation and commitment to quality, transparency and fairness.',
    ),
  },
  {
    id: 'career',
    paths: { de: '/karriere/', en: '/en/career/' },
    title: l('Karriere', 'Career'),
    description: l(
      'Mein beruflicher Weg: Selbstständigkeit, Backend- und Frontend-Entwicklung sowie Ausbildung zum Fachinformatiker.',
      'My professional journey through independent work, backend and frontend development, and vocational training in software development.',
    ),
  },
  {
    id: 'skills',
    paths: { de: '/faehigkeiten/', en: '/en/skills/' },
    title: l('Fähigkeiten', 'Skills'),
    description: l(
      'Mein technisches Profil: Technologien, Schnittstellen, E-Commerce, Projektmanagement und Softwarequalität mit interaktiven Filtern.',
      'Explore my technical profile: technologies, APIs, e-commerce, project management and software quality, with interactive filters.',
    ),
  },
  {
    id: 'projects',
    paths: { de: '/projekte/', en: '/en/projects/' },
    title: l('Projekte', 'Projects'),
    description: l(
      'Individuelle Softwareentwicklung von der Anforderung bis zur Umsetzung. Ein Einblick in meine Arbeitsweise und Projektgespräche.',
      'Custom software development from requirements to implementation. Explore my working process and discuss a project.',
    ),
  },
  {
    id: 'certifications',
    paths: { de: '/zertifikate/', en: '/en/certifications/' },
    title: l('Zertifikate', 'Certifications'),
    description: l(
      '13 Weiterbildungszertifikate in Projektmanagement, Softwareentwicklung, Cloud, Datenanalyse, KI und Sicherheit.',
      '13 learning certificates in project management, software development, cloud, data analysis, AI and security.',
    ),
  },
  {
    id: 'ai',
    paths: { de: '/ki-softwarequalitaet/', en: '/en/ai-software-quality/' },
    title: l('KI & Softwarequalität', 'AI & software quality'),
    description: l(
      'Meine Haltung zu KI in der Softwareentwicklung: schneller arbeiten, Architektur verstehen und Qualität verantwortungsvoll prüfen.',
      'My approach to AI in software development: work faster, understand the architecture and take responsibility for quality.',
    ),
  },
  {
    id: 'contact',
    paths: { de: '/kontakt/', en: '/en/contact/' },
    title: l('Kontakt', 'Contact'),
    description: l(
      'Kontakt zu Julian Tracht für individuelle Softwareprojekte oder Jobangebote über Tracht Digital Solutions.',
      'Contact Julian Tracht about custom software projects or job opportunities through Tracht Digital Solutions.',
    ),
  },
] as const;
export type ViewId = (typeof views)[number]['id'];
export function pathFor(id: ViewId, lang: Locale) {
  return views.find((v) => v.id === id)!.paths[lang];
}
export function contactUrl(lang: Locale) {
  return `https://tracht-digital.de/${lang === 'en' ? 'en/' : ''}#contact`;
}
const careerSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  company: z.string().min(1),
  period: localized,
  role: localized,
  summary: localized,
  tasks: z.array(localized).min(1),
  tech: z.array(z.string()).min(1),
});
export const career = z.array(careerSchema).parse([
  {
    id: 'tracht-digital-solutions',
    company: 'Tracht Digital Solutions',
    period: l('Seit Ende 2024', 'Since late 2024'),
    role: l(
      'Selbstständig · Softwareentwicklung & Digitalisierung',
      'Self-employed · Software development & digitalisation',
    ),
    summary: l(
      'Individuelle Software- und Weblösungen, die Geschäftsprozesse verständlicher und einfacher machen.',
      'Custom software and web solutions that make business processes clearer and simpler.',
    ),
    tasks: [
      l(
        'Projekte eigenständig planen, Anforderungen klären und technische Lösungen konzipieren.',
        'Independently plan projects, clarify requirements and design technical solutions.',
      ),
      l(
        'Software umsetzen und Projekte von der Konzeption bis zur direkten Kundenabstimmung begleiten.',
        'Implement software and guide projects from conception through direct client communication.',
      ),
      l(
        'Shop-Systeme weiterentwickeln, Plugins und Designs erstellen sowie PIM- und ERP-Systeme anbinden.',
        'Develop shop systems, build plugins and designs, and integrate PIM and ERP systems.',
      ),
    ],
    tech: ['WooCommerce', 'Shopware 6', 'Magento 2', 'Projektmanagement'],
  },
  {
    id: 'amotiq',
    company: 'amotIQ automotive GmbH',
    period: l('11/2023 – 06/2024', '11/2023 – 06/2024'),
    role: l('Backend-Entwickler', 'Backend developer'),
    summary: l(
      'Backend-Entwicklung für Automotive-Supply-Chain-Software mit C# und ASP.NET Core.',
      'Backend development for automotive supply chain software with C# and ASP.NET Core.',
    ),
    tasks: [
      l(
        'Backend-Funktionen entwickeln und Fehler analysieren und beheben.',
        'Develop backend functionality and analyse and resolve bugs.',
      ),
      l(
        'BPMN-Prozesse bearbeiten und neue Feature-Anforderungen abstimmen.',
        'Work on BPMN processes and coordinate new feature requirements.',
      ),
      l(
        'UX-Fragestellungen und Oberflächenkonzeption unterstützen.',
        'Support UX questions and interface concepts.',
      ),
    ],
    tech: ['C#', 'ASP.NET Core', 'BPMN', 'UX'],
  },
  {
    id: 'maverick',
    company: 'Maverick Media Consulting GmbH',
    period: l('07/2021 – 11/2023', '07/2021 – 11/2023'),
    role: l('Frontend-Entwickler', 'Frontend developer'),
    summary: l(
      'Datenintensive Verwaltungssoftware und interne Webanwendungen mit Vue.js.',
      'Data-intensive administration software and internal web applications with Vue.js.',
    ),
    tasks: [
      l(
        'An Planung, Design, Entwicklung und Dokumentation von Webanwendungen mitarbeiten.',
        'Contribute to planning, design, development and documentation of web applications.',
      ),
      l(
        'Abläufe automatisieren und Software testen.',
        'Automate processes and test software.',
      ),
      l(
        'Stabilität und Betrieb von Entwicklungs- und Produktionsumgebungen sicherstellen.',
        'Maintain stability and operation of development and production environments.',
      ),
    ],
    tech: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Testing'],
  },
  {
    id: 'pav-card',
    company: 'PAV Card GmbH',
    period: l('08/2018 – 06/2021', '08/2018 – 06/2021'),
    role: l(
      'Ausbildung · Fachinformatiker Anwendungsentwicklung',
      'Apprenticeship · IT specialist for application development',
    ),
    summary: l(
      'Softwareentwicklung zwischen Web, Windows-Anwendungen und automatisierten Datenworkflows.',
      'Software development spanning web, Windows applications and automated data workflows.',
    ),
    tasks: [
      l(
        'Frontend, Backend und Windows-Desktopanwendungen mit C#, SQL, REST und XML entwickeln.',
        'Develop frontend, backend and Windows desktop applications with C#, SQL, REST and XML.',
      ),
      l(
        'E-Commerce sowie automatisierte Druck- und Datenworkflows bearbeiten.',
        'Work on e-commerce and automated print and data workflows.',
      ),
      l(
        'Mit Jenkins und Atlassian-Produkten arbeiten.',
        'Work with Jenkins and Atlassian products.',
      ),
    ],
    tech: ['C#', '.NET', 'SQL', 'REST', 'XML', 'Jenkins'],
  },
]);
export const education = [
  {
    period: '2018 – 2021',
    title: l(
      'Fachinformatiker Anwendungsentwicklung',
      'IT specialist for application development',
    ),
    institution: 'PAV Card GmbH / Emil-Possehl-Schule',
  },
  {
    period: '2018',
    title: l(
      'Fachhochschulreife',
      'University of applied sciences entrance qualification',
    ),
    institution: 'Alfred-Nobel-Schule, Geesthacht',
  },
];
export const categories = {
  frontend: l('Frontend', 'Frontend'),
  backend: l('Backend', 'Backend'),
  data: l('Daten & Schnittstellen', 'Data & APIs'),
  commerce: l('E-Commerce & CMS', 'E-commerce & CMS'),
  process: l('Prozesse & Projekte', 'Processes & projects'),
  quality: l('Qualität & Deployment', 'Quality & deployment'),
  ai: l('KI & Konzeption', 'AI & concepts'),
};
const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  category: z.enum([
    'frontend',
    'backend',
    'data',
    'commerce',
    'process',
    'quality',
    'ai',
  ]),
  level: z.enum(['documented', 'foundation', 'advanced', 'expert']),
  context: localized,
  description: localized,
});
const skillGroups: [keyof typeof categories, string[], ReturnType<typeof l>][] =
  [
    [
      'frontend',
      ['Vue.js', 'React', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
      l('Webentwicklung', 'Web development'),
    ],
    [
      'backend',
      ['C#', '.NET', 'ASP.NET Core', 'WPF', 'Python'],
      l('Softwareentwicklung', 'Software development'),
    ],
    [
      'data',
      ['SQL', 'MariaDB', 'REST APIs', 'XAML', 'XML', 'CSV', 'JSON'],
      l('Datenverarbeitung', 'Data processing'),
    ],
    [
      'commerce',
      [
        'WooCommerce',
        'Shopware 6',
        'Magento 2',
        'WordPress',
        'TYPO3',
        'PIM / ERP',
      ],
      l('Digitale Geschäftsprozesse', 'Digital business processes'),
    ],
    [
      'process',
      ['BPMN', 'Projektmanagement', 'Jira', 'Confluence', 'Bitbucket'],
      l('Planung & Zusammenarbeit', 'Planning & collaboration'),
    ],
    [
      'quality',
      ['CI/CD', 'Deployment', 'Testing', 'Jenkins'],
      l('Betrieb & Qualität', 'Operations & quality'),
    ],
    [
      'ai',
      ['Codex', 'Claude', 'UX-Mockups', 'Beratung', 'Prozesskonzeption'],
      l('Konzeption & Werkzeuge', 'Concepts & tools'),
    ],
  ];
export const skills = z.array(skillSchema).parse(
  skillGroups.flatMap(([category, names, context]) =>
    names.map((name, i) => ({
      id: `${category}-${i}`,
      name,
      category,
      level: 'documented',
      context,
      description: l(
        `${name} gehört zu meinem dokumentierten technischen Profil. Einsatzgebiet: ${context.de}. Die Übersicht beschreibt Kenntnisse aus meinem Lebenslauf; sie verwendet keine unbestätigten Beherrschungsgrade.`,
        `${name} is part of my documented technical profile. Context: ${context.en}. This overview reflects my CV without assigning unconfirmed proficiency levels.`,
      ),
    })),
  ),
);
export const levels = {
  documented: l('Im Lebenslauf belegt', 'Documented in CV'),
  foundation: l('Grundlagen', 'Foundation'),
  advanced: l('Fortgeschritten', 'Advanced'),
  expert: l('Vertieft', 'In-depth'),
};
const certificateSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.iso.date(),
  category: z.enum([
    'management',
    'development',
    'data',
    'ai',
    'security',
    'marketing',
  ]),
  skills: z.array(z.string()).min(1),
  image: z.string().regex(/^\/images\/certificates\/[a-z0-9-]+\.webp$/),
});
export const certificates = z
  .array(certificateSchema)
  .length(13)
  .parse(certificateData);
export const certCategories = {
  management: l('Management', 'Management'),
  development: l('Entwicklung & Cloud', 'Development & cloud'),
  data: l('Daten', 'Data'),
  ai: l('KI', 'AI'),
  security: l('Sicherheit', 'Security'),
  marketing: l('SEO', 'SEO'),
};
export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  approved: z.literal(true),
  title: localized,
  summary: localized,
  category: localized,
  stage: localized,
  role: localized,
  tech: z.array(z.string()).min(1),
  sections: z.array(z.object({ title: localized, text: localized })).min(1),
  image: z.string().optional(),
  github: z.url().optional(),
  website: z.url().optional(),
});
export type Project = z.infer<typeof projectSchema>;
// Only individually approved records belong here. Research stays outside Git.
export const projects: Project[] = [
  {
    id: 'tds-hauptwebsite',
    approved: true,
    image: '/images/tds-hauptwebsite.webp',
    title: l('Tracht Digital Solutions', 'Tracht Digital Solutions'),
    summary: l(
      'Die eigene Unternehmenswebsite: zweisprachige Astro-Anwendung mit gemeinsamem Designsystem, selektiven React-Komponenten und redaktioneller Inhaltsverwaltung.',
      'My company website: a bilingual Astro application with a shared design system, selective React components and editorial content management.',
    ),
    category: l('Webentwicklung', 'Web development'),
    stage: l('Implementierte Webanwendung', 'Implemented web application'),
    role: l(
      'Eigenes Unternehmen · Konzeption & Entwicklung',
      'My company · Concept & development',
    ),
    tech: [
      'Astro',
      'TypeScript',
      'React',
      'TDS Designsystem',
      'GitHub Actions',
    ],
    website: 'https://tracht-digital.de',
    github:
      'https://github.com/Tracht-Digital-Solutions/tds-landingpage-frontend',
    sections: [
      {
        title: l('Ausgangspunkt', 'Starting point'),
        text: l(
          'Die Website stellt die Leistungen und Arbeitsweise meines Unternehmens vor. Deutsche und englische Inhalte, Kontaktwege und eine konsistente Gestaltung sollen zusammen ein verständliches Bild ergeben.',
          'The website presents my company’s services and working process. German and English content, contact options and a consistent visual language come together to make the offering understandable.',
        ),
      },
      {
        title: l('Technische Architektur', 'Technical architecture'),
        text: l(
          'Die aktuelle Codebasis nutzt Astro mit Node-Adapter und selektiven React-Komponenten. Ein dateibasierter Seiten-Cache ergänzt das Server-Rendering. Das private TDS-Designpaket liefert gemeinsame Tokens, UI-Primitives und Präferenzmechanismen. Diese Architektur ist vom statischen Aufbau dieses Portfolios zu unterscheiden.',
          'The current codebase uses Astro with the Node adapter and selective React components. A file-based page cache complements server rendering. The private TDS design package provides shared tokens, UI primitives and preference handling. This architecture differs from the static structure of this portfolio.',
        ),
      },
      {
        title: l('Mein Beitrag', 'My contribution'),
        text: l(
          'Konzeption und Entwicklung der eigenen Unternehmenswebsite sowie Einbindung in das TDS-Ökosystem. Die technische Grundlage umfasst Sprachrouten, Theme-Präferenzen, strukturierte Metadaten und getrennte Entwicklungs- und Release-Workflows.',
          'Concept and development of my company website and its integration into the TDS ecosystem. The technical foundation includes language routes, theme preferences, structured metadata and separate development and release workflows.',
        ),
      },
      {
        title: l('Stand & Einordnung', 'Status & context'),
        text: l(
          'Die beschriebene Umsetzung ist in der aktuellen Codebasis belegt. CI-Prüfungen und ein manueller Release-Workflow sind vorhanden. Daraus werden keine unbelegten Aussagen über Besucherzahlen, Conversion-Raten oder Leistungskennzahlen abgeleitet.',
          'The implementation described here is supported by the current codebase. CI checks and a manual release workflow are present. No unverified claims about visitor numbers, conversion rates or performance metrics are inferred from that.',
        ),
      },
    ],
  },
  {
    id: 'td-tools',
    approved: true,
    image: '/images/td-tools.webp',
    title: l('TD Tools', 'TD Tools'),
    summary: l(
      'Eine modulare Plattform für digitale Werkzeuge. Eigenständige Tool-Pakete werden in einer gemeinsamen Astro-Anwendung zusammengeführt.',
      'A modular platform for digital tools. Independent tool packages are composed into one shared Astro application.',
    ),
    category: l('Plattform & Werkzeuge', 'Platform & tools'),
    stage: l('Implementierte Tool-Plattform', 'Implemented tool platform'),
    role: l(
      'Eigenes Unternehmen · Plattformkonzeption & Entwicklung',
      'My company · Platform design & development',
    ),
    tech: ['Astro', 'TypeScript', 'React', 'Tool-Pakete', 'Browser APIs'],
    website: 'https://tools.tracht-digital.de',
    github: 'https://github.com/Tracht-Digital-Solutions/tds-tools-frontend',
    sections: [
      {
        title: l('Idee & Aufbau', 'Idea & structure'),
        text: l(
          'Digitale Alltagsaufgaben lassen sich mit kleinen, spezialisierten Werkzeugen vereinfachen. TD Tools bündelt diese Werkzeuge, während ihre Umsetzung in eigenen Paketen bleibt. Ein gemeinsamer Vertrag definiert, wie sie sich in den Host integrieren.',
          'Small, focused tools can simplify everyday digital tasks. TD Tools brings these tools together while keeping their implementations in independent packages. A shared contract defines how they integrate with the host.',
        ),
      },
      {
        title: l('Technische Umsetzung', 'Technical implementation'),
        text: l(
          'Die Host-Anwendung nutzt Astro, TypeScript und selektive React-Komponenten. Die Codebasis enthält unter anderem Pakete für JSON-Formatierung, Kontrastprüfung, QR-Codes, Bildverarbeitung und PDF-Werkzeuge. Viele Verarbeitungsaufgaben laufen im Browser; das ist keine pauschale Aussage, dass jede Plattformfunktion ausschließlich lokal arbeitet.',
          'The host application uses Astro, TypeScript and selective React components. The codebase includes packages for JSON formatting, contrast checks, QR codes, image processing and PDF tools. Many processing tasks run in the browser; this does not mean every platform feature operates entirely locally.',
        ),
      },
      {
        title: l('Mein Beitrag', 'My contribution'),
        text: l(
          'Konzeption und Entwicklung der eigenen Tool-Plattform mit einer modularen Paketstruktur, gemeinsamer Gestaltung und zweisprachigem Katalog. Die Trennung von Host und Werkzeugen unterstützt gezielte Weiterentwicklung einzelner Funktionen.',
          'Concept and development of my own tool platform, with a modular package structure, shared styling and a bilingual catalogue. Separating the host from its tools supports focused development of individual features.',
        ),
      },
      {
        title: l('Stand & Einordnung', 'Status & context'),
        text: l(
          'Die modulare Plattform und Werkzeugimplementierungen sind im Quellcode vorhanden. Die Funktionsprüfung jedes einzelnen kostenlosen oder Premium-Werkzeugs ist nicht Gegenstand dieses Portfolio-Projekts. Die Referenz beschreibt den belegten Aufbau und beansprucht keine ungeprüften Betriebsergebnisse.',
          'The modular platform and tool implementations exist in the source code. Testing every individual free or premium tool is outside the scope of this portfolio project. This reference describes the documented structure without claiming unverified operational results.',
        ),
      },
    ],
  },
];
export function validateContent() {
  for (const [name, items] of Object.entries({
    career,
    skills,
    certificates,
    projects,
  })) {
    const ids = items.map((i) => i.id);
    if (new Set(ids).size !== ids.length)
      throw new Error(`Duplicate ${name} ID`);
  }
  for (const project of projects) projectSchema.parse(project);
  const paths = views.flatMap((v) => Object.values(v.paths));
  if (new Set(paths).size !== paths.length) throw new Error('Duplicate route');
}
validateContent();
export const allRoutes = () => [
  ...views.flatMap((view) =>
    (['de', 'en'] as const).map((lang) => ({
      path: view.paths[lang],
      lang,
      id: view.id,
    })),
  ),
  ...career.flatMap((c) =>
    (['de', 'en'] as const).map((lang) => ({
      path: `${pathFor('career', lang)}${c.id}/`,
      lang,
      id: 'career' as const,
      detail: c.id,
    })),
  ),
  ...projects.flatMap((p) =>
    (['de', 'en'] as const).map((lang) => ({
      path: `${pathFor('projects', lang)}${p.id}/`,
      lang,
      id: 'projects' as const,
      detail: p.id,
    })),
  ),
];

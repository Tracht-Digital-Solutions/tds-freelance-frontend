import { z } from 'zod';
import certificateData from './certificates.json' with { type: 'json' };
import additionalProjects from './projects.json' with { type: 'json' };
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
  phone: '+49 4151 8788264',
  mobile: '+49 178 822 4022',
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
  context: localized,
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
      context,
    })),
  ),
);
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
  kind: z
    .enum(['client', 'own', 'demo', 'study', 'development'])
    .default('own'),
  careerId: z.string().optional(),
  title: localized,
  summary: localized,
  category: localized,
  stage: localized,
  role: localized,
  tech: z.array(z.string()).min(1),
  sections: z.array(z.object({ title: localized, text: localized })).min(1),
  image: z.string().optional(),
  imageWidth: z.number().positive().default(1000),
  imageHeight: z.number().positive().default(625),
  github: z.url().optional(),
  website: z.url().optional(),
});
export type Project = z.infer<typeof projectSchema>;
// Only individually approved records belong here. Research stays outside Git.
export const projects: Project[] = [
  {
    id: 'tds-hauptwebsite',
    kind: 'own',
    imageWidth: 1000,
    imageHeight: 625,
    careerId: 'tracht-digital-solutions',
    approved: true,
    image: '/images/tds-hauptwebsite-2611c.webp',
    title: l('Tracht Digital Solutions', 'Tracht Digital Solutions'),
    summary: l(
      'Meine Unternehmenswebsite: Leistungen, Projekte und Kontakt auf Deutsch und Englisch, gebaut mit Astro.',
      'My company website: services, projects and contact in German and English, built with Astro.',
    ),
    category: l('Webentwicklung', 'Web development'),
    stage: l('Live-Website', 'Live website'),
    role: l(
      'Eigenes Unternehmen · Konzeption & Entwicklung',
      'My company · Concept & development',
    ),
    tech: ['Astro', 'TypeScript', 'TDS Designsystem', 'GitHub Actions'],
    website: 'https://tracht-digital.de',
    github:
      'https://github.com/Tracht-Digital-Solutions/tds-landingpage-frontend',
    sections: [
      {
        title: l('Projekt', 'Project'),
        text: l(
          'Die Website zeigt Leistungen, Projekte und den Ablauf einer Zusammenarbeit. Ein Leistungsassistent und ein Fragebogen, der die Zeitersparnis ausrechnet, helfen beim Einstieg. Im Hero dreht sich ein Karussell mit Demos und Designstudien.',
          'The website shows services, projects and how a collaboration works. A service assistant and a questionnaire that works out the time saved help people get started. A carousel of demos and design studies turns in the hero.',
        ),
      },
      {
        title: l('Technik', 'Technology'),
        text: l(
          'Astro rendert die Seiten auf dem Server, ein Seiten-Cache liefert sie schnell aus. Das gemeinsame TDS-Designsystem bringt Farben, Bausteine und Übersetzungen mit.',
          'Astro renders the pages on the server and a page cache serves them quickly. The shared TDS design system provides colours, components and translations.',
        ),
      },
    ],
  },
  {
    id: 'td-tools',
    kind: 'own',
    imageWidth: 1000,
    imageHeight: 625,
    careerId: 'tracht-digital-solutions',
    approved: true,
    image: '/images/td-tools-2611c.webp',
    title: l('Online-Tools', 'Online-Tools'),
    summary: l(
      'Kostenlose Online-Tools für kleine Betriebe, etwa Bildkompressor, QR-Code- und Impressum-Generator.',
      'Free online tools for small businesses, such as an image compressor and QR code and legal notice generators.',
    ),
    category: l('Plattform & Werkzeuge', 'Platform & tools'),
    stage: l('Live-Plattform', 'Live platform'),
    role: l(
      'Eigenes Unternehmen · Plattformkonzeption & Entwicklung',
      'My company · Platform design & development',
    ),
    tech: ['Astro', 'TypeScript', 'Tool-Pakete', 'Browser APIs'],
    website: 'https://tools.tracht-digital.de',
    github: 'https://github.com/Tracht-Digital-Solutions/tds-tools-frontend',
    sections: [
      {
        title: l('Projekt', 'Project'),
        text: l(
          'Jedes Werkzeug ist ein eigenes Paket. Ein gemeinsamer Vertrag regelt, wie es in die Plattform kommt. So lassen sich Tools einzeln weiterentwickeln.',
          'Every tool is its own package. A shared contract defines how it joins the platform, so tools can evolve one by one.',
        ),
      },
      {
        title: l('Technik', 'Technology'),
        text: l(
          'Die meisten Tools arbeiten direkt im Browser, Dateien verlassen dabei das Gerät nicht. Erweiterte Funktionen gibt es im Premium-Abo.',
          'Most tools run directly in the browser, so files stay on the device. Extended features come with a premium subscription.',
        ),
      },
    ],
  },
  ...z.array(projectSchema).parse(additionalProjects),
];
export const projectKinds = {
  client: l('Kundenprojekt', 'Client project'),
  own: l('Eigenes Projekt', 'Own project'),
  demo: l('Demo', 'Demo'),
  study: l('Designstudie', 'Design study'),
  development: l('In Entwicklung', 'In development'),
};
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
  for (const project of projects) {
    projectSchema.parse(project);
    if (
      project.careerId &&
      !career.some((entry) => entry.id === project.careerId)
    )
      throw new Error(`Unknown career reference: ${project.id}`);
  }
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

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
    tech: [
      'WooCommerce',
      'Shopware 6',
      'Magento 2',
      'TYPO3',
      'KNIME',
      'n8n',
      'Astro',
      'React',
      'Projektmanagement',
    ],
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
    tech: ['C#', 'ASP.NET Core', 'Camunda', 'BPMN', 'xUnit', 'UX'],
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
    tech: ['Vue.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Testing'],
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
    tech: [
      'C#',
      '.NET',
      'Angular',
      'WPF',
      'Magento 2',
      'SQL',
      'REST',
      'XML',
      'Jenkins',
    ],
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
/*
 * Skills are grouped in two levels: a top-level area (`categories`) and a
 * sub-group (`skillSubgroups`). Order of the areas and sub-groups is the
 * display order; skills inside a sub-group are sorted alphabetically at
 * render time. `keywords` feed the search only (never shown): they hold
 * German/English synonyms and umbrella terms, so a search for
 * "JS-Framework" finds Vue, React, Angular, Astro and Preact.
 */
export const categories = {
  frontend: l('Frontend & Web', 'Frontend & web'),
  backend: l('Backend & Schnittstellen', 'Backend & APIs'),
  systems: l('Desktop, Mobile & Systeme', 'Desktop, mobile & systems'),
  data: l('Datenbanken & Datenformate', 'Databases & data formats'),
  commerce: l('E-Commerce & CMS', 'E-commerce & CMS'),
  automation: l('Automatisierung & KI', 'Automation & AI'),
  quality: l('DevOps & Qualität', 'DevOps & quality'),
  process: l('Prozesse & Zusammenarbeit', 'Processes & collaboration'),
};
export type SkillCategory = keyof typeof categories;
export const skillSubgroups = {
  'web-languages': l('Sprachen & Grundlagen', 'Languages & foundations'),
  'web-frameworks': l('JavaScript-Frameworks', 'JavaScript frameworks'),
  'web-design': l('Gestaltung & UI', 'Design & UI'),
  'backend-languages': l('Sprachen', 'Languages'),
  'backend-frameworks': l('Frameworks & Laufzeiten', 'Frameworks & runtimes'),
  'backend-interfaces': l(
    'Schnittstellen & Prozess-Engines',
    'Interfaces & process engines',
  ),
  desktop: l('Windows-Desktop', 'Windows desktop'),
  mobile: l('Android & Wear OS', 'Android & Wear OS'),
  embedded: l('Systemnah & Embedded', 'Low-level & embedded'),
  databases: l('Datenbanken', 'Databases'),
  formats: l('Datenformate', 'Data formats'),
  shops: l('Shopsysteme', 'Shop systems'),
  cms: l('Content-Management', 'Content management'),
  'product-data': l(
    'Produktdaten & Vertriebskanäle',
    'Product data & channels',
  ),
  workflows: l(
    'Daten- & Workflow-Automatisierung',
    'Data & workflow automation',
  ),
  ai: l('KI & Sprachmodelle', 'AI & language models'),
  'ci-cd': l('Versionierung & CI/CD', 'Version control & CI/CD'),
  infrastructure: l('Infrastruktur & Betrieb', 'Infrastructure & operations'),
  testing: l('Tests & Monitoring', 'Testing & monitoring'),
  methods: l('Methoden', 'Methods'),
  'team-tools': l('Team-Werkzeuge', 'Team tools'),
  consulting: l('Konzeption & Beratung', 'Concepts & consulting'),
};
export type SkillSubgroup = keyof typeof skillSubgroups;
const skillSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: localized,
  category: z.enum(
    Object.keys(categories) as [SkillCategory, ...SkillCategory[]],
  ),
  subgroup: z.enum(
    Object.keys(skillSubgroups) as [SkillSubgroup, ...SkillSubgroup[]],
  ),
  keywords: z.string(),
});
export type Skill = z.infer<typeof skillSchema>;
type SkillInput = [name: string | { de: string; en: string }, keywords: string];
const skillTree: [SkillCategory, [SkillSubgroup, SkillInput[]][]][] = [
  [
    'frontend',
    [
      [
        'web-languages',
        [
          [
            'JavaScript',
            'js ecmascript es6 programmiersprache programming language web frontend',
          ],
          [
            'TypeScript',
            'ts js javascript typisiert typed programmiersprache programming language web frontend backend',
          ],
          [
            'HTML',
            'html5 markup web frontend semantik semantic barrierefreiheit accessibility',
          ],
          [
            'CSS',
            'css3 styling stylesheet layout responsive animation webdesign web frontend',
          ],
        ],
      ],
      [
        'web-frameworks',
        [
          [
            'Vue.js',
            'vue vue2 vue3 js-framework js framework javascript-framework frontend-framework spa komponenten components',
          ],
          [
            'React',
            'reactjs jsx js-framework js framework javascript-framework frontend-framework spa komponenten components bibliothek library',
          ],
          [
            'Angular',
            'angularjs typescript js-framework js framework javascript-framework frontend-framework spa',
          ],
          [
            'Astro',
            'js-framework js framework javascript-framework frontend-framework static site generator ssg ssr islands seo',
          ],
          [
            'Preact',
            'react js-framework js framework javascript-framework frontend-framework leichtgewichtig lightweight pwa',
          ],
        ],
      ],
      [
        'web-design',
        [
          [
            'Tailwind CSS',
            'tailwind css-framework css framework utility styling designsystem design system',
          ],
          [
            'Figma',
            'design ui ux prototyp prototype mockup wireframe gestaltung',
          ],
          [
            'Web Components',
            'custom elements shadow dom js javascript standard komponenten components',
          ],
          [
            l('UX-Mockups', 'UX mockups'),
            'ux ui wireframe prototyp prototype konzept concept design adobe xd gestaltung',
          ],
        ],
      ],
    ],
  ],
  [
    'backend',
    [
      [
        'backend-languages',
        [
          [
            'C#',
            'csharp c-sharp dotnet .net microsoft programmiersprache programming language backend',
          ],
          [
            'PHP',
            'php8 server backend programmiersprache programming language wordpress typo3 slim',
          ],
          [
            'Python',
            'py scripting skript script pandas automatisierung automation programmiersprache programming language backend',
          ],
        ],
      ],
      [
        'backend-frameworks',
        [
          ['.NET', 'dotnet net core framework microsoft c# csharp'],
          [
            'ASP.NET Core',
            'aspnet asp.net dotnet .net web api backend-framework framework microservices c#',
          ],
          [
            'Slim 4',
            'slim php-framework php framework microframework rest api backend-framework',
          ],
          [
            'Node.js',
            'node nodejs js javascript runtime laufzeit server backend',
          ],
        ],
      ],
      [
        'backend-interfaces',
        [
          [
            l('REST-APIs', 'REST APIs'),
            'rest api apis schnittstelle schnittstellen interface http json endpunkte endpoints integration',
          ],
          [
            'Swagger / OpenAPI',
            'swagger openapi api-dokumentation api documentation schnittstelle interface',
          ],
          [
            'Camunda',
            'bpmn workflow engine prozess process orchestrierung orchestration microservices external tasks',
          ],
          [
            'MCP',
            'model context protocol ki ai schnittstelle interface agent plugin llm',
          ],
        ],
      ],
    ],
  ],
  [
    'systems',
    [
      [
        'desktop',
        [
          ['WPF', 'windows desktop xaml .net dotnet c# gui oberfläche'],
          ['WinForms', 'windows forms desktop .net dotnet c# gui oberfläche'],
          ['XAML', 'wpf markup ui windows desktop'],
        ],
      ],
      [
        'mobile',
        [
          [
            'Kotlin',
            'android jvm mobile app programmiersprache programming language',
          ],
          ['Jetpack Compose', 'android compose ui mobile app wear os kotlin'],
        ],
      ],
      [
        'embedded',
        [
          [
            'Rust',
            'systemprogrammierung systems programming programmiersprache programming language native',
          ],
          [
            'C++',
            'cpp c++17 cmake systemnah native windows programmiersprache programming language',
          ],
          ['GTK 4', 'gtk gui linux wayland desktop oberfläche'],
          [
            'Raspberry Pi',
            'raspi arm arm64 embedded linux hardware iot einplatinencomputer',
          ],
        ],
      ],
    ],
  ],
  [
    'data',
    [
      [
        'databases',
        [
          [
            'SQL',
            'datenbank database db abfragen queries rdbms relational migration optimierung',
          ],
          ['MySQL', 'datenbank database db sql relational'],
          ['MariaDB', 'datenbank database db sql relational mysql'],
          ['PostgreSQL', 'postgres datenbank database db sql relational'],
          ['SQLite', 'datenbank database db sql embedded lokal local'],
        ],
      ],
      [
        'formats',
        [
          ['JSON', 'datenformat data format api schnittstelle'],
          ['XML', 'xsd schema datenformat data format'],
          ['CSV', 'tabellen tables import export datenformat data format'],
          [
            'Excel',
            'tabellen spreadsheet tables reporting statistik import export',
          ],
        ],
      ],
    ],
  ],
  [
    'commerce',
    [
      [
        'shops',
        [
          [
            'WooCommerce',
            'shop shopsystem onlineshop online shop e-commerce ecommerce wordpress checkout',
          ],
          [
            'Shopware 6',
            'shopware shop shopsystem onlineshop online shop e-commerce ecommerce',
          ],
          [
            'Magento 2',
            'magento adobe commerce shop shopsystem onlineshop online shop e-commerce ecommerce php',
          ],
        ],
      ],
      [
        'cms',
        [
          [
            'WordPress',
            'cms content management blog php themes plugins website',
          ],
          [
            'TYPO3',
            'cms content management fluid typoscript php website extensions',
          ],
          ['Storyblok', 'headless cms content management redaktion'],
        ],
      ],
      [
        'product-data',
        [
          [
            l('Multichannel-Feeds', 'Multichannel feeds'),
            'marktplatz marktplätze marketplace preisvergleich price comparison feed produktdaten product data e-commerce shop',
          ],
          [
            'PIM / ERP',
            'produktdaten product data warenwirtschaft schnittstelle integration e-commerce shop',
          ],
        ],
      ],
    ],
  ],
  [
    'automation',
    [
      [
        'workflows',
        [
          [
            'KNIME',
            'etl datenpipeline data pipeline workflow automatisierung automation low-code datenverarbeitung',
          ],
          [
            'n8n',
            'workflow automatisierung automation low-code integration ki ai',
          ],
          ['Pandas', 'python datenanalyse data analysis etl datenverarbeitung'],
        ],
      ],
      [
        'ai',
        [
          [
            l('Lokale LLMs', 'Local LLMs'),
            'ki ai künstliche intelligenz artificial intelligence llm sprachmodell language model self-hosted',
          ],
          [
            'LoRA Fine-Tuning',
            'ki ai training finetuning fine tuning modell model llm',
          ],
          ['Prompt Engineering', 'ki ai prompts prompting llm'],
          [
            'ComfyUI',
            'ki ai bildgenerierung image generation generative workflow 3d',
          ],
          ['Claude', 'ki ai coding agent assistent assistant llm anthropic'],
          ['Codex', 'ki ai coding agent assistent assistant llm'],
        ],
      ],
    ],
  ],
  [
    'quality',
    [
      [
        'ci-cd',
        [
          ['Git', 'versionierung version control vcs repository'],
          [
            'GitHub Actions',
            'ci cd ci/cd pipeline workflow automatisierung automation github',
          ],
          ['Gitea Actions', 'ci cd ci/cd pipeline runner self-hosted gitea'],
          ['GitLab CI', 'ci cd ci/cd pipeline gitlab'],
          ['Jenkins', 'ci cd ci/cd pipeline build deployment'],
          [
            'CI/CD',
            'ci cd continuous integration delivery pipeline automatisierung automation',
          ],
        ],
      ],
      [
        'infrastructure',
        [
          ['Docker', 'container devops self-hosted runner compose'],
          ['Linux', 'server debian ubuntu shell bash ssh sftp hosting devops'],
          [
            'Deployment',
            'release rollout veröffentlichung hosting rollback devops',
          ],
        ],
      ],
      [
        'testing',
        [
          ['Testing', 'test tests testen qualität quality qa unit integration'],
          [
            'Playwright',
            'e2e end-to-end browser test tests automatisierung automation qa',
          ],
          ['xUnit', 'unit test tests .net dotnet c# qa'],
          ['Vitest', 'unit test tests js javascript typescript qa'],
          ['Grafana', 'monitoring logs logging observability dashboard'],
        ],
      ],
    ],
  ],
  [
    'process',
    [
      [
        'methods',
        [
          [
            l('Projektmanagement', 'Project management'),
            'projekt project planung planning management pm',
          ],
          [
            'Scrum',
            'agil agile sprint daily retro retrospektive projektmanagement',
          ],
          [
            'BPMN',
            'prozessmodellierung process modelling camunda workflow geschäftsprozess business process',
          ],
        ],
      ],
      [
        'team-tools',
        [
          ['Jira', 'atlassian tickets issues boards projektmanagement'],
          ['Confluence', 'atlassian wiki dokumentation documentation'],
          ['Bitbucket', 'atlassian git repository versionierung'],
          ['Azure DevOps', 'microsoft tickets boards repos pipelines'],
        ],
      ],
      [
        'consulting',
        [
          [
            l('Beratung', 'Consulting'),
            'consulting digitalisierung digitalisation it-beratung konzept concept',
          ],
          [
            l('Prozesskonzeption', 'Process design'),
            'prozess process konzept concept digitalisierung workflow',
          ],
        ],
      ],
    ],
  ],
];
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/#/g, 'sharp')
    .replace(/\+/g, 'p')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export const skills = z.array(skillSchema).parse(
  skillTree.flatMap(([category, groups]) =>
    groups.flatMap(([subgroup, items]) =>
      items.map(([name, keywords]) => {
        const label = typeof name === 'string' ? l(name, name) : name;
        return {
          id: slug(label.en),
          name: label,
          category,
          subgroup,
          keywords,
        };
      }),
    ),
  ),
);
/** Search suggestions shown as chips above the skill grid. */
export const skillSuggestions = [
  l('JS-Framework', 'JS framework'),
  l('Datenbank', 'Database'),
  l('Shop', 'Shop'),
  l('CMS', 'CMS'),
  l('KI', 'AI'),
  l('CI/CD', 'CI/CD'),
  l('Test', 'Test'),
  l('Windows', 'Windows'),
];
/**
 * Searchable text for a skill: names, sub-group labels and synonyms. Area
 * labels stay out on purpose: "Datenbank" must not match every data format.
 */
export function skillSearchText(skill: Skill) {
  return [
    skill.name.de,
    skill.name.en,
    skillSubgroups[skill.subgroup].de,
    skillSubgroups[skill.subgroup].en,
    skill.keywords,
  ].join(' ');
}
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
    .enum(['client', 'employer', 'own', 'demo', 'study', 'development'])
    .default('own'),
  careerId: z.string().optional(),
  /** Featured projects open their group and span the full grid width. */
  featured: z.boolean().default(false),
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
  /** Short headline for the drawn cover of a project without a screenshot. */
  cover: z.string().optional(),
  github: z.url().optional(),
  website: z.url().optional(),
});
export type Project = z.infer<typeof projectSchema>;
// Only individually approved records belong here. Research stays outside Git.
export const projects: Project[] = z.array(projectSchema).parse([
  {
    id: 'tds-hauptwebsite',
    kind: 'own',
    imageWidth: 1000,
    imageHeight: 625,
    careerId: 'tracht-digital-solutions',
    approved: true,
    image: '/images/tds-hauptwebsite-2611e.webp',
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
    image: '/images/td-tools-2611e.webp',
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
  ...additionalProjects,
]);
/** Display order of the project groups on the overview page. */
export const projectKinds = {
  client: l('Kundenprojekt', 'Client project'),
  employer: l('Berufliches Projekt', 'Employment project'),
  own: l('Eigenes Projekt', 'Own project'),
  demo: l('Demo', 'Demo'),
  study: l('Designstudie', 'Design study'),
  development: l('In Entwicklung', 'In development'),
};
/** Section headings and one-line intros for the grouped project overview. */
export const projectGroups: Record<
  keyof typeof projectKinds,
  { title: ReturnType<typeof l>; intro: ReturnType<typeof l> }
> = {
  client: {
    title: l('Kundenprojekte', 'Client projects'),
    intro: l(
      'Aufträge als Selbstständiger. Kunden ohne Freigabe bleiben anonym, ohne Zeitraum und ohne Zuordnung.',
      'Freelance engagements. Clients without consent stay anonymous, without dates or attribution.',
    ),
  },
  employer: {
    title: l('Berufliche Projekte', 'Employment projects'),
    intro: l(
      'Aus meinen Anstellungen und der Ausbildung.',
      'From my employment and apprenticeship.',
    ),
  },
  own: {
    title: l('Eigene Projekte & Open Source', 'Own projects & open source'),
    intro: l(
      'Eigene Produkte, Werkzeuge und Open-Source-Projekte.',
      'My own products, tools and open-source projects.',
    ),
  },
  development: {
    title: l('In Entwicklung', 'In development'),
    intro: l(
      'Laufende Vorhaben mit offenem Stand. Der jeweilige Reifegrad steht auf der Karte.',
      'Ongoing work with an open status. Each card states its maturity.',
    ),
  },
  demo: {
    title: l('Demos', 'Demos'),
    intro: l(
      'Fiktive Unternehmen, um Gestaltung und Technik zu zeigen.',
      'Fictional businesses that show design and technology.',
    ),
  },
  study: {
    title: l('Designstudien', 'Design studies'),
    intro: l(
      'Gestaltungsentwürfe ohne Kundenauftrag.',
      'Design concepts without a client brief.',
    ),
  },
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

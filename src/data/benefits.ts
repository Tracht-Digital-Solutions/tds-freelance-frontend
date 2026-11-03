import { z } from 'zod';
import { l, localized, type Locale } from './content';

// What each Tracht Digital Solutions service changes in a business. Situations
// and outcomes mirror the main site's service catalogue (tds-landingpage-frontend
// src/lib/services.ts); keep them in step and never add unverified figures.
const serviceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: localized,
  before: localized,
  outcomes: z.array(localized).length(3),
  path: z.object({ de: z.string(), en: z.string() }),
});

export const serviceBenefits = z.array(serviceSchema).parse([
  {
    id: 'workflows',
    title: l('Abläufe digitalisieren', 'Digitalizing workflows'),
    before: l(
      'Dieselben Daten werden mehrfach eingetippt, Belege wandern auf Papier oder per Mail.',
      'The same data gets typed in more than once, receipts travel on paper or by email.',
    ),
    outcomes: [
      l('Keine doppelte Dateneingabe mehr', 'No more double data entry'),
      l('Weniger Fehler durch Handarbeit', 'Fewer mistakes from manual work'),
      l(
        'Mehr Zeit für die eigentliche Arbeit',
        'More time for the actual work',
      ),
    ],
    path: {
      de: '/leistungen/prozessoptimierung',
      en: '/en/services/process-optimization',
    },
  },
  {
    id: 'automation',
    title: l('Automatisierung & Schnittstellen', 'Automation & integrations'),
    before: l(
      'Jeden Tag werden dieselben Schritte geklickt, mehrere Programme arbeiten nicht zusammen.',
      'The same steps are clicked every day, and several programs do not work together.',
    ),
    outcomes: [
      l(
        'Stumpfe Handarbeit erledigt ein Skript',
        'A script does the dull manual work',
      ),
      l('Die Programme arbeiten zusammen', 'The programs work together'),
      l(
        'Lesbarer, dokumentierter Quellcode',
        'Readable, documented source code',
      ),
    ],
    path: {
      de: '/leistungen/individuelle-loesungen',
      en: '/en/services/tailored-solutions',
    },
  },
  {
    id: 'portals',
    title: l(
      'Kundenportale & Verwaltungspanels',
      'Customer portals & admin panels',
    ),
    before: l(
      'Aufträge und Kundendaten liegen verteilt in Tabellen, Mails und Ordnern.',
      'Orders and customer data are spread across spreadsheets, emails and folders.',
    ),
    outcomes: [
      l('Der aktuelle Stand auf einen Blick', 'Where things stand at a glance'),
      l(
        'Alle wichtigen Informationen an einem Ort, auch mobil',
        'All important information in one place, on mobile too',
      ),
      l(
        'Kunden erledigen Anfragen selbst im Portal',
        'Customers handle requests themselves in the portal',
      ),
    ],
    path: {
      de: '/leistungen/kundenportale',
      en: '/en/services/customer-portals',
    },
  },
  {
    id: 'web',
    title: l('Websites & Onlineshops', 'Websites & online shops'),
    before: l(
      'Die Seite wirkt austauschbar oder veraltet, und kaum jemand fragt an.',
      'The site feels interchangeable or outdated, and hardly anyone gets in touch.',
    ),
    outcomes: [
      l(
        'Besucher verstehen sofort das Angebot',
        'Visitors understand the offer straight away',
      ),
      l(
        'Gefunden werden, bei Google und in KI-Antworten',
        'Being found, on Google and in AI answers',
      ),
      l(
        'Shop, PIM und ERP tauschen Daten automatisch aus',
        'Shop, PIM and ERP exchange data automatically',
      ),
    ],
    path: { de: '/leistungen/webauftritt', en: '/en/services/web-presence' },
  },
  {
    id: 'consulting',
    title: l('Beratung & Konzeption', 'Consulting & planning'),
    before: l(
      'Es gibt viele Ideen, aber keine Reihenfolge, und die Kosten sind unklar.',
      'There are plenty of ideas but no order to them, and the costs are unclear.',
    ),
    outcomes: [
      l('Ein klarer Startpunkt', 'A clear starting point'),
      l(
        'Die Kosten sind bekannt, bevor entschieden wird',
        'Costs are known before deciding',
      ),
      l(
        'Teure Fehlentscheidungen werden vermieden',
        'Expensive wrong turns are avoided',
      ),
    ],
    path: {
      de: '/leistungen/beratung-konzeption',
      en: '/en/services/consulting-planning',
    },
  },
]);

export const serviceUrl = (path: string) => `https://tracht-digital.de${path}`;

export const benefitsCopy = {
  label: l('Was es konkret bringt', 'What it changes in practice'),
  title: l(
    'Weniger Handarbeit. Mehr Zeit für das Wesentliche.',
    'Less manual work. More time for what matters.',
  ),
  intro: l(
    'Ich setze dort an, wo im Alltag Zeit verloren geht: bei doppelten Eingaben, verstreuten Informationen und Klickarbeit, die sich jeden Tag wiederholt. So verändern die Leistungen von Tracht Digital Solutions den Betrieb.',
    'I start where everyday time gets lost: double data entry, scattered information and clicks repeated every day. This is how the Tracht Digital Solutions services change a business.',
  ),
  before: l('Ausgangslage', 'Starting point'),
  after: l('Danach', 'Afterwards'),
  more: l('Zur Leistung', 'View service'),
};

export const calculatorCopy = {
  label: l('Zeitersparnis-Rechner', 'Time-savings calculator'),
  title: l(
    'Wie viele Stunden ein automatisierter Ablauf freimacht',
    'How many hours an automated task frees up',
  ),
  intro: l(
    'Ein Ablauf genügt: zum Beispiel Bestellungen übertragen, Rechnungen erfassen oder Statusmails schreiben. Die Felder enthalten Beispielwerte und lassen sich mit eigenen Zahlen überschreiben.',
    'One task is enough: copying orders, entering invoices or writing status emails, for example. The fields hold example values and can be replaced with real figures.',
  ),
  minutes: l('Minuten pro Vorgang', 'Minutes per task'),
  perWeek: l('Vorgänge pro Woche', 'Tasks per week'),
  share: l('Anteil, der wegfällt (%)', 'Share that disappears (%)'),
  month: l('Stunden pro Monat', 'hours per month'),
  year: l('Stunden pro Jahr', 'hours per year'),
  days: l('Arbeitstage pro Jahr', 'working days per year'),
  formula: l(
    'Rechnung: Minuten × Vorgänge pro Woche × Anteil × 46 Arbeitswochen. Ein Arbeitstag hat 8 Stunden.',
    'Calculation: minutes × tasks per week × share × 46 working weeks. A working day has 8 hours.',
  ),
  note: l(
    'Das Ergebnis rechnet nur mit den eingegebenen Werten und ist keine Zusage. Eine belastbare Zahl entsteht erst, wenn der konkrete Ablauf angesehen wurde.',
    'The result only uses the values entered and is not a promise. A reliable figure only comes from looking at the actual task.',
  ),
  cta: l('Ablauf besprechen', 'Discuss a task'),
};

export const faqCopy = {
  label: l('Häufige Fragen', 'Frequently asked questions'),
  title: l('Kurz beantwortet', 'Answered briefly'),
};

export const faq = z
  .array(z.object({ q: localized, a: localized }))
  .min(1)
  .parse([
    {
      q: l(
        'Was bietet Julian Tracht als Freelancer an?',
        'What does Julian Tracht offer as a freelancer?',
      ),
      a: l(
        'Ich entwickle über Tracht Digital Solutions individuelle Software und Weblösungen: Abläufe digitalisieren, Automatisierungen und Schnittstellen, Kundenportale, Websites und Onlineshops sowie Beratung und Konzeption. Projekte begleite ich von der Anforderung bis zur Einführung.',
        'Through Tracht Digital Solutions I build custom software and web solutions: digitalizing workflows, automation and integrations, customer portals, websites and online shops, plus consulting and planning. I guide projects from the requirements to the rollout.',
      ),
    },
    {
      q: l(
        'Welche Technologien setzt er ein?',
        'Which technologies does he use?',
      ),
      a: l(
        'Schwerpunkte sind C# und .NET, TypeScript, Vue und React sowie REST-Schnittstellen. Im E-Commerce arbeite ich mit Shopware 6, WooCommerce und Magento 2 und binde PIM- und ERP-Systeme an.',
        'The focus is C# and .NET, TypeScript, Vue and React, and REST APIs. In e-commerce I work with Shopware 6, WooCommerce and Magento 2 and connect PIM and ERP systems.',
      ),
    },
    {
      q: l(
        'Wie viel Zeit spart eine Automatisierung?',
        'How much time does automation save?',
      ),
      a: l(
        'Das hängt vom Ablauf ab: wie lange ein Vorgang dauert, wie oft er vorkommt und welcher Anteil wegfällt. Der Zeitersparnis-Rechner auf dieser Seite macht das mit eigenen Zahlen sichtbar. Ein Beispiel: 10 Minuten, 25-mal pro Woche, davon 70 Prozent automatisiert, ergibt rund 134 Stunden im Jahr.',
        'It depends on the task: how long it takes, how often it happens and what share disappears. The time-savings calculator on this page shows it with real figures. An example: 10 minutes, 25 times a week, 70 percent automated, comes to about 134 hours a year.',
      ),
    },
    {
      q: l('Wie läuft ein Projekt ab?', 'How does a project work?'),
      a: l(
        'In vier Schritten: verstehen, gestalten, entwickeln, prüfen. Zuerst kommen Anforderungen, Menschen und bestehende Abläufe. Danach folgen Architektur und Umsetzung, zum Schluss Tests und Einführung.',
        'In four steps: understand, design, develop, validate. Requirements, people and existing processes come first. Architecture and implementation follow, then testing and rollout.',
      ),
    },
    {
      q: l(
        'Wie setzt er KI in der Entwicklung ein?',
        'How does he use AI in development?',
      ),
      a: l(
        'KI beschleunigt die Entwicklung, die Verantwortung bleibt bei mir. Der Maßstab ändert sich nicht: Code muss zur Aufgabe passen, verstanden werden und überprüfbar sein.',
        'AI speeds up development, but the responsibility stays with me. The standard does not change: code has to fit the task, be understood and be verifiable.',
      ),
    },
    {
      q: l('Wie nimmt man Kontakt auf?', 'How do I get in touch?'),
      a: l(
        'Über das Kontaktformular auf tracht-digital.de oder per E-Mail an kontakt@tracht-digital.de. Ich arbeite aus Schwarzenbek bei Hamburg.',
        'Through the contact form on tracht-digital.de or by email to kontakt@tracht-digital.de. I work from Schwarzenbek near Hamburg.',
      ),
    },
  ]);

export const faqFor = (lang: Locale) =>
  faq.map((item) => ({ q: item.q[lang], a: item.a[lang] }));

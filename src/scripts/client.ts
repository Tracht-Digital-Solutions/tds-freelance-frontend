import {
  applyThemePreference,
  currentTheme,
  readThemePreference,
} from '@tracht-digital-solutions/tds-shared/theme';
import {
  rememberLocale,
  readPrefs,
} from '@tracht-digital-solutions/tds-shared/prefs';
import { navigate } from 'astro:transitions/client';
/**
 * Lower-case, fold diacritics and turn separators into spaces, keeping the
 * characters that carry meaning in technology names (C#, C++, .NET).
 * "JS-Framework" and "js framework" therefore search identically.
 */
function normalize(value: string) {
  return value
    .toLocaleLowerCase(document.documentElement.lang)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ß/g, 'ss')
    .replace(/[^\p{L}\p{N}#+.]+/gu, ' ')
    .replace(/(^|\s)\.(?=\s|$)/g, ' ')
    .trim();
}
/**
 * Tokens of one or two characters ("KI", "AI", "JS", "C#") must start a word,
 * so they do not hit inside unrelated words ("wiki", "daily"). Longer tokens
 * match anywhere; German plural endings are tolerated.
 */
function matchesToken(text: string, token: string) {
  if (token.length <= 2) return ` ${text}`.includes(` ${token}`);
  if (text.includes(token)) return true;
  if (token.length < 6) return false;
  const stem = token.replace(/(en|n|e|s)$/, '');
  return stem !== token && text.includes(stem);
}
/** Marks the section currently in view in each `.section-nav`. */
let sectionObserver: IntersectionObserver | undefined;
function trackSections() {
  sectionObserver?.disconnect();
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('.section-nav a[href^="#"]'),
  );
  if (!links.length || !('IntersectionObserver' in window)) return;
  const visible = new Set<string>();
  const mark = () => {
    const current = links.find(
      (link) => !link.hidden && visible.has(link.hash.slice(1)),
    );
    links.forEach((link) =>
      link === current
        ? link.setAttribute('aria-current', 'location')
        : link.removeAttribute('aria-current'),
    );
  };
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting
          ? visible.add(entry.target.id)
          : visible.delete(entry.target.id),
      );
      mark();
    },
    { rootMargin: '-20% 0px -60% 0px' },
  );
  links.forEach((link) => {
    const target = document.getElementById(link.hash.slice(1));
    if (target) sectionObserver!.observe(target);
  });
}
function initialize() {
  trackSections();
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData || navigator.hardwareConcurrency < 4)
    document.documentElement.dataset.motion = 'low';

  const theme = document.querySelector<HTMLButtonElement>('.theme-toggle');
  if (theme) {
    theme.hidden = false;
    theme.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    theme.onclick = () => {
      applyThemePreference(currentTheme() === 'dark' ? 'light' : 'dark');
      theme.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    };
  }
  document.querySelectorAll<HTMLAnchorElement>('[data-locale]').forEach((a) => {
    a.onclick = () => {
      // The slider moves on the press itself, never on hover.
      a.querySelector<HTMLElement>('.lang-switch')?.setAttribute(
        'data-current',
        a.dataset.locale!,
      );
      rememberLocale(a.dataset.locale as 'de' | 'en');
      try {
        localStorage.setItem('jt-locale', a.dataset.locale!);
      } catch {
        /* Storage is optional. */
      }
    };
  });
  document
    .querySelectorAll<HTMLElement>('[data-filter-scope]')
    .forEach((scope) => {
      const panel = scope.querySelector<HTMLElement>('[data-filter-panel]');
      if (panel) panel.hidden = false;
      const items = Array.from(
        scope.querySelectorAll<HTMLElement>('[data-filter-item]'),
      );
      const search = scope.querySelector<HTMLInputElement>('[data-search]');
      const selects = Array.from(
        scope.querySelectorAll<HTMLSelectElement>('select'),
      );
      // Pre-normalise every item once; the query is matched token by token.
      const haystacks = new Map(
        items.map((item) => [item, normalize(item.dataset.searchText ?? '')]),
      );
      const update = () => {
        const tokens = normalize(search?.value ?? '')
          .split(' ')
          .filter(Boolean);
        let count = 0;
        items.forEach((item) => {
          const text = haystacks.get(item)!;
          const matches =
            tokens.every((token) => matchesToken(text, token)) &&
            selects.every(
              (s) =>
                s.value === 'all' ||
                item.dataset[
                  ['category', 'context', 'kind'].find((key) =>
                    s.hasAttribute(`data-${key}`),
                  )!
                ] === s.value,
            );
          item.hidden = !matches;
          if (matches) count++;
        });
        // Headings of groups whose items are all filtered out disappear too.
        scope
          .querySelectorAll<HTMLElement>('[data-filter-group]')
          .forEach((group) => {
            group.hidden = !group.querySelector(
              '[data-filter-item]:not([hidden])',
            );
          });
        // The area index only offers jumps to areas that still have hits.
        scope
          .querySelectorAll<HTMLAnchorElement>('.section-nav a[href^="#"]')
          .forEach((link) => {
            link.hidden = !!scope.querySelector<HTMLElement>(link.hash)?.hidden;
          });
        const result = scope.querySelector<HTMLElement>('[data-filter-count]');
        if (result)
          result.textContent = `${count} / ${items.length} ${scope.dataset.countLabel ?? 'entries'}`;
        const empty = scope.querySelector<HTMLElement>('[data-no-results]');
        if (empty) empty.hidden = count !== 0;
      };
      if (search) search.oninput = update;
      selects.forEach((s) => (s.onchange = update));
      scope
        .querySelectorAll<HTMLButtonElement>('[data-search-suggestion]')
        .forEach((chip) => {
          chip.onclick = () => {
            if (!search) return;
            search.value = chip.dataset.searchSuggestion!;
            update();
            search.focus();
          };
        });
      const reset = scope.querySelector<HTMLButtonElement>('.reset-filter');
      if (reset)
        reset.onclick = () => {
          if (search) search.value = '';
          selects.forEach((s) => (s.value = 'all'));
          update();
        };
      update();
    });
  document
    .querySelectorAll<HTMLButtonElement>('[data-dialog-target]')
    .forEach((button) => {
      button.hidden = false;
      button.onclick = () => {
        const dialog = document.getElementById(
          button.dataset.dialogTarget!,
        ) as HTMLDialogElement;
        dialog.showModal();
      };
    });
  document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dialog) => {
    const close = dialog.querySelector<HTMLButtonElement>(
      '[data-close-dialog]',
    );
    if (close) close.onclick = () => dialog.close();
    dialog.onclick = (e) => {
      if (e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          dialog.close();
      }
    };
  });
}
document.addEventListener('astro:page-load', initialize);
document.addEventListener('astro:before-swap', (event) => {
  const next = (event as Event & { newDocument: Document }).newDocument;
  next.documentElement.dataset.theme = currentTheme();
});
let isNavigation = false;
document.addEventListener('astro:before-preparation', () => {
  isNavigation = true;
});
document.addEventListener('astro:page-load', () => {
  if (isNavigation) {
    document
      .querySelector<HTMLElement>('#main')
      ?.focus({ preventScroll: true });
    isNavigation = false;
  }
});
// Only the ambiguous root entry may negotiate language; explicit deep links win.
try {
  if (location.pathname === '/') {
    const preference = localStorage.getItem('jt-locale') || readPrefs().locale;
    const checked = sessionStorage.getItem('jt-language-checked');
    sessionStorage.setItem('jt-language-checked', '1');
    const chosen =
      preference ||
      (!checked && navigator.language.toLowerCase().startsWith('en')
        ? 'en'
        : 'de');
    if (chosen === 'en') void navigate('/en/', { history: 'replace' });
  }
} catch {
  /* Without storage the requested HTML language remains authoritative. */
}
// Follow OS changes while there is no explicit selection.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (readThemePreference() === 'system') {
    applyThemePreference('system', { announce: false });
    document
      .querySelector('.theme-toggle')
      ?.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
  }
});

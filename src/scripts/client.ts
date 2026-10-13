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
function initialize() {
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
      const update = () => {
        const query = (search?.value ?? '')
          .trim()
          .toLocaleLowerCase(document.documentElement.lang);
        let count = 0;
        items.forEach((item) => {
          const matches =
            (item.dataset.searchText ?? '')
              .toLocaleLowerCase(document.documentElement.lang)
              .includes(query) &&
            selects.every(
              (s) =>
                s.value === 'all' ||
                item.dataset[
                  s.hasAttribute('data-category')
                    ? 'category'
                    : s.hasAttribute('data-context')
                      ? 'context'
                      : 'level'
                ] === s.value,
            );
          item.hidden = !matches;
          if (matches) count++;
        });
        const result = scope.querySelector<HTMLElement>('[data-filter-count]');
        if (result)
          result.textContent = `${count} / ${items.length} ${scope.dataset.countLabel ?? 'entries'}`;
        const empty = scope.querySelector<HTMLElement>('[data-no-results]');
        if (empty) empty.hidden = count !== 0;
      };
      if (search) search.oninput = update;
      selects.forEach((s) => (s.onchange = update));
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

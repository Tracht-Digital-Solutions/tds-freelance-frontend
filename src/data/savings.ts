// Time-savings arithmetic shared by the static render and the browser script.
// Kept free of imports so the client bundle stays small.
export const WORK_WEEKS = 46;
export const WORKDAY_HOURS = 8;
export const savingsDefaults = { minutes: 10, perWeek: 25, share: 70 };

export interface SavingsInput {
  minutes: number;
  perWeek: number;
  share: number;
}

const clamp = (value: number, max: number) =>
  Number.isFinite(value) ? Math.min(Math.max(value, 0), max) : 0;

export function savings({ minutes, perWeek, share }: SavingsInput) {
  const weekly =
    (clamp(minutes, 600) * clamp(perWeek, 5000) * clamp(share, 100)) / 100 / 60;
  const year = weekly * WORK_WEEKS;
  return { year, month: year / 12, days: year / WORKDAY_HOURS };
}

export function formatHours(value: number, lang: string) {
  return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    maximumFractionDigits: value < 100 ? 1 : 0,
  }).format(value);
}

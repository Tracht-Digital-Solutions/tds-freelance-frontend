import source from './editorial.json' with { type: 'json' };
import { z } from 'zod';
import type { Locale } from './content';
const strings = z
  .record(
    z.string(),
    z.object({ de: z.string().min(1), en: z.string().min(1) }),
  )
  .parse(source);
export function copy(key: keyof typeof source, lang: Locale) {
  return strings[key][lang];
}

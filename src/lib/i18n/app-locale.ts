import { z } from 'zod';

export const appLocaleSchema = z.enum(['ja', 'en']);

export type AppLocale = z.infer<typeof appLocaleSchema>;

export function parseAppLocale(value: string | null): AppLocale | null {
  const r = appLocaleSchema.safeParse(value);
  return r.success ? r.data : null;
}

import { describe, expect, test } from 'vitest';

import { formatIsoDateForLocale } from '@/lib/utils/format-iso-date';

describe('formatIsoDateForLocale', () => {
  test('returns non-ISO strings unchanged', () => {
    expect(formatIsoDateForLocale('2026/3/20', 'ja')).toBe('2026/3/20');
    expect(formatIsoDateForLocale('bad', 'en')).toBe('bad');
  });

  test('returns invalid calendar dates unchanged', () => {
    expect(formatIsoDateForLocale('2026-02-30', 'ja')).toBe('2026-02-30');
  });

  test('formats valid dates with year and day present', () => {
    const ja = formatIsoDateForLocale('2026-03-20', 'ja');
    expect(ja).toContain('2026');
    expect(ja).toContain('20');

    const en = formatIsoDateForLocale('2026-03-20', 'en');
    expect(en).toContain('2026');
    expect(en).toContain('20');
  });
});

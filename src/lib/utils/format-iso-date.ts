import type { AppLocale } from '@/lib/i18n/app-locale';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * `YYYY-MM-DD` をロケール向けの日付表記にする（タイムゾーンずれを避けるためローカル日として解釈）。
 */
export function formatIsoDateForLocale(
  isoDate: string,
  locale: AppLocale
): string {
  if (!ISO_DATE.test(isoDate)) {
    return isoDate;
  }
  const [ys, ms, ds] = isoDate.split('-');
  const y = Number(ys);
  const m = Number(ms);
  const d = Number(ds);
  if (
    !(Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d)) ||
    m < 1 ||
    m > 12 ||
    d < 1 ||
    d > 31
  ) {
    return isoDate;
  }
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return isoDate;
  }
  return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

import type { AppLocale } from '@/lib/i18n/app-locale';
import type { AntipickEntry, HeroProfile } from '@/lib/services/game-data';

export const ANTIPICK_SORT_MODES = ['data', 'strength', 'role'] as const;

export type AntipickSortMode = (typeof ANTIPICK_SORT_MODES)[number];

export const ANTIPICK_SORT_DIRECTIONS = ['asc', 'desc'] as const;

export type AntipickSortDirection = (typeof ANTIPICK_SORT_DIRECTIONS)[number];

function strengthSortRank(strength: string | undefined): number {
  if (strength === 'strong') {
    return 0;
  }
  if (strength === 'situational') {
    return 1;
  }
  return 2;
}

function roleSortRank(role: string | undefined, locale: AppLocale): number {
  if (!role) {
    return 99;
  }
  if (locale === 'ja') {
    const order = ['タンク', 'ダメージ', 'サポート'] as const;
    const i = order.indexOf(role as (typeof order)[number]);
    return i === -1 ? 50 : i;
  }
  const normalized = role.toLowerCase();
  const order = ['tank', 'damage', 'support'] as const;
  const i = order.indexOf(normalized as (typeof order)[number]);
  return i === -1 ? 50 : i;
}

/**
 * アンチピック一覧の並べ替え。
 * `data` + `asc` は入力順、`data` + `desc` はその逆順。
 */
export function sortAntipickEntries(
  entries: Array<AntipickEntry>,
  heroes: Record<string, HeroProfile>,
  mode: AntipickSortMode,
  locale: AppLocale,
  direction: AntipickSortDirection = 'asc'
): Array<AntipickEntry> {
  const dir = direction === 'asc' ? 1 : -1;
  if (mode === 'data') {
    if (direction === 'asc') {
      return entries;
    }
    return [...entries].reverse();
  }
  const indexed = entries.map((entry, index) => ({ entry, index }));
  if (mode === 'strength') {
    return [...indexed]
      .sort((a, b) => {
        const da = strengthSortRank(a.entry.strength);
        const db = strengthSortRank(b.entry.strength);
        if (da !== db) {
          return dir * (da - db);
        }
        return dir * (a.index - b.index);
      })
      .map(({ entry }) => entry);
  }
  return [...indexed]
    .sort((a, b) => {
      const ra = roleSortRank(heroes[a.entry.id]?.role, locale);
      const rb = roleSortRank(heroes[b.entry.id]?.role, locale);
      if (ra !== rb) {
        return dir * (ra - rb);
      }
      return dir * (a.index - b.index);
    })
    .map(({ entry }) => entry);
}

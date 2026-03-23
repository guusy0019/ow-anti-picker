import type { AppLocale } from '@/lib/i18n/app-locale';

import type { HeroRoleSection } from './hero-grouping';

export const HERO_ROLE_FILTER_VALUES = [
  'all',
  'tank',
  'damage',
  'support',
] as const;

export type HeroRoleFilter = (typeof HERO_ROLE_FILTER_VALUES)[number];

function expectedRoleLabel(
  filter: Exclude<HeroRoleFilter, 'all'>,
  locale: AppLocale
): string {
  if (locale === 'ja') {
    const ja: Record<Exclude<HeroRoleFilter, 'all'>, string> = {
      tank: 'タンク',
      damage: 'ダメージ',
      support: 'サポート',
    };
    return ja[filter];
  }
  return filter;
}

/**
 * `hero-*.json` の `role` 文字列（言語依存）と一致するグループだけ残す。
 */
export function filterHeroRoleSections(
  sections: Array<HeroRoleSection>,
  filter: HeroRoleFilter,
  locale: AppLocale
): Array<HeroRoleSection> {
  if (filter === 'all') {
    return sections;
  }
  const want = expectedRoleLabel(filter, locale);
  return sections.filter((g) => g.role === want);
}

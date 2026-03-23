import type { AppLocale } from '@/lib/i18n/app-locale';
import type { HeroProfile } from '@/lib/services/game-data';

export type HeroSubroleSection = {
  subrole: string;
  heroIds: Array<string>;
};

export type HeroRoleSection = {
  role: string;
  sections: Array<HeroSubroleSection>;
};

function roleSortOrder(role: string, locale: AppLocale): number {
  if (locale === 'ja') {
    if (role === 'タンク') {
      return 0;
    }
    if (role === 'ダメージ') {
      return 1;
    }
    if (role === 'サポート') {
      return 2;
    }
    return 99;
  }
  if (role === 'tank') {
    return 0;
  }
  if (role === 'damage') {
    return 1;
  }
  if (role === 'support') {
    return 2;
  }
  return 99;
}

/**
 * ヒーローをロール → サブロールの階層で並べ、各ブロック内の ID は表示名でソートする。
 */
export function groupHeroesByRoleAndSubrole(
  heroes: Record<string, HeroProfile>,
  locale: AppLocale
): Array<HeroRoleSection> {
  const byRole = new Map<string, Map<string, Array<string>>>();

  for (const [id, profile] of Object.entries(heroes)) {
    const { role, subrole } = profile;
    let bySub = byRole.get(role);
    if (!bySub) {
      bySub = new Map();
      byRole.set(role, bySub);
    }
    let list = bySub.get(subrole);
    if (!list) {
      list = [];
      bySub.set(subrole, list);
    }
    list.push(id);
  }

  const collator = locale === 'ja' ? 'ja' : 'en';

  for (const subMap of byRole.values()) {
    for (const ids of subMap.values()) {
      ids.sort((a, b) =>
        heroes[a].name.localeCompare(heroes[b].name, collator)
      );
    }
  }

  const sortedRoles = [...byRole.keys()].sort((a, b) => {
    const ra = roleSortOrder(a, locale);
    const rb = roleSortOrder(b, locale);
    if (ra !== rb) {
      return ra - rb;
    }
    return a.localeCompare(b, collator);
  });

  return sortedRoles.map((role) => {
    const subMap = byRole.get(role);
    if (!subMap) {
      return { role, sections: [] };
    }
    const sortedSubroles = [...subMap.keys()].sort((a, b) =>
      a.localeCompare(b, collator)
    );
    return {
      role,
      sections: sortedSubroles.map((subrole) => ({
        subrole,
        heroIds: subMap.get(subrole) ?? [],
      })),
    };
  });
}

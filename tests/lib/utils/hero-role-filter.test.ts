import { describe, expect, it } from 'vitest';

import type { HeroRoleSection } from '@/lib/utils/hero-grouping';
import { filterHeroRoleSections } from '@/lib/utils/hero-role-filter';

const tankGroup: HeroRoleSection = {
  role: 'tank',
  sections: [{ subrole: 'A', heroIds: ['x'] }],
};
const dmgGroup: HeroRoleSection = {
  role: 'damage',
  sections: [{ subrole: 'B', heroIds: ['y'] }],
};

describe('filterHeroRoleSections', () => {
  it('returns all sections when filter is all', () => {
    expect(filterHeroRoleSections([tankGroup, dmgGroup], 'all', 'en')).toEqual([
      tankGroup,
      dmgGroup,
    ]);
  });

  it('filters by en role label', () => {
    expect(filterHeroRoleSections([tankGroup, dmgGroup], 'tank', 'en')).toEqual(
      [tankGroup]
    );
  });

  it('filters by ja role label', () => {
    const jaTank: HeroRoleSection = {
      role: 'タンク',
      sections: [{ subrole: 'イニシエーター', heroIds: ['dva'] }],
    };
    const jaDmg: HeroRoleSection = {
      role: 'ダメージ',
      sections: [{ subrole: 'フランカー', heroIds: ['genji'] }],
    };
    expect(filterHeroRoleSections([jaTank, jaDmg], 'damage', 'ja')).toEqual([
      jaDmg,
    ]);
  });
});

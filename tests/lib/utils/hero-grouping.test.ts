import { describe, expect, it } from 'vitest';

import type { HeroProfile } from '@/lib/services/game-data';
import { groupHeroesByRoleAndSubrole } from '@/lib/utils/hero-grouping';

const tankA: HeroProfile = {
  name: 'Alpha',
  role: 'tank',
  subrole: 'Bruiser',
};
const tankB: HeroProfile = {
  name: 'Beta',
  role: 'tank',
  subrole: 'Anchor',
};
const dmg: HeroProfile = {
  name: 'Gamma',
  role: 'damage',
  subrole: 'Flanker',
};

describe('groupHeroesByRoleAndSubrole', () => {
  it('returns empty array for empty heroes', () => {
    expect(groupHeroesByRoleAndSubrole({}, 'en')).toEqual([]);
  });

  it('orders roles tank then damage then support (en)', () => {
    const heroes: Record<string, HeroProfile> = {
      z: tankA,
      a: dmg,
    };
    const groups = groupHeroesByRoleAndSubrole(heroes, 'en');
    expect(groups.map((g) => g.role)).toEqual(['tank', 'damage']);
  });

  it('orders tank, damage, support when all present (en)', () => {
    const heroes: Record<string, HeroProfile> = {
      s: { name: 'S', role: 'support', subrole: 'Medic' },
      d: dmg,
      t: tankA,
    };
    expect(
      groupHeroesByRoleAndSubrole(heroes, 'en').map((g) => g.role)
    ).toEqual(['tank', 'damage', 'support']);
  });

  it('groups by subrole and sorts hero names within each group', () => {
    const heroes: Record<string, HeroProfile> = {
      t2: { ...tankB, name: 'Zed' },
      t1: { ...tankB, name: 'Ann' },
      t3: tankA,
    };
    const groups = groupHeroesByRoleAndSubrole(heroes, 'en');
    expect(groups).toHaveLength(1);
    expect(groups[0].sections).toHaveLength(2);
    const anchor = groups[0].sections.find((s) => s.subrole === 'Anchor');
    expect(anchor?.heroIds).toEqual(['t1', 't2']);
  });

  it('sorts subrole labels alphabetically (en)', () => {
    const heroes: Record<string, HeroProfile> = {
      x: tankB,
      y: tankA,
    };
    const groups = groupHeroesByRoleAndSubrole(heroes, 'en');
    expect(groups[0].sections.map((s) => s.subrole)).toEqual([
      'Anchor',
      'Bruiser',
    ]);
  });
});

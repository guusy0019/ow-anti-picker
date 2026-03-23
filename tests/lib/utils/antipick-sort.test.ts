import { describe, expect, test } from 'vitest';

import type { AntipickEntry, HeroProfile } from '@/lib/services/game-data';
import { sortAntipickEntries } from '@/lib/utils/antipick-sort';

const heroesJa: Record<string, HeroProfile> = {
  a: { name: 'A', role: 'サポート', subrole: 'x' },
  b: { name: 'B', role: 'タンク', subrole: 'x' },
  c: { name: 'C', role: 'ダメージ', subrole: 'x' },
};

const heroesEn: Record<string, HeroProfile> = {
  a: { name: 'A', role: 'support', subrole: 'x' },
  b: { name: 'B', role: 'tank', subrole: 'x' },
  c: { name: 'C', role: 'damage', subrole: 'x' },
};

describe('sortAntipickEntries', () => {
  test('data mode keeps order', () => {
    const entries: Array<AntipickEntry> = [
      { id: 'c', strength: 'strong' },
      { id: 'a', strength: 'situational' },
      { id: 'b' },
    ];
    expect(
      sortAntipickEntries(entries, heroesJa, 'data', 'ja').map((e) => e.id)
    ).toEqual(['c', 'a', 'b']);
  });

  test('strength mode orders strong then situational then other', () => {
    const entries: Array<AntipickEntry> = [
      { id: 'a', strength: 'situational' },
      { id: 'b', strength: 'strong' },
      { id: 'c' },
      { id: 'd', strength: 'strong' },
    ];
    expect(
      sortAntipickEntries(entries, heroesJa, 'strength', 'ja').map((e) => e.id)
    ).toEqual(['b', 'd', 'a', 'c']);
  });

  test('role mode orders tank damage support in ja', () => {
    const entries: Array<AntipickEntry> = [
      { id: 'a' },
      { id: 'c' },
      { id: 'b' },
    ];
    expect(
      sortAntipickEntries(entries, heroesJa, 'role', 'ja').map((e) => e.id)
    ).toEqual(['b', 'c', 'a']);
  });

  test('role mode orders tank damage support in en', () => {
    const entries: Array<AntipickEntry> = [
      { id: 'a' },
      { id: 'c' },
      { id: 'b' },
    ];
    expect(
      sortAntipickEntries(entries, heroesEn, 'role', 'en').map((e) => e.id)
    ).toEqual(['b', 'c', 'a']);
  });

  test('data mode desc reverses order', () => {
    const entries: Array<AntipickEntry> = [
      { id: 'c', strength: 'strong' },
      { id: 'a', strength: 'situational' },
      { id: 'b' },
    ];
    expect(
      sortAntipickEntries(entries, heroesJa, 'data', 'ja', 'desc').map(
        (e) => e.id
      )
    ).toEqual(['b', 'a', 'c']);
  });

  test('strength mode desc reverses groups and ties', () => {
    const entries: Array<AntipickEntry> = [
      { id: 'a', strength: 'situational' },
      { id: 'b', strength: 'strong' },
      { id: 'c' },
      { id: 'd', strength: 'strong' },
    ];
    expect(
      sortAntipickEntries(entries, heroesJa, 'strength', 'ja', 'desc').map(
        (e) => e.id
      )
    ).toEqual(['c', 'a', 'd', 'b']);
  });

  test('role mode desc reverses order', () => {
    const entries: Array<AntipickEntry> = [
      { id: 'a' },
      { id: 'c' },
      { id: 'b' },
    ];
    expect(
      sortAntipickEntries(entries, heroesJa, 'role', 'ja', 'desc').map(
        (e) => e.id
      )
    ).toEqual(['a', 'c', 'b']);
  });
});

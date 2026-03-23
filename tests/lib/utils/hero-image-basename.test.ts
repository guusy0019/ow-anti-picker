import { describe, expect, it } from 'vitest';

import {
  heroIdToImageBasename,
  heroPortraitSrc,
} from '@/lib/utils/hero-image-basename';

describe('heroIdToImageBasename', () => {
  it('maps vantage to vendetta image basename', () => {
    expect(heroIdToImageBasename('vantage')).toBe('vendetta');
  });

  it('converts underscores to hyphens', () => {
    expect(heroIdToImageBasename('soldier_76')).toBe('soldier-76');
    expect(heroIdToImageBasename('wrecking_ball')).toBe('wrecking-ball');
    expect(heroIdToImageBasename('junker_queen')).toBe('junker-queen');
    expect(heroIdToImageBasename('jetpack_cat')).toBe('jetpack-cat');
  });

  it('leaves simple ids unchanged', () => {
    expect(heroIdToImageBasename('genji')).toBe('genji');
    expect(heroIdToImageBasename('dva')).toBe('dva');
  });
});

describe('heroPortraitSrc', () => {
  it('returns public asset path', () => {
    expect(heroPortraitSrc('soldier_76')).toBe('/assets/heroes/soldier-76.png');
  });
});

import { describe, expect, it } from 'vitest';

import { joinWithBaseUrl, publicUrl } from '@/lib/utils/public-url';

describe('joinWithBaseUrl', () => {
  it('joins root base with path', () => {
    expect(joinWithBaseUrl('/', 'data/foo.json')).toBe('/data/foo.json');
  });

  it('joins subpath base with path', () => {
    expect(joinWithBaseUrl('/repo/', 'data/foo.json')).toBe(
      '/repo/data/foo.json'
    );
  });

  it('normalizes base without trailing slash', () => {
    expect(joinWithBaseUrl('/repo', 'assets/x.png')).toBe('/repo/assets/x.png');
  });

  it('strips leading slashes on path', () => {
    expect(joinWithBaseUrl('/repo/', '/data/foo.json')).toBe(
      '/repo/data/foo.json'
    );
  });
});

describe('publicUrl', () => {
  it('uses Vite BASE_URL (default / in tests)', () => {
    expect(publicUrl('assets/heroes/genji.png')).toBe(
      '/assets/heroes/genji.png'
    );
  });
});

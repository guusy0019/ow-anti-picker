import { publicUrl } from '@/lib/utils/public-url';

const ID_TO_IMAGE_BASENAME: Readonly<Record<string, string>> = {
  /** データ上の ID は `vantage`、画像ファイルは `vendetta.png` */
  vantage: 'vendetta',
};

/**
 * `public/data` のヒーロー ID（スネークケース可）を、`public/assets/heroes` の PNG  basename に変換する。
 */
export function heroIdToImageBasename(heroId: string): string {
  const mapped = ID_TO_IMAGE_BASENAME[heroId];
  if (mapped) {
    return mapped;
  }
  return heroId.replaceAll('_', '-');
}

/** ヒーロー肖像の公開 URL（`vite` の `base` を反映） */
export function heroPortraitSrc(heroId: string): string {
  return publicUrl(`assets/heroes/${heroIdToImageBasename(heroId)}.png`);
}

const LEADING_SLASHES = /^\/+/;

/**
 * Vite の `import.meta.env.BASE_URL`（`vite.config` の `base`）に合わせてパスを結合する。
 * GitHub Pages のプロジェクトサイト（サブパス配信）でも `fetch` / `img` が正しく解決されるようにする。
 */
export function joinWithBaseUrl(base: string, path: string): string {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(LEADING_SLASHES, '');
  return `${normalizedBase}${normalizedPath}`;
}

/** 公開ディレクトリ（`public/`）直下のリソースへの絶対パス */
export function publicUrl(path: string): string {
  return joinWithBaseUrl(import.meta.env.BASE_URL, path);
}

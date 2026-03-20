# 設定

## 環境変数

環境変数はビルド時に Zod で検証されます。スキーマは `env.ts` で定義します。

```typescript
// env.ts
export default defineConfig({
  schema: {
    VITE_API_BASE_URL: z.string().optional(),
  },
});
```

コード内では型付きで参照できます。

```typescript
import.meta.env.VITE_API_BASE_URL
```

## TypeScript のパス

パスエイリアスは `tsconfig.json` で設定しています。

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

使用例:

```typescript
import { Layout } from '@/lib/layout';
```

## Tailwind CSS

Tailwind CSS v4 は `@tailwindcss/vite` プラグインで設定しています。グローバルスタイルとカスタムは `src/lib/styles/globals.css` に記述します。

## ルーティング

ルートは `src/routes/` のファイルで定義します。TanStack Router がルートツリーを自動生成します。詳細は [TanStack Router のドキュメント](https://tanstack.com/router) を参照してください。

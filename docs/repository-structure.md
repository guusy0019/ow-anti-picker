# リポジトリ構造

```
vite-react-tailwind-starter/
├── src/
│   ├── lib/
│   │   ├── components/          # 再利用可能な UI コンポーネント
│   │   │   ├── ui/              # shadcn/ui コンポーネント
│   │   │   │   └── button.tsx
│   │   │   ├── theme-provider.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── layout/              # レイアウト
│   │   │   ├── components/
│   │   │   │   ├── header.tsx
│   │   │   │   └── footer.tsx
│   │   │   └── index.tsx
│   │   ├── pages/               # ページコンポーネント
│   │   │   ├── 404/
│   │   │   └── home/
│   │   ├── services/            # 共通サービス
│   │   │   └── constants.ts
│   │   ├── styles/              # グローバルスタイル
│   │   │   └── globals.css
│   │   └── utils/               # ユーティリティ
│   │       ├── cn.ts            # クラス名結合 (shadcn 用)
│   │       ├── sample.ts
│   │       └── sample.test.ts
│   ├── routes/                  # TanStack Router のルート
│   │   ├── __root.tsx           # ルートレイアウト
│   │   └── index.tsx            # ホームルート
│   ├── main.tsx                 # エントリーポイント
│   ├── routeTree.gen.ts         # 自動生成ルートツリー
│   └── env.d.ts                 # 環境変数の型定義
├── public/                      # 静的アセット
├── dist/                        # ビルド出力
├── docs/                        # ドキュメント
├── vite.config.ts               # Vite 設定
├── tsconfig.json                # TypeScript 設定
├── biome.json                   # Biome 設定
├── vitest.config.ts             # Vitest 設定
├── env.ts                       # 環境変数スキーマ
└── package.json
```

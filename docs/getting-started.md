# はじめに

## 必要環境

- **Node.js**: ^24.11.x（`engines` で指定）
- **pnpm**: 10.24.0（`packageManager` で指定）

## インストール

リポジトリの [`Use this template`](https://github.com/agustinusnathaniel/vite-react-tailwind-starter/generate) から生成するか、npx degit で取得します。

```bash
npx degit agustinusnathaniel/vite-react-tailwind-starter <app_name>
cd <app_name>
pnpm install
```

## 開発

開発サーバーを起動します。

```bash
pnpm dev
```

`http://localhost:3000` でアプリにアクセスでき、HMR が有効です。

## ビルド

本番用ビルドを行います。

```bash
pnpm build
```

出力は `dist/` に生成されます。

## テスト

```bash
pnpm test              # テストを 1 回実行
pnpm test:ui           # UI とカバレッジ付きで実行
pnpm test:coverage     # カバレッジレポート付きで実行
```

## コード品質

```bash
pnpm biome:check       # スタイル・リントのチェック
pnpm biome:fix         # スタイルの自動修正
pnpm type:check        # TypeScript の型チェック
pnpm check:turbo       # 上記を並列実行（biome / type / test）
```

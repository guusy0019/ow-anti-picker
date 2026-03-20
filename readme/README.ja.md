# Vite React Tailwind Starter

Vite・TypeScript・Tailwind CSS v4 で構築した、本番利用を想定した React アプリケーションのスターターテンプレートです。ファイルベースルーティング、型安全な環境変数、コード品質・テストのためのツールを備えています。

**English**: [README.md](../README.md)

## 概要

このテンプレートで得られるもの:

- **高速な開発**: Vite による HMR とビルド
- **型安全性**: 厳格モードの TypeScript
- **ルーティング**: TanStack Router のファイルベースルーティング
- **スタイリング**: ダークモード対応の Tailwind CSS v4
- **状態管理**: TanStack Query（サーバー状態）
- **コード品質**: Biome（リント/フォーマット）、型チェック、テスト
- **開発体験**: DevTools、環境変数検証、PWA 対応

## クイックスタート

### 必要環境

- **Node.js**: ^24.11.x
- **pnpm**: 10.24.0

### インストール・起動

```bash
npx degit agustinusnathaniel/vite-react-tailwind-starter <app_name>
cd <app_name>
pnpm install
pnpm dev
```

`http://localhost:3000` でアプリにアクセスできます。

### 主なコマンド

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | 本番ビルド（出力: `dist/`） |
| `pnpm test` | テスト実行 |
| `pnpm biome:check` | リント・フォーマットチェック |
| `pnpm check:turbo` | 品質チェック一括実行 |

## ドキュメント

詳細は [docs/](../docs/) を参照してください。

| ドキュメント | 内容 |
|-------------|------|
| [アーキテクチャ](../docs/architecture.md) | システム構成とコアモジュール |
| [はじめに](../docs/getting-started.md) | インストール・開発・ビルド・テスト |
| [テックスタック](../docs/tech-stack.md) | 使用技術一覧 |
| [リポジトリ構造](../docs/repository-structure.md) | ディレクトリ構成 |
| [設定](../docs/configuration.md) | 環境変数・TypeScript・Tailwind・ルーティング |
| [デプロイ](../docs/deployment.md) | ビルド設定と各プラットフォームの手順 |
| [開発ワークフロー](../docs/development-workflows.md) | ルート・ページ追加、Git 運用 |

その他、ルートには次のドキュメントがあります。

- [AGENTS.md](../AGENTS.md) - AI エディタ向け開発ガイド
- [CONTRIBUTING.md](../CONTRIBUTING.md) - コントリビューション手順
- [SPEC.md](../SPEC.md) - システム仕様

## 参考リンク

- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)

## ライセンス

[LICENSE](../LICENSE) を参照してください。

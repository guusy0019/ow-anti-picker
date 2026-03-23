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

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) 形式で、[commitlint](https://github.com/conventional-changelog/commitlint) により検証されます。**種類（type）** と **説明（subject）** をコロン＋スペースで区切ります。

```text
<type>: <subject>
```

**種類（`type`）** — 次のいずれかである必要があります（`@commitlint/config-conventional` の `type-enum` と一致）。

| type | 使うとき |
|------|----------|
| `build` | ビルドツール・バンドラ設定など（Vite、`package.json` のビルド関連など） |
| `chore` | メンテナンス・ツール・リポジトリ運用（ユーザー向け機能追加・バグ修正ではない） |
| `ci` | CI ワークフロー、パイプライン、自動化の設定 |
| `docs` | ドキュメントのみの変更 |
| `feat` | 新機能・ユーザー向けの挙動の追加 |
| `fix` | バグ修正 |
| `perf` | パフォーマンス改善 |
| `refactor` | バグ修正でも新機能でもない内部の整理 |
| `revert` | 過去のコミットの取り消し |
| `style` | フォーマット・空白・セミコロンなど（意味の変化なし） |
| `test` | テストの追加・更新のみ |

例:

```text
chore: 初期セットアップ
feat: ヒーローピッカーページを追加
fix: アンチピックデータの読み込みを修正
```

任意で **スコープ** を付けられます（ケバブケース。許可値: `components` / `deps` / `layout` / `routes` / `styles` / `utils` / `hooks`）。

```text
chore(deps): vite を 8.0.0 に更新
feat(routes): about ページを追加
```

`初期セットアップ` のように **type なしの一行だけ** にすると、`type-empty` / `subject-empty` で弾かれます。

### GitHub Release（`release.yml`）

[`.github/workflows/release.yml`](../.github/workflows/release.yml) は **必須ではありません**。`pnpm build`・テスト・GitHub Pages のデプロイには影響しません。

| 内容 | 説明 |
|------|------|
| いつ動くか | `v*` 形式のタグが push されたとき（例: `v1.2.3`） |
| 何をするか | [`changelogithub`](https://github.com/antfu/changelogithub) を実行し、コミット履歴から **GitHub の Release ノート**を自動生成する |
| ローカルとの対応 | `package.json` の `pnpm release`（[`commit-and-tag-version`](https://github.com/absolute-version/commit-and-tag-version)）でバージョン・`CHANGELOG.md` の更新とタグ作成 → **タグを push** すると上記ワークフローが Release を整える |

| 運用 | `release.yml` を |
|------|-------------------|
| `v1.2.3` のようなタグで GitHub Release を出したい | **残す**と便利 |
| タグも Release も使わない（Pages だけなど） | **削除してよい**（ビルド・デプロイには不要） |

**Node のバージョン**: ワークフロー内の `node-version` は `package.json` の `engines`（例: Node 24）に合わせるとよいです。

**リリース手順の例**（この自動化を使う場合）:

1. `main` などで `pnpm release` を実行し、プロンプトに従ってバージョンを上げ、タグまで作る（`commit-and-tag-version` の挙動に従う）。
2. コミットとタグを push する: `git push origin main --follow-tags`（ブランチ名は環境に合わせて変更）。
3. GitHub の **Actions** で **Release** ワークフローが成功したこと、**Releases** にノートが付いたことを確認する。

`v*` タグを push しなければ、このワークフローは動きません。

`package.json` の `engines` では **Node.js ^24.11.x** を想定しています。古いメジャーだと pnpm が engine 警告を出すことがあります。

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

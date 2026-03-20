# テックスタック

## コア依存関係

- **React 19.2.0**: UI ライブラリ
- **Vite 7.1.20** (rolldown-vite): ビルドツール・開発サーバー
- **TypeScript 5.9.3**: 型システム
- **Tailwind CSS 4.1.17**: ユーティリティファーストの CSS フレームワーク
- **TanStack Router 1.135.2**: 型安全なファイルベースルーティング
- **TanStack Query 5.90.7**: サーバー状態管理
- **Zod 4.1.12**: ランタイム型検証

## 開発ツール

- **Biome 2.3.4**: リント・フォーマッター（ESLint/Prettier の代替）
- **Vitest 4.0.8**: テストランナー
- **Husky 9.1.7**: Git フック
- **Commitlint**: Conventional Commits の検証
- **Turbo**: 並列タスク実行

## ビルドプラグイン

- `@vitejs/plugin-react`: React サポート（Fast Refresh）
- `@tanstack/router-plugin`: ファイルベースルート生成
- `@tailwindcss/vite`: Tailwind CSS v4 連携
- `vite-plugin-pwa`: PWA マニフェストとサービスワーカー
- `@julr/vite-plugin-validate-env`: 環境変数検証
- `vite-plugin-checker`: 開発時の TypeScript チェック

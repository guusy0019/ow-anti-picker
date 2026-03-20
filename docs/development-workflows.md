# 開発ワークフロー

## 新しいルートの追加

1. `src/routes/` にファイルを作成（例: `src/routes/about.tsx`）
2. `createFileRoute` で `Route` を export
3. ルートツリーは自動で再生成される

## 新しいページコンポーネントの追加

1. `src/lib/pages/` にディレクトリを作成（例: `src/lib/pages/about/`）
2. ページコンポーネントを `index.tsx` に実装
3. 対応するルートファイルで import して使用

## 環境変数の追加

1. `env.ts` にスキーマを追加
2. `.env` に変数を定義（クライアント公開用は `VITE_` プレフィックス）
3. `import.meta.env.VITE_*` で型付き参照

## Git ワークフロー

- **Pre-commit**: ステージされたファイルに対して Biome のフォーマット・リントを実行
- **Commit-msg**: コミットメッセージを Conventional Commits で検証
- **Pre-push**: 全体チェック（biome / type-check / test）を実行

# GitHub Actions（CI/CD）

`.github/workflows/` で定義しているワークフローの説明です。

## 一覧

| ワークフロー | トリガー | 役割 |
|-------------|----------|------|
| [Release](#release) | タグ push（`v*`） | リリースノート・GitHub Release の自動作成 |
| [Auto Dependency Update](#auto-dependency-update) | 手動実行 | 依存の一括更新と PR 自動作成 |
| [Update License](#update-license) | 手動 or 年1回（1月1日） | ライセンス年の更新 |

---

## Release

**ファイル**: `release.yml`

**いつ動くか**: `v*` 形式のタグを push したとき（例: `v1.0.0`）。

**やっていること**:

1. リポジトリをチェックアウト（履歴はフル取得）
2. Node.js 22.x をセットアップ
3. [changelogithub](https://github.com/agoalofalife/changelogithub) を実行し、変更履歴から GitHub Release のノートを生成・更新する

タグを打つと、そのタグ用の Release が作成され、changelogithub がコミット履歴などからリリースノートを自動で書きます。

---

## Auto Dependency Update

**ファイル**: `auto-deps-update.yml`

**いつ動くか**: GitHub の Actions タブから「Run workflow」で手動実行したときのみ。

**やっていること**:

1. リポジトリをチェックアウト
2. Node.js 22 と pnpm（latest）をセットアップ
3. **依存の更新**
   - `pnpm install`
   - `pnpm update`（全依存を更新）
   - `pnpm dedupe`
   - `pnpm biome:fix`
4. **品質チェック**: `pnpm check:turbo`（Biome / 型チェック / テスト）
5. **PR 作成**: [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request) で
   - ブランチ名: `chore/auto-deps-update`
   - コミット・PR タイトル: `chore(deps): auto update dependencies`
   - ラベル: `dependencies`
   - マージ後にブランチは削除

「依存をまとめて更新して、チェックを通した状態で PR を1本出したい」ときに使います。

---

## Update License

**ファイル**: `update-license.yml`

**いつ動くか**:

- **手動**: Actions から「Run workflow」で実行
- **自動**: 毎年 1 月 1 日 0:00 UTC（cron: `0 0 1 1 *`）

**やっていること**:

外部の [agustinusnathaniel/workflows](https://github.com/agustinusnathaniel/workflows) リポジトリにある `update-license.yml` を再利用しています。LICENSE の著作権年を現在の年で更新する用途です。

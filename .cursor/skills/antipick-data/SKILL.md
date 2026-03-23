---
name: antipick-data
description: >-
  Overwatch アンチピック JSON（antipick-ja.json / antipick-en.json）の編集・同期。
  JA を正としたキー構造の維持、英訳 reason、スキーマ準拠。antipick データを触るときに従う。
---

# アンチピック JSON データ

## いつ使うか

- `public/data/antipick/` 配下の JSON を追加・変更するとき
- 日本語データを更新したあと英語版を追従させるとき
- 相性の `strength` やカウンター `id` を変えたとき

## ファイルの役割

| ファイル | 役割 |
|---------|------|
| `public/data/antipick/antipick-ja.json` | **マスター**。相手ヒーローIDキーごとに、カウンター候補の配列。`reason` は日本語。 |
| `public/data/antipick/antipick-en.json` | **翻訳版**。トップレベルキー・各配列の `id` / `strength` は JA と**同一**。`reason` のみ英語。 |

## スキーマ（このリポジトリで使っている形）

- **`_meta`**: `version`, `locale`（`ja` / `en`）, `updatedAt`（`YYYY-MM-DD`）。EN も JA の `version` と `updatedAt` に揃える。
- **その他のキー**: 相手ヒーローID（例: `bastion`, `soldier_76`, `junker_queen`）。値は**配列**。
- **配列の各要素**:
  - `id`: カウンター側ヒーローID（`public/assets/heroes/{id}.png` の basename と一致。表示 URL は `/assets/heroes/{id}.png`）
  - `strength`: 相性の強さ（例: `strong`, `situational`）。**言語共通のキー**のままにする
  - `reason`: プレイヤー向け短文。**JA は日本語、EN は英語**で同じ内容を説明する

相性データがまだないヒーローは空配列 `[]` を置く。JA と EN で**同じキーセット・同じ配列長・同じ `id` の並び**にする。

## 編集手順

1. 変更は原則 **`antipick-ja.json` から**入れる（新規エントリ・削除・`strength` 変更・`id` 差し替え）。
2. 続けて **`antipick-en.json` を同じ構造に更新**し、各 `reason` を自然な英語（Overwatch のスキル・ウルト名はゲーム内英語に寄せる）で書く。
3. `_meta.updatedAt` を作業日に合わせて更新する（両ファイルで揃える）。
4. 詳細や設計の背景は `docs/dev/antipick-json-schema.md` を参照する。

## 検証

- JSON 構文: `python3 -m json.tool public/data/antipick/antipick-ja.json` / `antipick-en.json` がエラーなく終わること
- EN にだけ余分なキーや欠けたカウンターがないこと（JA の各 `(相手キー, 要素インデックス, id)` と 1:1）

## 注意

- ヒーローIDはプロジェクト内の画像・アプリの型定義と**同じ綴り**にする（`soldier_76` のようにアンダースコアのものもある）。
- `reason` にヒーロー名を繰り返し書かなくてよい場合がある（UI が別途名前を出す前提）。既存エントリの文体に合わせる。

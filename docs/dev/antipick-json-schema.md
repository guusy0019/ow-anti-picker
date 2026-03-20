# アンチピック JSON スキーマ

アンチピックデータの JSON 形式を定義します。ヒーローIDは `src/assets/heroes/` の画像ファイル名（拡張子なし）と一致させます。

---

## 方針

- **1ファイル1言語**: `antipick-ja.json`, `antipick-en.json` のように言語ごとにファイルを分ける
- **キーはヒーローID**: 相手ヒーローIDをキーにし、そのヒーローに対するアンチピック一覧を値に持つ
- **ヒーローID**: 小文字・kebab-case（例: `wrecking-ball`, `soldier-76`, `junker-queen`）

---

## スキーマ案A: シンプル（IDの配列のみ）

アンチピックを「ヒーローIDの配列」だけでも表現可能です。

```json
{
  "pharah": ["soldier-76", "widowmaker", "ashe", "bastion", "cassidy"],
  "reinhardt": ["reaper", "pharah", "mei", "sombra", "junker-queen"],
  "mercy": ["widowmaker", "sombra", "genji", "tracer", "roadhog"]
}
```

- **キー**: 相手ヒーローID（このヒーローに対するアンチを表示する）
- **値**: アンチピックとなるヒーローIDの配列（表示順は強い順など任意）

**メリット**: シンプルで編集しやすい。  
**デメリット**: 強さや理由を付けられない。

---

## スキーマ案B: 強さ・理由付き（推奨）

各アンチに「強さ」や「理由」を持たせたい場合はオブジェクト配列にします。

```json
{
  "pharah": [
    { "id": "soldier-76", "strength": "strong", "reason": "高火力とヒールで押し切れる" },
    { "id": "widowmaker", "strength": "strong", "reason": "一撃で落とせる" },
    { "id": "ashe", "strength": "medium", "reason": "ダイナマイトとスコープで距離を詰められる" }
  ],
  "reinhardt": [
    { "id": "reaper", "strength": "strong", "reason": "盾を貫通する近距離火力" },
    { "id": "pharah", "strength": "strong", "reason": "盾の外から攻撃できる" }
  ]
}
```

### フィールド定義

| フィールド   | 型     | 必須 | 説明 |
|-------------|--------|------|------|
| `id`        | string | ✅   | アンチヒーローID（`src/assets/heroes/{id}.png` と一致） |
| `strength`  | string | ❌   | 相性の強さ。`"strong"` \| `"medium"` \| `"weak"` など（多言語時はキーのみで表示側で翻訳） |
| `reason`    | string | ❌   | 理由・コメント（言語ごとに異なるテキストを書ける） |

**メリット**: 強さで並べ替え・バッジ表示、理由の表示ができる。  
**デメリット**: 記述量は増える。

---

## スキーマ案C: 強さはIDのみ・理由は別（折衷）

「強さ」は共通なのでIDだけの配列で持ち、理由だけ言語別に持つ形です。

**antipick.json**（言語共通・関係性のみ）:

```json
{
  "pharah": [
    { "id": "soldier-76", "strength": "strong" },
    { "id": "widowmaker", "strength": "strong" },
    { "id": "ashe", "strength": "medium" }
  ]
}
```

**antipick-reasons-ja.json**（理由のみ・言語別）:

```json
{
  "pharah": {
    "soldier-76": "高火力とヒールで押し切れる",
    "widowmaker": "一撃で落とせる",
    "ashe": "ダイナマイトとスコープで距離を詰められる"
  }
}
```

- 関係性の追加・修正は `antipick.json` のみで済む
- 理由の追加・翻訳は `antipick-reasons-{locale}.json` のみで済む

---

## 推奨

- **まずは案B**で進めるのがおすすめです。
  - 1ファイル1言語で、その言語用の理由までまとめて書ける
  - 強さでソート・表示を分けやすい
- ヒーローが多くて理由を書く負荷が大きい場合は、**案Aで開始**し、あとから案Bに移行しても問題ありません（キーはそのまま使える）。

---

## ファイルを置く場所（推奨）

**CI/CD でビルドしてリリースする前提でも、配置は `public/data/` で問題ありません。**

| パス | 説明 |
|------|------|
| `public/data/antipick-ja.json` | 日本語アンチピックデータ |
| `public/data/antipick-en.json` | 英語アンチピックデータ |

- ビルド時: Vite が `public/` を `dist/` にそのままコピーするため、リリース成果物に `dist/data/antipick-ja.json` などが含まれる
- 取得: アプリから `fetch('/data/antipick-ja.json')` で取得（`base` を変えている場合は `import.meta.env.BASE_URL + 'data/antipick-ja.json'` を使う）
- **メリット**: 言語ごとに必要な JSON だけをランタイムで読み込める、JS バンドルに含めないのでサイズを抑えられる、既存の `public/assets/` と同じ静的アセットとして扱える

**別案: `src/data/`（import する場合）**

- `import antipickJa from '@/data/antipick-ja.json'` のように import する
- **メリット**: 型付きで import できる
- **デメリット**: 全言語分を import するとバンドルに全部入る。動的 `import()` で分ける必要がある

**結論**: 多言語で「表示言語に応じて1ファイルだけ読む」運用なら、ビルド前提でも **`public/data/`** が適切。

---

## ヒーロー名 JSON（推奨）

アンチピックではヒーロー **ID**（`pharah`, `soldier-76` など）だけが登場するため、UI で表示名（「ファラ」「ソルジャー: 76」など）を出すには **ヒーロー名だけの JSON** を別で用意するとよいです。

**置き場所**: `public/data/`（アンチピックと同じ）

| パス | 説明 |
|------|------|
| `public/data/heroes-ja.json` | 日本語のヒーロー表示名 |
| `public/data/heroes-en.json` | 英語のヒーロー表示名 |

**形式**: ID → 表示名のマップ（1ファイル1言語）

```json
{
  "pharah": "ファラ",
  "soldier-76": "ソルジャー: 76",
  "wrecking-ball": "レッキング・ボール",
  "junker-queen": "ジャンカー・クイーン"
}
```

- **キー**: ヒーローID（`src/assets/heroes/{id}.png` および antipick のキー・`id` と一致）
- **値**: その言語での表示名

**メリット**:
- ヒーロー選択UI・アンチ一覧・タイトルなど、ID を表示名に変換する箇所で共通利用できる
- 言語切り替え時に `heroes-{locale}.json` を読み直すだけで表示名を切り替えられる
- アンチピック側には「理由」だけ書けばよく、ヒーロー名の翻訳を antipick に重複して持たなくてよい

必要なら、同じファイルに **ロール**（タンク/ダメージ/サポート）や **表示順** を足す拡張も可能です。

```json
{
  "pharah": { "name": "ファラ", "role": "damage" },
  "reinhardt": { "name": "ラインハルト", "role": "tank" }
}
```

まずは `id → 表示名` のシンプルな形で始めて、ロールや順序が必要になったらオブジェクトに拡張する形で十分です。

---

## メタ情報（任意）

バージョンや更新日を持たせたい場合は、ルートにメタを足します。

```json
{
  "_meta": {
    "version": "1.0",
    "locale": "ja",
    "updatedAt": "2025-03-14"
  },
  "pharah": [ ... ]
}
```

アプリ側では `_meta` を読み飛ばすか、バージョン表示に利用します。

---

## 次のステップ

1. 案A/B/C のどれで進めるか決定
2. `strength` の値を列挙するなら正式な値リストを決める（例: `strong` / `medium` / `weak` のみ許可）
3. 上記に合わせて TypeScript の型定義を `src/lib/types/antipick.ts` などに追加
4. サンプルとして 2〜3 ヒーロー分の JSON を実際に作成し、読み込み〜表示まで確認

変更したい点や「ここは必須にしたい」などあれば教えてください。

# CHUNITHM Rank Checker

CHUNITHM のベスト枠・新曲枠・候補枠のスコアを読み込んで、次の判定ランクまでの必要スコアとレート上昇量を一覧表示するWebツールです。

## 使い方

1. `index.html` をブラウザで開く(サンプルデータが最初から表示されます)
2. `bookmarklet/` のブックマークレットで自分のスコアデータ(JSON)を取得する
3. 取得した `chunithm_player_data.json` を「スコアデータを読込」ボタン、またはドラッグ&ドロップで読み込む
4. タブでベスト枠・新曲枠・候補枠を切り替えながら確認する。「画像で保存」で表を画像として書き出せる

## データの流れ

```
chunisupport.net API  ──(bookmarklet/)──>  JSON ファイル  ──読込──>  index.html
```

- データ取得元: [chunisupport.net API](https://docs.chunisupport.net/api/#get-v1usersusernamerating)
- 取得方法: [`bookmarklet/`](bookmarklet/) 以下のブックマークレットを使って、APIから取得したスコアをJSONとしてダウンロードする
- 表示: `index.html` がそのJSONを読み込み、4枠(ベスト枠/新曲枠/候補枠(ベスト)/候補枠(新曲))に振り分けて表示する

対応しているJSON形式の詳細は `index.html` 内の `normalizeFrames()` を参照してください(chunirecマイページ形式にも対応しています)。

## ローカルで確認する

追加のセットアップは不要です。リポジトリを取得して `index.html` を開くだけで動作します。

```bash
git clone https://github.com/odin3556/chunithm-score-tool.git
cd chunithm-score-tool
```

`index.html` をブラウザで開いてください。

## ディレクトリ構成

```
chunithm-score-tool/
├── index.html               # メイン画面(レーティングチェッカー・目標管理)
├── bookmarklet/
│   ├── fetch-score-data.js  # スコア取得ブックマークレットの読みやすいソース
│   ├── bookmarklet.txt      # ブラウザに登録する一行版
│   └── README.md            # 登録・使い方の説明
├── LICENSE
└── README.md
```

## 注意

- 自分のプレイデータ(JSON)には個人のスコア情報が含まれます。公開リポジトリにはサンプルデータのみを含め、実データはコミットしないでください。
- APIトークンは自分のアカウントのものだけを使用してください。

## ライセンス

MIT License

# CHUNITHM Rank Checker

CHUNITHM のベスト枠・新曲枠・候補枠のスコアを読み込んで、次の判定ランクまでの必要スコアとレート上昇量を一覧表示するWebツールです。

- 🔗 **ツールを開く(GitHub Pages)**: https://odin3556.github.io/chunithm-score-tool/
- 📄 **ソースコード**: このリポジトリ自体です([index.html](index.html)が本体)

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

## APIの利用について

スコア取得には [ChuniSupport](https://docs.chunisupport.net/) のAPIを利用しています。利用にあたっては[ChuniSupport利用規約](https://docs.chunisupport.net/legal/terms/)に従ってください。特に以下の点に注意してください。

- **非営利目的に限る**: APIおよび取得データを使った有料機能・広告掲載・データの販売や有償再配布、その他収益を得る利用は禁止されています。
- **APIトークンを公開・共有しない**: トークンは発行を受けた本人が管理するものです。リポジトリへのコミットやSNS等への掲載は絶対に行わないでください(このリポジトリのブックマークレットは実行時に手入力したトークンをその場で使うのみで、コード内に保存しません)。
- **制限の回避禁止**: レート制限・認証・公開設定などAPIドキュメントで定められた技術的制限を回避しないでください。
- **取得データの目的外利用の禁止**: 取得したユーザーデータを、本来の目的(自分のスコア確認)を超えて利用したり、統計情報などから他の利用者を特定・推測する行為は禁止されています。
- **問い合わせ先**: 本ツールやAPIに関する問い合わせは、株式会社セガ等の公式関係者ではなく、[ChuniSupportの問い合わせ窓口](https://docs.chunisupport.net/legal/terms/)へ行ってください。

## 著作権・免責事項

サイト上のコンテンツの著作権は、原則として各コンテンツの著作権保持者に帰属します。
当サイトは非公式のファンサイトであり、株式会社セガをはじめとする関係者・関係会社とは一切関係ありません。

## ライセンス

MIT License(上記の著作権・免責事項の対象を除く、本リポジトリのコード部分に適用されます)

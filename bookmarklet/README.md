# スコア取得ブックマークレット

[chunisupport.net API](https://docs.chunisupport.net/api/#get-v1usersusernamerating) から自分のCHUNITHMスコアデータを取得し、
`index.html` が読み込める形式のJSONファイルとしてダウンロードするブックマークレットです。

## 中身

- [`fetch-score-data.js`](fetch-score-data.js) — 読みやすい形式のソース
- [`bookmarklet.txt`](bookmarklet.txt) — ブラウザのブックマークに登録する一行版(`javascript:...`)

## 登録方法

1. `bookmarklet.txt` の中身を全部コピーする
2. ブラウザで新しいブックマークを作成する
3. 名前を「CHUNITHMスコア取得」など好きな名前にする
4. URL欄にコピーした内容をそのまま貼り付けて保存する

## 使い方

1. 登録したブックマークをクリックして実行する
2. プロンプトでユーザーネームとAPIトークンを入力する
3. `chunithm_player_data.json` がダウンロードされる
4. そのファイルを `index.html` の「スコアデータを読込」またはドラッグ&ドロップで読み込む

## 注意

- APIトークンは自分の chunisupport.net アカウントのものを使ってください。他人のトークンを入力しないでください。
- ダウンロードされるJSONにはプレイヤーネームや個別のスコアが含まれます。公開の場に上げる際は取り扱いに注意してください。

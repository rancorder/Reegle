# Reegle ジラフユニット 商談プレゼンシステム v3

オンライン商談（Zoom/Teams等）で**台本を見ながら投影スライドを進める**ためのシステム。
3タイプ（自治体／幼稚園／写真スタジオ）切替対応。

## ファイル
- **present.html** — 進行用（自分用）
- **index.html** — 投影用（先方に見せる）

## デザイン
v3は「Forest Atelier — Editorial Rhythm」方向。
- 写真スライド・ダークパネル・白エディトリアルの3パターンが交互に出る視覚リズム
- 製品写真を7スライドに展開、装飾ナンバーで雑誌風アクセント
- BIZ UDPGothic + Noto Serif JP + Cormorant Garamondの3書体

## 使い方
1. `present.html` をブラウザで開く（Chrome/Edge推奨）
2. 上部のタイプ切替で対象を選ぶ
3. 右上の「🖥 投影画面を別タブで開く」をクリック
4. Zoomで**その別タブだけ**を画面共有
5. 手元で台本見ながらクリックor←→キーで進める

## デプロイ
DEPLOY.md 参照。Vercel公開デプロイ対応。

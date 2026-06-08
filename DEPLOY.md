# Vercel デプロイ手順（CBA同型）

## 必要ファイル

ルート直下にこれだけあればOK：
- `index.html` — 投影用（先方に共有する側）
- `present.html` — 進行用（自分用、台本表示）
- `vercel.json` — `/present` のルーティング設定
- `README.md`（あれば）

`src/` フォルダは編集時の素材なので、Vercelで配信する必要はない。`.gitignore`でコメントアウトしとるけん、運用方針で決めて：
- **編集ソースもGitHubに残したい** → そのまま全部push（VercelはHTMLだけ配信する）
- **HTMLだけ公開したい** → `.gitignore` の `src/` 行を有効化してから push

## 手順

### 1. 新規GitHubリポジトリを作成
名前は何でもOK（例：`reegle-giraffe-present`）。Privateにすれば**ソースは非公開**やが、**Vercelに繋いだ瞬間に配信URLは公開される**点だけ注意。

### 2. ファイルをpush
```bash
cd reegle_present_dist
git init
git add .
git commit -m "Initial: Reegle giraffe presentation system"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 3. Vercelで Import
[vercel.com](https://vercel.com) → New Project → Import Git Repository → 上記リポジトリを選択

### 4. ビルド設定（**ここが前回ハマったポイント**）
Vercelのデフォルト設定で**たいてい問題なくいく**けど、もし404が出たら：
- Framework Preset: **Other**
- Build Command: 空欄
- Output Directory: **`.`（ドット）** + 右の **Override をON**
- Install Command: 空欄

`vercel.json` のrewriteで `/present` → `/present.html` が動くようになる。

### 5. デプロイ完了後の動作確認
- `https://<your-project>.vercel.app/` → 投影用画面（index.html）が開く
- `https://<your-project>.vercel.app/present` → 進行用画面が開く

## 商談中の運用

1. 自分のPCで `https://<your-project>.vercel.app/present` を開く（進行用）
2. タイプを選んで「投影画面を別タブで開く」をクリック
3. 別タブ（投影用）をZoomで**ウィンドウ単位で共有**
4. 手元の進行用で台本見ながら操作 → 投影用が同期

## 更新時

`src/` を編集したら：
```bash
cd src
python3 bundle.py
```
で `index.html` と `present.html` が再生成される。それをGitHubにpushすればVercelが自動再デプロイ。

## トラブル時
- **404**：Output Directoryを `.` にしてOverride ONを確認
- **`/present` が動かない**：vercel.jsonがリポジトリ直下にあるか確認
- **同期しない**：別タブが同じドメインから開かれとるか（投影画面ボタン経由なら自動的に同じドメイン）

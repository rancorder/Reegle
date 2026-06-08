# Vercel デプロイ手順

## ファイル（リポジトリ直下に置く）
- index.html
- present.html
- vercel.json
- README.md（任意）

## 手順
1. 新規GitHubリポジトリ作成
2. push
3. Vercel → New Project → リポジトリ選択 → そのままDeploy
4. もし404出たら：Output Directory を `.` でOverride ON

## URL
- `/` → 投影用
- `/present` → 進行用

## 更新
src/ を編集 → `python3 bundle.py` → index.html と present.html が再生成 → push

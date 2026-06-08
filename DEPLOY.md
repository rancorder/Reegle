# Vercel デプロイ手順
リポジトリ直下に index.html / present.html / vercel.json を置く。
1. 新規GitHubリポジトリ作成
2. push
3. Vercel → New Project → Deploy
4. もし404出たら：Output Directory を `.` でOverride ON

URL:
- `/` → 投影用
- `/present` → 進行用

更新: src/ いじって `python3 bundle.py` 再生成 → push

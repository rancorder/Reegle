# Vercel デプロイ
1. 新規GitHubリポジトリ作成
2. index.html / present.html / vercel.json を push
3. Vercel → New Project → Deploy
4. もし404なら Output Directory `.` でOverride ON

URL:
- `/` → 投影用
- `/present` → 進行用

更新: src/ いじって `python3 bundle.py` → push

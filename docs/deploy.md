# デプロイ（Vercel）

## 初回セットアップ

1. [vercel.com](https://vercel.com) → Import Git Repository
2. GitHub リポジトリ（`yuta-kojima1/my-morning-routine`）を選択
3. **Root Directory は空欄のまま**（`package.json` がリポジトリルートにある）
4. Environment Variables に 6 つの環境変数を登録 → [一覧](./env.md)
5. Deploy

## 自動デプロイ

`main` ブランチに push すると Vercel が自動でビルド・デプロイする。

```bash
git push origin main
```

## 手動再デプロイ

Vercel ダッシュボード → Deployments → 最新の deployment → `...` → **Redeploy**

## 重要な設定メモ

- **Root Directory**: 空欄（`app/` に設定すると「No Next.js version detected」エラーになる）
- **proxy.ts**: `middleware.ts` という名前ではないが Next.js ミドルウェアとして動作する（意図的）
- **Webhook エンドポイント**: `api/webhooks` は `proxy.ts` の matcher で除外されているため認証ガードがかからない

```ts
// proxy.ts
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)'],
}
```

## ビルド確認

Vercel のビルドログで以下が出れば成功:

```
✓ Compiled successfully
ƒ Proxy (Middleware)
✓ Build Completed
```

# 環境変数

## 一覧

| 変数名 | 用途 | 取得場所 |
|--------|------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名キー | Supabase → Project Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase サービスロールキー（Storage 署名 URL 発行・Webhook からの DB 書き込みに使用） | Supabase → Project Settings → API → service_role |
| `STRIPE_SECRET_KEY` | Stripe シークレットキー | Stripe → Developers → API keys → Secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 署名シークレット | Stripe → Developers → Webhooks → エンドポイント選択 → Signing secret |
| `NEXT_PUBLIC_APP_URL` | アプリの公開 URL（Stripe の success/cancel URL に使用） | Vercel のデプロイ URL（例: `https://my-morning-routine.vercel.app`） |

## ローカル開発

プロジェクトルート（`app/`）に `.env.local` を作成して上記を設定。

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

ローカルで Webhook を受け取るには Stripe CLI を使用:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Vercel

Vercel → プロジェクト → Settings → Environment Variables に上記 6 つを登録する。  
`NEXT_PUBLIC_APP_URL` は本番 URL（`https://my-morning-routine.vercel.app`）を設定。

## 注意事項

- `SUPABASE_SERVICE_ROLE_KEY` は **絶対に公開しない**。クライアントサイドでは使用しない。
- Stripe の本番移行時は `sk_test_...` → `sk_live_...`、`whsec_test_...` → 本番 Webhook の Signing secret に差し替える。
- `STRIPE_WEBHOOK_SECRET` はテスト用と本番用で別々のエンドポイントを作成し、それぞれの値を使う。

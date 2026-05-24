# アーキテクチャ

## 購入フロー（ゲスト・ログイン共通）

```
ユーザー
  │
  ├─ 商品ページ「購入する」ボタンクリック
  │
  ▼
POST /api/checkout
  │  ・Supabase でログイン状態を確認（任意）
  │  ・ログイン済みなら client_reference_id = user.id をセット
  │  ・Stripe Checkout Session を作成
  │
  ▼
Stripe 決済画面（stripe.com）
  │
  ├─── 決済完了 ──────────────────────────────────────────────┐
  │                                                           │
  ▼                                                           ▼
/checkout/success?session_id=...          POST /api/webhooks/stripe
  │  ・Stripe から session を取得                ・署名検証
  │  ・payment_status === 'paid' を確認          ・client_reference_id (user_id) があれば
  │  ・Supabase Storage から署名付き URL 発行      purchases テーブルに upsert
  │  ・ダウンロードボタンを表示
  │
  ▼
ユーザーが音声をダウンロード
```

## マイページフロー（ログイン必須）

```
/mypage
  │  ・auth.getUser() でユーザー確認（未ログインなら /auth/login へリダイレクト）
  │  ・purchases テーブルから購入一覧を取得
  │  ・各商品の Supabase Storage 署名付き URL を生成（1時間有効）
  │
  ▼
MyPageContent（Client Component）
  └─ AudioPlayer で音声再生
```

## ミドルウェア（proxy.ts）

`/mypage` のみ認証ガード。  
`/checkout/*` はゲストもアクセス可能（ガードなし）。

```ts
const PROTECTED_PATHS = ['/mypage']
```

## ファイル構成

```
app/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts        # Stripe Checkout Session 作成
│   │   └── webhooks/stripe/route.ts # Stripe Webhook 受信
│   ├── checkout/
│   │   └── success/
│   │       ├── page.tsx             # 決済完了ページ（Server Component）
│   │       └── DownloadButton.tsx   # ダウンロードボタン（Client Component）
│   ├── mypage/
│   │   ├── page.tsx                 # マイページ（Server Component）
│   │   └── MyPageContent.tsx        # 音声リスト（Client Component）
│   └── products/[slug]/page.tsx     # 商品詳細ページ
├── lib/
│   ├── products.ts                  # 商品マスタ（コード管理）
│   ├── stripe/client.ts             # Stripe クライアント
│   └── supabase/server.ts           # Supabase クライアント（通常・service_role）
├── proxy.ts                         # Next.js ミドルウェア（認証ガード）
└── supabase/migrations/001_init.sql # DB スキーマ
```

## Supabase Storage

- バケット名: `products`（プライベート）
- 格納ファイル:
  - `morning-detox-trial.mp3`
  - `night-detox-trial.mp3`
- アクセス: `service_role` キーを使った署名付き URL のみ

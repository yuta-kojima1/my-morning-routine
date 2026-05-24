# Supabase セットアップ

## プロジェクト作成

1. [supabase.com](https://supabase.com) でプロジェクトを作成
2. Project URL と anon key、service_role key を控える → [環境変数](./env.md) に設定

## Authentication

Supabase → Authentication → Sign In / Sign Up → Email

- **Confirm email**: **OFF**（メール確認フローをスキップ。OTP 期限切れ問題を回避するため）

## DB マイグレーション

Supabase → SQL Editor で [`supabase/migrations/001_init.sql`](../supabase/migrations/001_init.sql) を実行。

作成されるテーブル:

| テーブル | 内容 |
|----------|------|
| `profiles` | ユーザープロフィール（auth.users と 1:1）|
| `products` | 商品マスタ（初期データ込み） |
| `purchases` | 購入履歴（ログイン済みユーザーのみ） |

RLS（Row Level Security）はすべてのテーブルで有効。

## Storage

1. Supabase → Storage → New bucket
   - Bucket name: `products`
   - Public bucket: **OFF**（プライベート）

2. 音声ファイルをアップロード（bucket の root 直下）:
   - `morning-detox-trial.mp3`
   - `night-detox-trial.mp3`

アクセスは `service_role` キー経由の署名付き URL のみ。  
署名 URL の有効期限: **24時間**（成功ページ）/ **1時間**（マイページ）

## テーブルスキーマ概要

### purchases

```sql
id                    uuid  PRIMARY KEY
user_id               uuid  → profiles(id)
product_id            text  → products(id)
stripe_session_id     text  UNIQUE
stripe_payment_intent_id text
amount_paid           integer
status                text  ('pending' | 'completed' | 'refunded')
purchased_at          timestamptz
```

Webhook から `service_role` で upsert（`onConflict: 'stripe_session_id'`）。  
ゲスト購入は DB に記録しない（`client_reference_id` なし = `user_id` なし）。

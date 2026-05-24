# Stripe セットアップ

## API キー

Stripe → Developers → API keys

- テスト中: `sk_test_...` を使用
- 本番移行時: `sk_live_...` に差し替え（Vercel の環境変数を更新）

## Webhook 設定

Stripe → Developers → Webhooks → Add endpoint

| 項目 | 値 |
|------|----|
| エンドポイント URL | `https://your-domain.vercel.app/api/webhooks/stripe` |
| Listen to | `checkout.session.completed` |

エンドポイント作成後、**Signing secret**（`whsec_...`）を控えて環境変数 `STRIPE_WEBHOOK_SECRET` に設定。

## 購入フロー（コード）

### 1. Checkout Session 作成（`/api/checkout`）

- `mode: 'payment'`（一括払い）
- `currency: 'jpy'`
- `metadata.product_id`: 商品 ID
- `client_reference_id`: ログイン済みなら `user.id`（ゲストは未設定）
- `success_url`: `/checkout/success?session_id={CHECKOUT_SESSION_ID}`
- `cancel_url`: `/products/[slug]`

### 2. Webhook 受信（`/api/webhooks/stripe`）

- `checkout.session.completed` イベントのみ処理
- `client_reference_id`（= `user_id`）がある場合のみ DB に記録
- `onConflict: 'stripe_session_id'` で冪等性を保証（再送に対応）

## テスト用カード

| カード番号 | 動作 |
|-----------|------|
| `4242 4242 4242 4242` | 成功 |
| `4000 0000 0000 0002` | 拒否 |

有効期限・CVV は任意の値でOK。

## ローカルでの Webhook テスト

```bash
# Stripe CLI インストール後
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 別ターミナルでテストイベント発火
stripe trigger checkout.session.completed
```

## 本番移行チェックリスト

- [ ] Stripe ダッシュボードを Live モードに切り替え
- [ ] `sk_live_...` を Vercel 環境変数に設定
- [ ] 本番用 Webhook エンドポイントを登録
- [ ] 本番用 `STRIPE_WEBHOOK_SECRET` を Vercel 環境変数に設定
- [ ] 実際のカードで少額テスト購入を実施

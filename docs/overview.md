# For Mornings — プロジェクト概要

朝活・夜活の音声コンテンツを販売する Next.js アプリ。  
ゲスト購入（アカウント不要）に対応し、決済完了後に音声ファイルのダウンロードリンクを発行する。

---

## 技術スタック

| 役割 | 技術 |
|------|------|
| フロントエンド | Next.js (App Router) + TypeScript + Tailwind CSS |
| 認証・DB・Storage | Supabase |
| 決済 | Stripe Checkout |
| デプロイ | Vercel (GitHub 連携・自動デプロイ) |

---

## 商品ラインナップ

| ID | 名前 | 価格 | 尺 |
|----|------|------|----|
| `morning-detox` | Morning-Detox | ¥2,480 | 約7分 |
| `night-detox` | Night-Detox | ¥2,480 | 約10分 |

商品の定義はコードで管理: [`lib/products.ts`](../lib/products.ts)

---

## ページ構成

| パス | 内容 |
|------|------|
| `/` | トップ（LP） |
| `/products/[slug]` | 商品詳細・購入ボタン |
| `/checkout/success` | 決済完了・ダウンロードリンク発行 |
| `/mypage` | 購入済み音声の再生（ログイン必須） |
| `/auth/login` | ログイン |
| `/auth/signup` | サインアップ |

---

## ドキュメント一覧

- [アーキテクチャ](./architecture.md) — システム構成・フロー図
- [環境変数](./env.md) — 必要な環境変数の一覧と取得場所
- [Supabase セットアップ](./supabase.md) — DB・Storage・Auth の設定手順
- [Stripe セットアップ](./stripe.md) — Webhook・テスト方法
- [デプロイ](./deploy.md) — Vercel へのデプロイ手順
- [既知の問題と解決済みバグ](./bugs.md) — トラブルシューティング記録

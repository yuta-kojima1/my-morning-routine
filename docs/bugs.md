# 既知の問題と解決済みバグ

## 解決済み

### 1. スペルミス「FOR MORINGS」→「FOR MORNINGS」

- **症状**: ヘッダーのサイト名が誤字
- **対応**: LP コンポーネント内のテキストを修正

---

### 2. Vercel ビルドエラー「No Next.js version detected」

- **症状**: Vercel デプロイ時に Next.js が検出されない
- **原因**: Vercel の Root Directory が `app` に設定されていたが、`package.json` はリポジトリルートにある
- **対応**: Vercel プロジェクト設定の Root Directory を **空欄** に変更

---

### 3. チェックアウト API が 401 を返す（ゲスト購入不可）

- **症状**: ログインしていない状態で購入ボタンを押すと `POST /api/checkout` が 401
- **原因**: API ルートが認証を必須にしていた
- **対応**: [`app/api/checkout/route.ts`](../app/api/checkout/route.ts) で auth を任意に変更。ログイン済みなら `client_reference_id` を付与、未ログインはスキップ

---

### 4. メール確認リンク期限切れ（otp_expired）

- **症状**: サインアップ後にメールのリンクをクリックすると期限切れエラー
- **原因**: Supabase のメール確認が有効になっていた
- **対応**: Supabase → Authentication → Email → **Confirm email を OFF**

---

### 5. ダウンロードリンク生成失敗（バケット名ミスマッチ）

- **症状**: 成功ページで「ダウンロードリンクの生成に失敗しました」
- **原因**: コード内のバケット名が `audio-products` だったが実際のバケットは `products`
- **対応**: [`app/checkout/success/page.tsx`](../app/checkout/success/page.tsx) で `.from('audio-products')` → `.from('products')` に修正

---

### 6. 決済後にログイン画面にリダイレクトされる（ゲスト）

- **症状**: ゲストで購入後、`/checkout/success` にアクセスするとログイン画面へ飛ぶ
- **原因**: [`proxy.ts`](../proxy.ts) の `PROTECTED_PATHS` に `/checkout` が含まれていた
- **対応**: `PROTECTED_PATHS = ['/mypage']` のみに変更

---

### 7. purchases テーブルに user_id が保存されない

- **症状**: マイページに購入履歴が表示されない
- **原因①**: Webhook が `client_reference_id` を取得していなかった
- **原因②**: Checkout API が `client_reference_id` を Stripe セッションに渡していなかった
- **対応**: 両ファイルを修正。Webhook で `session.client_reference_id` を `user_id` として upsert

---

### 8. Webhook が `customer_email` カラムエラーで落ちる

- **症状**: Stripe Webhook が 500 エラー
- **原因**: `purchases` テーブルに `customer_email` カラムが存在しないのに upsert しようとしていた
- **対応**: Webhook の upsert ペイロードから `customer_email` を削除

---

### 9. 音声ファイルパスのミスマッチ

- **症状**: マイページで音声が再生できない
- **原因**: `lib/products.ts` の `audioPath` が `products/morning-detox.mp3` だったが、実際のファイル名は `morning-detox-trial.mp3`
- **対応**: `audioPath` を `'morning-detox-trial.mp3'`、`'night-detox-trial.mp3'` に修正

---

### 10. マイページで署名付き URL が生成されない

- **症状**: マイページの音声が再生できない（URL が null）
- **原因**: mypage の Server Component で署名付き URL を生成していなかった（プレースホルダーの `/sample.mp3` のままだった）
- **対応**: `app/mypage/page.tsx` で `createServiceClient()` を使い、`Promise.all` で各購入の署名付き URL を生成して `MyPageContent` に渡す

---

## 未解決・調査中

### PC でダウンロードできない / スマホでも DL できずブラウザ再生になる

- **症状**: 成功ページの「音声をダウンロード」ボタンを押してもファイルがダウンロードされずブラウザ内で再生される（PC）、またはダウンロードが始まらない（スマホ）
- **原因**: `<a download>` 属性はクロスオリジン URL（Supabase Storage の別ドメイン）には効かない。`createSignedUrl` に `{ download: true }` オプションを追加したが、逆に署名 URL 生成が失敗するケースが発生
- **現在の対応**: `DownloadButton.tsx`（Client Component）で `fetch → Blob → createObjectURL → <a download>` により強制ダウンロードを試みる実装に変更。**動作確認中**

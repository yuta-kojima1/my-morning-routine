import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
}

const sections = [
  {
    title: '1. 事業者情報',
    body: '【氏名または会社名】（以下「当社」）は、本ウェブサイト「For Mornings」において提供するサービスにおけるお客様の個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。',
  },
  {
    title: '2. 取得する情報',
    body: '当社は、以下の情報を取得する場合があります。\n\n・メールアドレス（Stripeを通じた決済時に取得）\n・購入情報（商品名・購入金額・決済日時）\n・お問い合わせ内容\n・アクセスログ（IPアドレス・ブラウザ情報など）',
  },
  {
    title: '3. 利用目的',
    body: '取得した情報は以下の目的で利用します。\n\n・購入コンテンツのご提供\n・サービスに関するご連絡\n・購入履歴の管理\n・サービスの改善・新機能の開発\n・法令に基づく対応',
  },
  {
    title: '4. 第三者への提供',
    body: '当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません。\n\n・お客様の同意がある場合\n・法令に基づく場合\n・人の生命・身体・財産の保護のために必要な場合\n\nなお、決済処理のために Stripe, Inc. にメールアドレス等の情報を提供します。Stripe のプライバシーポリシーは stripe.com/jp/privacy をご確認ください。',
  },
  {
    title: '5. Cookieの使用',
    body: '当サイトでは、サービス向上のためにCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることも可能ですが、一部機能が正常に動作しない場合があります。',
  },
  {
    title: '6. 情報の管理',
    body: '当社は、お客様の個人情報を適切に管理し、漏えい・滅失・毀損の防止に努めます。個人情報へのアクセスは必要な担当者に限定します。',
  },
  {
    title: '7. 保有期間',
    body: '個人情報は、利用目的の達成に必要な期間、または法令で定められた期間を保有します。',
  },
  {
    title: '8. 開示・訂正・削除のご請求',
    body: 'お客様は当社が保有する個人情報について、開示・訂正・削除・利用停止を請求することができます。ご請求は下記お問い合わせ先までご連絡ください。',
  },
  {
    title: '9. お問い合わせ',
    body: '個人情報の取り扱いに関するご質問・ご意見は、以下までご連絡ください。\n\nメールアドレス：【メールアドレス】',
  },
  {
    title: '10. プライバシーポリシーの変更',
    body: '当社は、法令の改正やサービスの変更に伴い、本ポリシーを改定することがあります。重要な変更は当サイト上でお知らせします。',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        {/* Header */}
        <div className="mb-14 border-b border-[#D4D0C9] pb-6">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
            Privacy
          </p>
          <h1 className="font-serif text-3xl font-bold text-[#111110]">
            プライバシーポリシー
          </h1>
          <p className="mt-4 text-xs text-[#9E9B97]">制定日：2025年【月】【日】</p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="mb-3 text-sm font-bold text-[#111110]">{s.title}</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[#7A7672]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-xs leading-relaxed text-[#9E9B97]">
          ※ 【】内の項目は公開前に実際の情報へご変更ください。
        </p>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
}

const rows = [
  { label: '販売業者', value: '【氏名または会社名】' },
  { label: '代表者名', value: '【代表者氏名】' },
  { label: '所在地', value: '〒【郵便番号】 【都道府県・市区町村・番地】' },
  { label: '電話番号', value: '【電話番号】（受付時間：平日 10:00〜18:00）' },
  { label: 'メールアドレス', value: '【メールアドレス】' },
  { label: 'サイトURL', value: 'https://【ドメイン】' },
  {
    label: '販売価格',
    value: 'Morning-Detox：¥2,480 / Night-Detox：¥2,480（税込）',
  },
  {
    label: '販売価格以外の費用',
    value: 'なし（インターネット接続料金はお客様負担となります）',
  },
  {
    label: '支払方法',
    value: 'クレジットカード（Visa・Mastercard・American Express・JCB）',
  },
  { label: '支払時期', value: '購入手続き完了時にご請求いたします。' },
  {
    label: 'コンテンツの引き渡し時期',
    value: '決済完了後、即時ダウンロード可能です。',
  },
  {
    label: '動作環境',
    value: 'MP3ファイルを再生できる端末（スマートフォン・タブレット・PC等）',
  },
  {
    label: '返品・キャンセルについて',
    value:
      'デジタルコンテンツの性質上、購入完了後の返品・キャンセル・返金はお断りしております。購入前に必ずサンプル音声にてご確認ください。',
  },
]

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        {/* Header */}
        <div className="mb-14 border-b border-[#D4D0C9] pb-6">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
            Legal
          </p>
          <h1 className="font-serif text-3xl font-bold text-[#111110]">
            特定商取引法に基づく表記
          </h1>
        </div>

        {/* Table */}
        <div className="divide-y divide-[#D4D0C9]">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-2 py-6 md:grid-cols-[200px_1fr]"
            >
              <p className="text-xs font-semibold tracking-wide text-[#111110]">
                {row.label}
              </p>
              <p className="text-sm leading-relaxed text-[#7A7672]">{row.value}</p>
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

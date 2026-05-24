'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: '購入後すぐに聴けますか？',
    a: 'はい、決済完了後すぐにMP3ファイルをダウンロードしてご利用ください。',
  },
  {
    q: '複数の商品を購入できますか？',
    a: 'もちろんです。各商品は個別に購入いただけます。',
  },
  {
    q: '返金対応はしていますか？',
    a: 'デジタルコンテンツの性質上、原則として返金はお断りしております。購入前にサンプル音声をご確認ください。',
  },
  {
    q: 'スマートフォンでも聴けますか？',
    a: 'はい。MP3ファイルをダウンロードして、スマートフォン・タブレット・PCでご利用いただけます。',
  },
  {
    q: '会員登録は必要ですか？',
    a: '会員登録は不要です。メールアドレスのみでゲスト購入いただけます。',
  },
  {
    q: '購入した音声はずっと聴けますか？',
    a: 'はい、一度購入すればアカウントが有効な限り永続的にアクセスできます。',
  },
]

export default function FaqSection() {
  return (
    <section className="bg-[#EFECE6] py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 border-b border-[#D4D0C9] pb-5"
        >
          <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">FAQ</p>
          <h2 className="font-serif text-3xl font-bold text-[#111110] md:text-4xl">
            よくある質問
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion className="divide-y divide-[#D4D0C9]">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="py-1"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-[#111110] hover:text-[#7A7672] hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-[#7A7672]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

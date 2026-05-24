'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Y.M（28歳）',
    role: 'デザイナー',
    comment: '起きてすぐSNSを見る癖がなくなりました。午前中の作業効率が全然違います。',
    product: 'デジタルデトックス朝活',
    index: '01',
  },
  {
    name: 'R.N（26歳）',
    role: 'フリーランス',
    comment: '夜中にずっとSNSを見ていた私が、22時にはスマホを置けるようになりました。',
    product: 'デジタルデトックス夜活',
    index: '02',
  },
  {
    name: 'H.I（33歳）',
    role: 'エンジニア',
    comment: '睡眠の質が明らかに改善されました。朝の目覚めが全然違います。',
    product: 'デジタルデトックス夜活',
    index: '03',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 border-b border-[#D4D0C9] pb-5"
        >
          <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
            Voices
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#111110] md:text-4xl">
            購入者の声
          </h2>
        </motion.div>

        <div className="divide-y divide-[#D4D0C9]">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[80px_1fr_200px] md:gap-10 md:py-10"
            >
              <span className="font-serif text-xs text-[#9E9B97]">{t.index}</span>
              <p className="font-serif text-lg leading-relaxed text-[#111110] md:text-xl">
                "{t.comment}"
              </p>
              <div className="md:text-right">
                <p className="text-sm font-semibold text-[#111110]">{t.name}</p>
                <p className="text-xs text-[#7A7672]">{t.role}</p>
                <p className="mt-2 text-[10px] tracking-[0.15em] uppercase text-[#9E9B97]">
                  {t.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

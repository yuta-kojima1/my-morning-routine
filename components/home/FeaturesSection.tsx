'use client'

import { motion } from 'framer-motion'

const features = [
  {
    label: 'I',
    title: 'すぐ聴ける',
    description: '購入後すぐにMP3をダウンロード。通勤中や準備しながら聴けます。',
  },
  {
    label: 'II',
    title: '購入後すぐにアクセス',
    description: '決済完了の瞬間からマイページでコンテンツにアクセスできます。',
  },
  {
    label: 'III',
    title: '繰り返し聴き放題',
    description: '一度購入すれば永続的にアクセス可能。何度でも聴き直せます。',
  },
  {
    label: 'IV',
    title: '安全・安心の決済',
    description: 'Stripeによる安全な決済処理。カード情報は当社サーバーに保存されません。',
  },
  {
    label: 'V',
    title: '朝活・夜活の2本',
    description: '朝活・夜活の2本。生活リズムに合わせて選べます。',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#EFECE6] py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 border-b border-[#D4D0C9] pb-5"
        >
          <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
            The Philosophy
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#111110] md:text-4xl">
            なぜ選ばれるのか
          </h2>
        </motion.div>

        {/* 左：大きな引用テキスト / 右：フィーチャーリスト */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-serif text-4xl font-bold leading-snug text-[#111110] md:text-5xl">
              スマホを置いた<br />その瞬間から、<br />本当の休息が<br />始まる。
            </p>
            <p className="mt-6 text-xs tracking-[0.2em] uppercase text-[#9E9B97]">
              — For Mornings, Philosophy
            </p>
          </motion.div>

          <div className="divide-y divide-[#D4D0C9]">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-6 py-5"
              >
                <span className="mt-0.5 w-6 shrink-0 font-serif text-xs text-[#9E9B97]">{f.label}</span>
                <div>
                  <p className="mb-1 text-sm font-semibold text-[#111110]">{f.title}</p>
                  <p className="text-xs leading-relaxed text-[#7A7672]">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

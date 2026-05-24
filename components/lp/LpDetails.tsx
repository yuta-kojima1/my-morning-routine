'use client'

import { motion } from 'framer-motion'
import type { ProductMeta } from '@/lib/products'
import AudioPlayer from './AudioPlayer'
import PurchaseButton from './PurchaseButton'

export default function LpDetails({ product }: { product: ProductMeta }) {
  return (
    <>
      {/* サンプル音声 */}
      <section className="bg-[#EFECE6] py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 border-b border-[#D4D0C9] pb-5"
          >
            <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
              Sample
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#111110]">まずは聴いてみよう</h2>
          </motion.div>
          <AudioPlayer src={product.sampleAudioPath} accentColor={product.accentColor} />
          <p className="mt-3 text-xs text-[#9E9B97]">※ サンプルは約30秒です</p>
        </div>
      </section>

      {/* こんな人におすすめ */}
      <section className="bg-[#F5F3EF] py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 border-b border-[#D4D0C9] pb-5">
              <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">For You</p>
              <h2 className="font-serif text-2xl font-bold text-[#111110]">こんな人におすすめ</h2>
            </div>
            <ul className="divide-y divide-[#D4D0C9]">
              {product.recommendedFor.map((item, i) => (
                <li key={i} className="flex items-center gap-4 py-4 text-sm text-[#111110]">
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#9E9B97]">
                    0{i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 収録内容 */}
      <section className="bg-[#EFECE6] py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 border-b border-[#D4D0C9] pb-5">
              <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">Contents</p>
              <h2 className="font-serif text-2xl font-bold text-[#111110]">収録内容</h2>
            </div>
            <div className="divide-y divide-[#D4D0C9]">
              {[
                { label: '収録時間', value: product.duration },
                { label: 'ファイル形式', value: product.format },

                { label: 'アクセス方法', value: 'ダウンロード（MP3）' },
                { label: '視聴期限', value: '無期限' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-4">
                  <span className="text-xs tracking-[0.1em] uppercase text-[#9E9B97]">{row.label}</span>
                  <span className="text-sm font-semibold text-[#111110]">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 得られる効果 */}
      <section className="bg-[#F5F3EF] py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 border-b border-[#D4D0C9] pb-5">
              <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">Benefits</p>
              <h2 className="font-serif text-2xl font-bold text-[#111110]">このプログラムで得られること</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.features.map((feature, i) => (
                <div key={i} className="border border-[#D4D0C9] p-5">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#9E9B97] mb-2">
                    0{i + 1}
                  </p>
                  <p className="text-sm text-[#111110]">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 購入者の声 */}
      <section className="bg-[#EFECE6] py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 border-b border-[#D4D0C9] pb-5">
              <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">Reviews</p>
              <h2 className="font-serif text-2xl font-bold text-[#111110]">購入者の声</h2>
            </div>
            <div className="divide-y divide-[#D4D0C9]">
              {product.testimonials.map((t, i) => (
                <div key={i} className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[60px_1fr]">
                  <span className="font-serif text-xs text-[#9E9B97]">0{i + 1}</span>
                  <div>
                    <p className="font-serif text-lg leading-relaxed text-[#111110]">"{t.comment}"</p>
                    <div className="mt-3 flex items-center gap-3">
                      <p className="text-xs font-semibold text-[#111110]">{t.name}</p>
                      <span className="text-[#D4D0C9]">—</span>
                      <p className="text-xs text-[#7A7672]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 購入 CTA（末尾） */}
      <section className="bg-[#111110] py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
              今すぐ始めよう
            </p>
            <h2 className="mb-3 font-serif text-3xl font-bold text-[#F5F3EF]">{product.name}</h2>
            <p className="mb-8 font-serif text-5xl font-bold text-[#F5F3EF]">
              ¥{product.price.toLocaleString()}
            </p>
            <PurchaseButton product={product} size="lg" />
            <p className="mt-6 text-xs text-[#7A7672]">
              ※ デジタルコンテンツのため返金はお断りしております。サンプル音声をご確認の上ご購入ください。
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

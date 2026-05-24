'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'

export default function ProductGrid() {
  return (
    <section id="products" className="bg-[#F5F3EF] py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-baseline justify-between border-b border-[#D4D0C9] pb-5"
        >
          <div>
            <p className="mb-1 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
              Our Programs
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#111110] md:text-4xl">
              Collection
            </h2>
          </div>
          <span className="text-xs text-[#9E9B97]">2 Programs</span>
        </motion.div>

        {/* カードリスト — エディトリアルなスタック */}
        <div className="divide-y divide-[#D4D0C9]">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              <Link href={`/products/${product.slug}`} className="group flex items-center justify-between py-8 md:py-10">
                <div className="flex items-start gap-6 md:gap-10">
                  {/* 番号 */}
                  <span className="mt-1 w-6 shrink-0 text-[10px] text-[#9E9B97]">
                    0{i + 1}
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#111110] transition group-hover:translate-x-1 duration-300 md:text-3xl">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#7A7672]">{product.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <span className="hidden text-lg font-semibold text-[#111110] md:block">
                    ¥{product.price.toLocaleString()}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center border border-[#D4D0C9] text-[#7A7672] transition group-hover:bg-[#111110] group-hover:border-[#111110] group-hover:text-[#F5F3EF] duration-300">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

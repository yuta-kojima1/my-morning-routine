'use client'

import { motion } from 'framer-motion'
import type { ProductMeta } from '@/lib/products'
import PurchaseButton from './PurchaseButton'

export default function LpHero({ product }: { product: ProductMeta }) {
  const hasImage = !!product.heroImage

  return (
    <section
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-20 pt-32"
      style={
        hasImage
          ? {
              backgroundImage: `url(${product.heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }
          : { backgroundColor: '#F5F3EF' }
      }
    >
      {/* 画像がある場合のみダークオーバーレイ */}
      {hasImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      )}

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        {/* ラベル */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`mb-6 text-[10px] font-semibold tracking-[0.35em] uppercase ${hasImage ? 'text-white/60' : 'text-[#9E9B97]'}`}
        >
          {product.id === 'night-detox' ? 'Night Audio Program' : 'Morning Audio Program'}
        </motion.p>

        {/* 商品名 */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`font-serif text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight ${hasImage ? 'text-white' : 'text-[#111110]'}`}
        >
          {product.name}
        </motion.h1>

        {/* キャッチコピー */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className={`mt-5 font-serif text-xl md:text-2xl ${hasImage ? 'text-white/80' : 'text-[#7A7672]'}`}
          style={{ whiteSpace: 'pre-line' }}
        >
          {product.catchphrase}
        </motion.p>

        {/* ディバイダー */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className={`mt-10 mb-8 h-px w-full ${hasImage ? 'bg-white/30' : 'bg-[#D4D0C9]'}`}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-baseline gap-2">
            <span className={`font-serif text-4xl font-bold ${hasImage ? 'text-white' : 'text-[#111110]'}`}>
              ¥{product.price.toLocaleString()}
            </span>
            <span className={`text-xs ${hasImage ? 'text-white/60' : 'text-[#9E9B97]'}`}>（税込）</span>
          </div>
          <PurchaseButton product={product} size="lg" hasImage={hasImage} />
        </motion.div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-10 flex flex-col items-center gap-3"
      >
        <span className={`[writing-mode:vertical-rl] text-[9px] tracking-[0.3em] uppercase ${hasImage ? 'text-white/50' : 'text-[#9E9B97]'}`}>
          Scroll
        </span>
        <div className={`h-12 w-px ${hasImage ? 'bg-white/40' : 'bg-[#9E9B97]'}`} />
      </motion.div>
    </section>
  )
}

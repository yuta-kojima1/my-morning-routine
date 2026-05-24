'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-[#F5F3EF] pb-20 pt-32">
      {/* 上部ラベル */}
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#9E9B97]"
        >
          The Collection
        </motion.p>

        {/* メイン見出し — セリフ体・極太・左寄せ */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3rem,10vw,7.5rem)] font-bold leading-[0.9] tracking-tight text-[#111110]"
        >
          Digital
          <br />
          Detox
          <br />
          <span className="text-[#9E9B97]">Program.</span>
        </motion.h1>

        {/* ディバイダー */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="mt-10 mb-8 h-px w-full bg-[#D4D0C9]"
        />

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-sm text-sm leading-relaxed text-[#7A7672]"
          >
            スマホから離れる時間をつくる。<br />
            朝と夜の音声プログラムが、<br />
            デジタル依存を静かにほどいていく。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-6"
          >
            <a
              href="#products"
              className="border border-[#111110] bg-[#111110] px-8 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F3EF] transition hover:bg-[#333]"
            >
              Collection を見る
            </a>
            <a
              href="#features"
              className="text-xs tracking-[0.15em] uppercase text-[#7A7672] underline underline-offset-4 transition hover:text-[#111110]"
            >
              About
            </a>
          </motion.div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-10 flex flex-col items-center gap-3"
      >
        <span className="[writing-mode:vertical-rl] text-[9px] tracking-[0.3em] uppercase text-[#9E9B97]">
          Scroll
        </span>
        <div className="h-12 w-px bg-[#9E9B97]" />
      </motion.div>
    </section>
  )
}

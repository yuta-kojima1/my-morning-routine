import type { Metadata } from 'next'
import { getProduct } from '@/lib/products'
import LpHero from '@/components/lp/LpHero'
import LpDetails from '@/components/lp/LpDetails'

export const metadata: Metadata = {
  title: 'デジタルデトックス朝活',
  description: 'スマホを触らない朝が、一日を変える。起床後のデジタルデトックス音声プログラム。',
}

export default function MorningDetoxPage() {
  const product = getProduct('morning-detox')!
  return (
    <>
      <LpHero product={product} />
      <LpDetails product={product} />
    </>
  )
}

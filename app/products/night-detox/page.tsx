import type { Metadata } from 'next'
import { getProduct } from '@/lib/products'
import LpHero from '@/components/lp/LpHero'
import LpDetails from '@/components/lp/LpDetails'

export const metadata: Metadata = {
  title: 'デジタルデトックス夜活',
  description: '寝る1時間前にスマホを置く習慣から。ナイトルーティンのデジタルデトックス音声プログラム。',
}

export default function NightDetoxPage() {
  const product = getProduct('night-detox')!
  return (
    <>
      <LpHero product={product} />
      <LpDetails product={product} />
    </>
  )
}

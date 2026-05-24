'use client'

import { useState } from 'react'
import type { ProductMeta } from '@/lib/products'

type Props = {
  product: ProductMeta
  size?: 'md' | 'lg'
  hasImage?: boolean
}

export default function PurchaseButton({ product, size = 'md', hasImage = false }: Props) {
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      })

      if (!res.ok) throw new Error('Checkout failed')

      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      console.error(err)
      alert('エラーが発生しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  const base = 'font-semibold tracking-[0.12em] uppercase transition disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = hasImage
    ? {
        lg: 'border border-white px-10 py-4 text-sm text-white hover:bg-white hover:text-[#111110]',
        md: 'border border-white px-8 py-3 text-xs text-white hover:bg-white hover:text-[#111110]',
      }
    : {
        lg: 'border border-[#111110] px-10 py-4 text-sm bg-[#111110] text-[#F5F3EF] hover:bg-[#333]',
        md: 'border border-[#111110] px-8 py-3 text-xs bg-[#111110] text-[#F5F3EF] hover:bg-[#333]',
      }

  return (
    <button onClick={handlePurchase} disabled={loading} className={`${base} ${sizes[size]}`}>
      {loading ? '処理中...' : '今すぐ購入する'}
    </button>
  )
}

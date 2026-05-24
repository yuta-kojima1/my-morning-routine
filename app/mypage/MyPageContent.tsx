'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/lib/products'
import AudioPlayer from '@/components/lp/AudioPlayer'

type Purchase = {
  id: string
  product_id: string
  purchased_at: string
  product: { name: string } | null
}

export default function MyPageContent({ purchases }: { purchases: Purchase[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => {
        const meta = PRODUCTS.find((p) => p.id === purchase.product_id)
        const isOpen = activeId === purchase.id

        return (
          <div
            key={purchase.id}
            className="rounded-2xl border border-white/10 bg-[#141414] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{meta?.emoji ?? '🎵'}</span>
                <div>
                  <p className="font-semibold text-white">
                    {purchase.product?.name ?? purchase.product_id}
                  </p>
                  <p className="text-xs text-gray-500">
                    購入日: {new Date(purchase.purchased_at).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveId(isOpen ? null : purchase.id)}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/40"
                >
                  {isOpen ? '閉じる' : '再生する'}
                </button>
              </div>
            </div>

            {isOpen && meta && (
              <div className="border-t border-white/10 p-6">
                <AudioPlayer src="/sample.mp3" accentColor={meta.accentColor} />
                <p className="mt-3 text-xs text-gray-600">
                  ※ 実際のコンテンツはSupabase Storageの音声ファイルと接続後にご利用いただけます
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

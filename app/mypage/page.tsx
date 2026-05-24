import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { PRODUCTS } from '@/lib/products'
import MyPageContent from './MyPageContent'

export default async function MyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: purchases } = await supabase
    .from('purchases')
    .select('*, product:products(*)')
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('purchased_at', { ascending: false })

  const serviceClient = await createServiceClient()
  const purchasesWithUrls = await Promise.all(
    (purchases ?? []).map(async (purchase) => {
      const meta = PRODUCTS.find((p) => p.id === purchase.product_id)
      if (!meta) return { ...purchase, audioUrl: null }

      const { data } = await serviceClient.storage
        .from('products')
        .createSignedUrl(meta.audioPath, 3600)

      return { ...purchase, audioUrl: data?.signedUrl ?? null }
    }),
  )

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">マイページ</h1>
          <p className="mt-1 text-gray-500">{user.email}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">購入済みコンテンツ</h2>
        </div>

        {purchasesWithUrls.length > 0 ? (
          <MyPageContent purchases={purchasesWithUrls} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#141414] p-12 text-center">
            <p className="mb-2 text-2xl">🎵</p>
            <p className="text-gray-400">購入済みのコンテンツはまだありません</p>
            <a
              href="/#products"
              className="mt-4 inline-block rounded-full bg-amber-500 px-6 py-2 text-sm font-bold text-black transition hover:bg-amber-400"
            >
              商品を見る
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

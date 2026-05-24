import { stripe } from '@/lib/stripe/client'
import { createServiceClient } from '@/lib/supabase/server'
import { getProduct } from '@/lib/products'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams

  if (!session_id) {
    return <ErrorView message="セッション情報が見つかりません。" />
  }

  let productName = ''
  let downloadUrl: string | null = null

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status !== 'paid') {
      return <ErrorView message="決済が完了していません。" />
    }

    const productId = session.metadata?.product_id
    const product = productId ? getProduct(productId) : undefined

    if (!product) {
      return <ErrorView message="商品情報が見つかりません。" />
    }

    productName = product.name

    const supabase = await createServiceClient()
    const { data } = await supabase.storage
      .from('products')
      .createSignedUrl(product.audioPath, 60 * 60) // 1時間有効

    downloadUrl = data?.signedUrl ?? null
  } catch (err) {
    console.error(err)
    return <ErrorView message="エラーが発生しました。サポートにご連絡ください。" />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3EF] px-4 pt-16">
      <div className="max-w-md w-full text-center">
        <p className="mb-6 text-5xl">✓</p>
        <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9E9B97]">
          Purchase Complete
        </p>
        <h1 className="mb-4 font-serif text-3xl font-bold text-[#111110]">
          ご購入ありがとうございます
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-[#7A7672]">
          {productName} のダウンロードリンクです。
          <br />
          リンクは1時間有効です。お早めにダウンロードください。
        </p>

        {downloadUrl ? (
          <a
            href={downloadUrl}
            download
            className="inline-block border border-[#111110] bg-[#111110] px-10 py-4 text-sm font-semibold tracking-[0.12em] uppercase text-[#F5F3EF] transition hover:bg-[#333]"
          >
            音声をダウンロード
          </a>
        ) : (
          <p className="text-sm text-[#9E9B97]">
            ダウンロードリンクの生成に失敗しました。サポートにご連絡ください。
          </p>
        )}

        <div className="mt-10">
          <Link
            href="/"
            className="text-xs tracking-[0.1em] uppercase text-[#9E9B97] transition hover:text-[#111110]"
          >
            ← トップに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}

function ErrorView({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3EF] px-4 pt-16">
      <div className="max-w-md w-full text-center">
        <p className="mb-4 text-sm text-[#7A7672]">{message}</p>
        <Link
          href="/"
          className="text-xs tracking-[0.1em] uppercase text-[#9E9B97] transition hover:text-[#111110]"
        >
          ← トップに戻る
        </Link>
      </div>
    </div>
  )
}

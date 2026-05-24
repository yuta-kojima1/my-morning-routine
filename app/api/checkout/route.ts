import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { PRODUCTS } from '@/lib/products'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { productId } = await req.json()
  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!

  const session = await stripe.checkout.sessions.create({
    client_reference_id: user.id,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: { name: product.name },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      product_id: productId,
    },
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/products/${product.slug}`,
  })

  return NextResponse.json({ url: session.url })
}

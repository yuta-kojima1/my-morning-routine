import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createServiceClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const productId = session.metadata?.product_id
    const userId = session.client_reference_id

    if (!productId || !userId) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    await supabase.from('purchases').upsert(
      {
        user_id: userId,
        product_id: productId,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        amount_paid: session.amount_total ?? 0,
        status: 'completed',
      },
      { onConflict: 'stripe_session_id' },
    )
  }

  return NextResponse.json({ received: true })
}

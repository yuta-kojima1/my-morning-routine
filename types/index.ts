export type Product = {
  id: string
  name: string
  description: string
  price_jpy: number
  stripe_price_id: string
  audio_path: string
  sample_audio_path: string
  is_active: boolean
  created_at: string
}

export type Purchase = {
  id: string
  user_id: string
  product_id: string
  stripe_session_id: string
  stripe_payment_intent_id: string
  amount_paid: number
  status: 'pending' | 'completed' | 'refunded'
  purchased_at: string
  product?: Product
}

export type Profile = {
  id: string
  email: string
  display_name: string | null
  created_at: string
  updated_at: string
}

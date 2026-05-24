'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PRODUCTS } from '@/lib/products'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#D4D0C9] bg-[#F5F3EF]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="text-sm font-bold tracking-[0.2em] uppercase text-[#111110]">
          For Mornings
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {PRODUCTS.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="text-xs tracking-[0.12em] uppercase text-[#7A7672] transition hover:text-[#111110]"
            >
              {p.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
        </div>
      </div>
    </header>
  )
}

'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'

const schema = z.object({
  email: z.email('正しいメールアドレスを入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
})

type FormData = z.infer<typeof schema>

function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/mypage'

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません')
      setLoading(false)
      return
    }
    router.push(redirect)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-[#D4D0C9] p-8 space-y-6">
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#7A7672]">
          メールアドレス
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full border border-[#D4D0C9] bg-transparent px-4 py-3 text-sm text-[#111110] placeholder-[#C4C1BB] outline-none focus:border-[#111110]"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#7A7672]">
          パスワード
        </label>
        <input
          {...register('password')}
          type="password"
          className="w-full border border-[#D4D0C9] bg-transparent px-4 py-3 text-sm text-[#111110] placeholder-[#C4C1BB] outline-none focus:border-[#111110]"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-[#111110] bg-[#111110] py-3 text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F3EF] transition hover:bg-[#333] disabled:opacity-50"
      >
        {loading ? 'ログイン中...' : 'ログイン'}
      </button>

      <p className="text-center text-xs text-[#7A7672]">
        アカウントをお持ちでない方は{' '}
        <Link href="/auth/signup" className="text-[#111110] underline underline-offset-2">
          会員登録
        </Link>
      </p>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3EF] px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="text-sm font-bold tracking-[0.2em] uppercase text-[#111110]">
            For Mornings
          </Link>
          <h1 className="mt-6 font-serif text-3xl font-bold text-[#111110]">ログイン</h1>
        </div>
        <Suspense fallback={<div className="h-64 border border-[#D4D0C9] bg-[#EFECE6] animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}

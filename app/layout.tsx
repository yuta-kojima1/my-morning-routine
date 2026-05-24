import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const notoSans = Noto_Sans_JP({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const notoSerif = Noto_Serif_JP({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'For Mornings | 朝活音声プログラム',
    template: '%s | For Mornings',
  },
  description:
    'スマホ依存・デジタル疲れを音声でほどく。朝活・夜活の2本セット。デジタルデトックスを習慣化する音声プログラム。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'For Mornings',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen bg-[#F5F3EF] font-sans text-[#111110] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

'use client'

import { useState } from 'react'

export default function DownloadButton({ url, filename }: { url: string; filename: string }) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
    } catch {
      window.open(url, '_blank')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-block border border-[#111110] bg-[#111110] px-10 py-4 text-sm font-semibold tracking-[0.12em] uppercase text-[#F5F3EF] transition hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'ダウンロード中...' : '音声をダウンロード'}
    </button>
  )
}

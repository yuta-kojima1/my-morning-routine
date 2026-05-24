import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#D4D0C9] bg-[#F5F3EF] py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-[#111110]">
              For Mornings
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[#7A7672]">
              朝の静寂が、<br />あなたを変える。
            </p>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#9E9B97]">
              Programs
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#products"
                  className="text-xs tracking-wide text-[#7A7672] transition hover:text-[#111110]"
                >
                  Digital Detox Program.
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#9E9B97]">
              Legal
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/legal" className="text-xs tracking-wide text-[#7A7672] transition hover:text-[#111110]">
                  特定商取引法に基づく表記
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs tracking-wide text-[#7A7672] transition hover:text-[#111110]">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-14 border-t border-[#D4D0C9] pt-6 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#9E9B97]">
            © 2025 For Mornings
          </p>
          <p className="text-[10px] tracking-[0.1em] uppercase text-[#9E9B97]">
            Designed for stillness
          </p>
        </div>
      </div>
    </footer>
  )
}

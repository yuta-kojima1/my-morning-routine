import HeroSection from '@/components/home/HeroSection'
import ProductGrid from '@/components/home/ProductGrid'
import FeaturesSection from '@/components/home/FeaturesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FaqSection from '@/components/home/FaqSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />

      {/* Final CTA */}
      <section className="bg-[#111110] py-28 text-center">
        <p className="mb-4 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#9E9B97]">
          Begin Now
        </p>
        <h2 className="mb-8 font-serif text-3xl font-bold text-[#F5F3EF] md:text-5xl [text-wrap:balance]">
          スマホを置いた朝と夜が、<br />あなたを変えていく。
        </h2>
        <a
          href="#products"
          className="inline-block border border-[#F5F3EF] px-10 py-4 text-xs font-semibold tracking-[0.15em] uppercase text-[#F5F3EF] transition hover:bg-[#F5F3EF] hover:text-[#111110]"
        >
          Collection を見る
        </a>
      </section>
    </>
  )
}

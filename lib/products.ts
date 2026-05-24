export type ProductMeta = {
  id: string
  slug: string
  name: string
  shortDescription: string
  catchphrase: string
  accentColor: string
  gradientFrom: string
  gradientTo: string
  emoji: string
  targetAudience: string[]
  features: string[]
  duration: string
  format: string

  price: number
  sampleAudioPath: string
  audioPath: string
  heroImage?: string
  testimonials: { name: string; role: string; comment: string; rating: number }[]
  recommendedFor: string[]
}

export const PRODUCTS: ProductMeta[] = [
  {
    id: 'morning-detox',
    slug: 'morning-detox',
    name: 'Morning-Detox',
    shortDescription: 'スマホを触らない朝が、一日を変える。',
    catchphrase: 'スマホを触らない朝が、\n一日を変える。',
    accentColor: '#7EB99F',
    gradientFrom: '#0D2B22',
    gradientTo: '#0A0A0A',
    emoji: '🌿',
    targetAudience: ['朝起きてすぐスマホを見てしまう方', 'SNSや動画を無意識に見てしまう方', '午前中に集中力が出ない方', 'デジタル習慣を見直したい方'],
    features: ['小さな習慣を積み重ねることで、自信が育つ', 'ドーパミンに振り回されにくくなる', '集中力と落ち着きを取り戻せる', '自分のペースで生きる感覚が戻ってくる'],
    duration: '約7分',
    format: 'MP3',

    price: 2480,
    sampleAudioPath: '/audio/samples/morning-detox-sample.mp3',
    audioPath: 'products/morning-detox.mp3',
    heroImage: '/images/morning-hero.png',
    testimonials: [
      { name: 'Y.M（28歳）', role: 'デザイナー', comment: '起きてすぐSNSを見る癖がなくなりました。午前中の作業効率が全然違います。', rating: 5 },
      { name: 'K.T（31歳）', role: '会社員', comment: 'スマホなし朝活を始めて2週間。頭がクリアな状態で仕事に入れるようになりました。', rating: 5 },
      { name: 'A.S（24歳）', role: '大学院生', comment: '最初は不安でしたが、聴き流すだけで自然とルーティンが身につきました。', rating: 4 },
    ],
    recommendedFor: ['朝イチでスマホを触る習慣がある方', 'SNS依存が気になっている方', '午前中の生産性を上げたい方', 'デジタルと距離を置きたい方'],
  },
  {
    id: 'night-detox',
    slug: 'night-detox',
    name: 'Night-Detox',
    shortDescription: '寝る1時間前にスマホを置く、その習慣から。',
    catchphrase: '寝る1時間前に\nスマホを置く、その習慣から。',
    accentColor: '#8B7EC8',
    gradientFrom: '#1A1030',
    gradientTo: '#0A0A0A',
    emoji: '🌙',
    targetAudience: ['寝る直前までスマホを見てしまう方', '睡眠の質が悪いと感じている方', '夜にSNSや動画が止められない方', '翌朝すっきり起きられない方'],
    features: ['デジタル刺激の制御', 'スマホ依存解消', '余白を感じる技術', 'セルフコントロール能力'],
    duration: '約10分',
    format: 'MP3',

    price: 2480,
    sampleAudioPath: '/audio/samples/night-detox-sample.mp3',
    audioPath: 'products/night-detox.mp3',
    heroImage: '/images/night-hero.png',
    testimonials: [
      { name: 'R.N（26歳）', role: 'フリーランス', comment: '夜中にずっとSNSを見ていた私が、22時にはスマホを置けるようになりました。', rating: 5 },
      { name: 'H.I（33歳）', role: 'エンジニア', comment: '睡眠の質が明らかに改善されました。朝の目覚めが全然違います。', rating: 5 },
      { name: 'M.K（29歳）', role: '看護師', comment: '仕事の疲れをスマホで紛らわす癖があったのですが、夜の過ごし方を変えてから自然と手が伸びなくなりました。', rating: 4 },
    ],
    recommendedFor: ['睡眠の質を改善したい方', '夜のSNS・動画習慣を断ちたい方', '翌朝の目覚めをよくしたい方', 'デジタル疲れを感じている方'],
  },
]

export function getProduct(slug: string): ProductMeta | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

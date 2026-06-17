import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Zap, Award } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import ArticleCard from '@/components/ArticleCard'
import AdSense from '@/components/AdSense'
import { products, articles, news, weeklyPicks } from '@/lib/data'

export const metadata = {
  title: 'تك بلس - عالم التكنولوجيا | مراجعات ومقارنات',
  description: 'أفضل موقع تقني عربي يقدم مراجعات شاملة، مقارنات دقيقة، شروحات تقنية، وأخبار التكنولوجيا',
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const latestArticles = articles.slice(0, 3)
  const latestNews = news.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 md:p-12 mb-12">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">اكتشف عالم التكنولوجيا</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            مراجعات شاملة، مقارنات دقيقة، وشروحات مفصلة لمساعدتك في اختيار أفضل الأجهزة
          </p>
          <div className="flex gap-4">
            <Link
              href="/reviews"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              استكشف المراجعات
            </Link>
            <Link
              href="/comparisons"
              className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              قارن الأجهزة
            </Link>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-1/2 h-full opacity-20">
          <Image
            src="/images/hero-tech.png"
            alt="تكنولوجيا"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* AdSense Top */}
      <AdSense slot="1234567890" style={{ display: 'block', height: '90px' }} />

      {/* Weekly Picks */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            اختيارات الأسبوع
          </h2>
          <Link href="/weekly-picks" className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
            عرض الكل <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weeklyPicks.map((pick, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <Image src={pick.image} alt={pick.product} fill className="object-cover" />
              </div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{pick.category}</span>
              <h3 className="font-bold text-xl mt-1 mb-2">{pick.product}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{pick.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-500" />
            أحدث الأجهزة
          </h2>
          <Link href="/mobiles" className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
            عرض الكل <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AdSense Middle */}
      <AdSense slot="2345678901" format="fluid" layout="in-article" />

      {/* Latest Articles */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            أحدث المراجعات والمقالات
          </h2>
          <Link href="/reviews" className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
            عرض الكل <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Tech News */}
      <section className="mb-12">
        <h2 className="section-title mb-6">أخبار التكنولوجيا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md card-hover">
                <div className="relative h-48">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-600 dark:text-blue-400">{item.category}</span>
                  <h3 className="font-bold mt-1 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{item.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-12">
        <h2 className="section-title mb-6">تصفح حسب القسم</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'الموبايلات', href: '/mobiles', icon: '📱', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
            { name: 'اللابتوبات', href: '/laptops', icon: '💻', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
            { name: 'السماعات', href: '/audio', icon: '🎧', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' },
            { name: 'كروت الشاشة', href: '/gpus', icon: '🎮', color: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
            { name: 'المعالجات', href: '/processors', icon: '⚡', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' },
            { name: 'الشروحات', href: '/tutorials', icon: '📚', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`${cat.color} rounded-xl p-6 text-center hover:scale-105 transition-transform`}
            >
              <span className="text-3xl mb-2 block">{cat.icon}</span>
              <span className="font-bold text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Ad */}
      <AdSense slot="3456789012" style={{ display: 'block', height: '250px' }} />
    </div>
  )
}

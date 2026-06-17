import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Eye, Share2, Bookmark, Heart, MessageCircle } from 'lucide-react'
import AdSense from '@/components/AdSense'
import { articles } from '@/lib/data'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  return {
    title: `${article?.title || 'مقال'} | تك بلس`,
    description: article?.excerpt,
  }
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find(a => a.slug === params.slug) || articles[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <span className="mx-2">/</span>
        <Link href="/articles" className="hover:text-blue-600">المقالات</Link>
        <span className="mx-2">/</span>
        <span>{article.title}</span>
      </nav>

      <article>
        <header className="mb-8">
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {article.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {article.views.toLocaleString()} مشاهدة</span>
            <span>{article.date}</span>
          </div>
        </header>

        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <AdSense slot="article-top" style={{ display: 'block', marginBottom: '2rem' }} />

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <h2>مقدمة</h2>
          <p>في هذا المقال الشامل، سنغوص في تفاصيل هذا الجهاز الرائع ونستكشف كل ما يميزه عن المنافسين...</p>

          <h2>المواصفات التقنية</h2>
          <ul>
            <li>معالج قوي يضمن أداء سلس</li>
            <li>شاشة عالية الدقة بتردد مرتفع</li>
            <li>بطارية تدوم طوال اليوم</li>
            <li>كاميرا متطورة للتصوير الاحترافي</li>
          </ul>

          <h2>التصميم والبناء</h2>
          <p>يأتي الجهاز بتصميم أنيق يجمع بين القوة والأناقة، مع مواد عالية الجودة تضمن المتانة...</p>

          <AdSense slot="article-mid" format="fluid" layout="in-article" />

          <h2>الأداء في الاستخدام اليومي</h2>
          <p>خلال فترة الاختبار التي استمرت أسبوعين، أظهر الجهاز أداءً استثنائياً في جميع المهام...</p>

          <h2>الكاميرا</h2>
          <p>تعد الكاميرا من أبرز نقاط القوة في هذا الجهاز، حيث تقدم صوراً نابضة بالحياة...</p>

          <h2>البطارية والشحن</h2>
          <p>تستمر البطارية لأكثر من 10 ساعات من الاستخدام المكثف، مع دعم الشحن السريع...</p>

          <h2>الخلاصة</h2>
          <p>بعد هذا الاستعراض الشامل، يمكننا القول بأن هذا الجهاز يقدم قيمة ممتازة مقابل السعر...</p>
        </div>

        <AdSense slot="article-bottom" style={{ display: 'block', marginTop: '2rem' }} />

        <div className="flex items-center justify-between py-6 border-t dark:border-gray-700">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Heart className="w-5 h-5" />
              <span>أعجبني</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Bookmark className="w-5 h-5" />
              <span>حفظ</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>مشاركة</span>
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            التعليقات
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <textarea
              placeholder="اكتب تعليقك..."
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 mb-4"
              rows={4}
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              إرسال التعليق
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

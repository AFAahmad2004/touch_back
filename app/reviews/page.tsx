import { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/lib/data'

export const metadata: Metadata = {
  title: 'المراجعات التقنية | تك بلس',
  description: 'مراجعات شاملة ومفصلة لأحدث الأجهزة التقنية',
}

export default function ReviewsPage() {
  const reviews = articles.filter(a => a.category === 'مراجعات')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">المراجعات</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">مراجعات شاملة بمعايير دقيقة</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ArticleCard key={review.id} article={review} />
        ))}
      </div>
    </div>
  )
}

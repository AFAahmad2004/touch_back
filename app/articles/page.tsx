import { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/lib/data'

export const metadata: Metadata = {
  title: 'المقالات التعليمية | تك بلس',
  description: 'مقالات تعليمية في عالم التكنولوجيا والبرمجة',
}

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">المقالات التعليمية</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">تعلم وتعمق في عالم التقنية</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { articles } from '@/lib/data'

export const metadata: Metadata = {
  title: 'الشروحات التقنية | تك بلس',
  description: 'شروحات مفصلة ودروس تقنية في البرمجة، الشبكات، الأمن السيبراني، والأجهزة',
}

export default function TutorialsPage() {
  const tutorials = articles.filter(a => a.category === 'شروحات')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">الشروحات التقنية</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">تعلم وطور مهاراتك التقنية</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

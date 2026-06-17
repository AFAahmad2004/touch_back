import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { newsAPI } from '@/lib/api'
import { news as localNews } from '@/lib/data'

export const metadata: Metadata = {
  title: 'أخبار التكنولوجيا | تك بلس',
  description: 'آخر أخبار التكنولوجيا والأجهزة الإلكترونية',
}

export default async function NewsPage() {
  let newsList: any[] = []
  try {
    const data = await newsAPI.getAll('limit=20')
    newsList = data.news
  } catch {
    newsList = localNews
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">أخبار التكنولوجيا</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">تابع آخر مستجدات عالم التكنولوجيا</p>
      {newsList.length === 0 ? (
        <div className="text-center py-16 text-gray-500"><p className="text-lg">لا توجد أخبار حالياً</p></div>
      ) : (
        <div className="space-y-6">
          {newsList.map((item: any) => (
            <Link key={item.id} href={`/news/${item.slug || item.id}`} className="block group">
              <div className="flex gap-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md card-hover">
                <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={item.image || item.coverImage || 'https://placehold.co/400x300/1e40af/white?text=News'}
                    alt={item.title}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-sm text-blue-600 dark:text-blue-400">{item.category}</span>
                  <h2 className="text-xl font-bold mt-1 group-hover:text-blue-600 transition-colors">{item.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{item.excerpt}</p>
                  <span className="text-sm text-gray-400 mt-2 block">
                    {item.date || new Date(item.publishedAt || item.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
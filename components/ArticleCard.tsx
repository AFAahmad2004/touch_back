import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, Eye } from 'lucide-react'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    excerpt: string
    image: string
    author: string
    date: string
    readTime: string
    views: number
    category: string
    slug: string
  }
  variant?: 'default' | 'horizontal' | 'featured'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <div className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg card-hover">
        <div className="relative h-64 md:h-80">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 right-0 p-6 text-white">
            <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              {article.category}
            </span>
            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-200 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {article.author}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden card-hover">
        <div className="relative w-32 md:w-48 flex-shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-center">
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{article.category}</span>
          <h3 className="font-bold text-lg mt-1 mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/${article.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden card-hover h-full">
        <div className="relative h-48">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{article.category}</span>
          <h3 className="font-bold text-lg mt-1 mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">{article.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

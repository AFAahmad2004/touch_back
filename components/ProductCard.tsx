'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, GitCompare } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    image: string
    price: string | number
    rating: number
    category: string | { name: string; slug: string }
    specs: string[] | Record<string, string> | null
    badge?: string
    brand?: string
    currency?: string
    slug?: string
  }
}

const PLACEHOLDER = 'https://placehold.co/400x300/1e40af/white?text=No+Image'

function getSafeImage(image: string): string {
  if (!image) return PLACEHOLDER
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return PLACEHOLDER
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryName = typeof product.category === 'object'
    ? product.category?.name
    : product.category

  const priceDisplay = typeof product.price === 'number'
    ? `${product.price.toLocaleString()} ${product.currency || 'ر.س'}`
    : product.price

  const specsList = Array.isArray(product.specs)
    ? product.specs.slice(0, 3)
    : product.specs && typeof product.specs === 'object'
    ? Object.values(product.specs).slice(0, 3)
    : []

  const productHref = `/product/${product.slug || product.id}`

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden card-hover group">
      <div className="relative">
        <Image
          src={getSafeImage(product.image)}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER
          }}
        />
        {product.badge && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
        <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700">
            <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700">
            <GitCompare className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
          {categoryName}
        </span>
        <h3 className="font-bold text-lg mt-1 mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-500 mr-1">({product.rating})</span>
        </div>

        <div className="space-y-1 mb-4">
          {specsList.map((spec: any, i) => (
            <p key={i} className="text-xs text-gray-500 dark:text-gray-400">• {String(spec)}</p>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
            {priceDisplay}
          </span>
          <Link
            href={productHref}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </div>
  )
}
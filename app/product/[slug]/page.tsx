import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, ArrowRight, ShoppingCart, Heart, GitCompare, CheckCircle, XCircle } from 'lucide-react'
import { productsAPI } from '@/lib/api'
import { products as localProducts } from '@/lib/data'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  try {
    const data = await productsAPI.getOne(params.slug)
    return {
      title: `${data.product.name} | تك بلس`,
      description: data.product.description,
    }
  } catch {
    return { title: 'المنتج | تك بلس' }
  }
}

export default async function ProductPage({ params }: Props) {
  let product: any = null

  // جلب من الباك اند أولاً
  try {
    const data = await productsAPI.getOne(params.slug)
    product = data.product
  } catch {
    // fallback للبيانات المحلية
    product = localProducts.find(p => p.id === params.slug || params.slug === params.slug)
  }

  if (!product) return notFound()

  // معالجة البيانات
  const categoryName = typeof product.category === 'object'
    ? product.category?.name
    : product.category

  const priceDisplay = typeof product.price === 'number'
    ? `${product.price.toLocaleString()} ${product.currency || 'ر.س'}`
    : product.price

  const specsList = Array.isArray(product.specs)
    ? product.specs
    : product.specs && typeof product.specs === 'object'
    ? Object.entries(product.specs)
    : []

  const specsIsEntries = specsList.length > 0 && Array.isArray(specsList[0])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
        <ArrowRight className="w-4 h-4" />
        <Link href={`/${product.category?.slug || 'mobiles'}`} className="hover:text-blue-600">
          {categoryName}
        </Link>
        <ArrowRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">

        {/* الصورة */}
        <div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
            <Image
              src={product.image || 'https://placehold.co/600x400/1e40af/white?text=No+Image'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4"
            />
            {product.isFeatured && (
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                مميز
              </span>
            )}
          </div>

          {/* صور إضافية */}
          {product.images?.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((img: string, i: number) => (
                <div key={i} className="relative h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors">
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="100px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* المعلومات */}
        <div>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
            {categoryName}
          </span>

          <h1 className="text-3xl font-bold mt-3 mb-2">{product.name}</h1>

          {product.brand && (
            <p className="text-gray-500 dark:text-gray-400 mb-4">الماركة: <span className="font-medium text-gray-700 dark:text-gray-200">{product.brand}</span></p>
          )}

          {/* التقييم */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="font-bold text-lg">{product.rating}</span>
            {product.reviewCount > 0 && (
              <span className="text-gray-500 text-sm">({product.reviewCount} تقييم)</span>
            )}
          </div>

          {/* السعر */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">السعر</p>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{priceDisplay}</p>
          </div>

          {/* الوصف */}
          {product.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{product.description}</p>
          )}

          {/* أزرار الإجراء */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              <ShoppingCart className="w-5 h-5" />
              أضف للمقارنة
            </button>
            <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <GitCompare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* المواصفات */}
      {specsList.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">المواصفات التقنية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specsIsEntries
              ? specsList.map(([key, value]: [string, any], i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{key}</span>
                    <span className="font-medium text-sm">{String(value)}</span>
                  </div>
                ))
              : specsList.map((spec: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{String(spec)}</span>
                  </div>
                ))
            }
          </div>
        </div>
      )}

      {/* التقييمات */}
      {product.reviews?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">آراء المستخدمين</h2>
          <div className="space-y-4">
            {product.reviews.map((review: any) => (
              <div key={review.id} className="border-b dark:border-gray-700 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {review.user?.name?.[0] || 'م'}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{review.user?.name || 'مستخدم'}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                {review.title && <p className="font-medium text-sm mb-1">{review.title}</p>}
                {review.content && <p className="text-gray-600 dark:text-gray-300 text-sm">{review.content}</p>}
                {review.pros?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {review.pros.map((pro: string, i: number) => (
                      <span key={i} className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" /> {pro}
                      </span>
                    ))}
                  </div>
                )}
                {review.cons?.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {review.cons.map((con: string, i: number) => (
                      <span key={i} className="flex items-center gap-1 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                        <XCircle className="w-3 h-3" /> {con}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
import { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import AdSense from '@/components/AdSense'
import { productsAPI } from '@/lib/api'
import { products as localProducts } from '@/lib/data' // fallback

export const metadata: Metadata = {
  title: 'أفضل الموبايلات ومراجعاتها | تك بلس',
  description: 'تعرف على أحدث الموبايلات، مواصفاتها، أسعارها، ومراجعاتنا الشاملة لها',
}

export default async function MobilesPage() {
  // جلب البيانات من الباك اند
  let mobiles = []
  try {
    const data = await productsAPI.getAll('category=mobiles&limit=20')
    mobiles = data.products
  } catch (err) {
    // fallback للبيانات المحلية لو الباك اند مش شغال
    console.warn('الباك اند غير متاح، جاري استخدام البيانات المحلية')
    mobiles = localProducts.filter(p => p.category === 'موبايلات')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">قسم الموبايلات</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        أحدث الموبايلات مع مراجعات شاملة ومقارنات دقيقة
      </p>

      <AdSense slot="4567890123" />

      <div className="flex flex-wrap gap-3 mb-8">
        {['الكل', 'سامسونج', 'أبل', 'شاومي', 'ون بلس', 'جوجل', 'ريلمي'].map((brand, i) => (
          <button
            key={brand}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {mobiles.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">لا توجد منتجات حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mobiles.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <AdSense slot="5678901234" format="fluid" />
      </div>
    </div>
  )
}
import { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import { productsAPI } from '@/lib/api'
import { products as localProducts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'كروت الشاشة: NVIDIA و AMD | تك بلس',
  description: 'مراجعات شاملة ومقارنات لكروت الشاشة',
}

export default async function GPUsPage() {
  let gpus: any[] = []
  try {
    const data = await productsAPI.getAll('category=gpus&limit=20')
    gpus = data.products
  } catch {
    gpus = localProducts.filter(p => p.category === 'كروت شاشة')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">كروت الشاشة</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">أداء خرافي لألعابك ومشاريعك</p>
      {gpus.length === 0 ? (
        <div className="text-center py-16 text-gray-500"><p>لا توجد منتجات حالياً</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gpus.map((product: any) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  )
}
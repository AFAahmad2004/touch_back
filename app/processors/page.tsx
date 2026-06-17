import { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import { productsAPI } from '@/lib/api'
import { products as localProducts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'المعالجات و AI Chips | تك بلس',
  description: 'دليل المعالجات: Intel Core و AMD Ryzen',
}

export default async function ProcessorsPage() {
  let processors: any[] = []
  try {
    const data = await productsAPI.getAll('category=processors&limit=20')
    processors = data.products
  } catch {
    processors = localProducts.filter(p => p.category === 'معالجات')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">المعالجات و AI Chips</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">قوة المعالجة لأداء لا يُضاهى</p>
      {processors.length === 0 ? (
        <div className="text-center py-16 text-gray-500"><p>لا توجد منتجات حالياً</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processors.map((product: any) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  )
}
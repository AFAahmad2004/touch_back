import { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import AdSense from '@/components/AdSense'
import { productsAPI } from '@/lib/api'
import { products as localProducts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'أفضل اللابتوبات ومراجعاتها | تك بلس',
  description: 'دليلك الشامل لاختيار اللابتوب المناسب',
}

export default async function LaptopsPage() {
  let laptops: any[] = []
  try {
    const data = await productsAPI.getAll('category=laptops&limit=20')
    laptops = data.products
  } catch {
    laptops = localProducts.filter(p => p.category === 'لابتوبات')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">قسم اللابتوبات</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">أفضل اللابتوبات للألعاب، البرمجة، التصميم، والاستخدام اليومي</p>
      <AdSense slot="6789012345" />
      {laptops.length === 0 ? (
        <div className="text-center py-16 text-gray-500"><p className="text-lg">لا توجد منتجات حالياً</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {laptops.map((product: any) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
      <AdSense slot="7890123456" style={{ display: 'block', marginTop: '2rem' }} />
    </div>
  )
}
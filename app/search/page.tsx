'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    brand: 'all',
    rating: 'all'
  })

  const filteredProducts = products.filter(p => {
    const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = filters.category === 'all' || p.category === filters.category
    return matchesQuery && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">البحث والفلترة</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">ابحث عن أي جهاز وقارن بين الخيارات</p>

      <form className="relative mb-8">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="ابحث عن موبايل، لابتوب، كرت شاشة..."
          className="w-full px-4 py-4 pr-12 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-8 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="font-bold">فلترة النتائج</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <select 
            className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="all">جميع الأقسام</option>
            <option value="موبايلات">الموبايلات</option>
            <option value="لابتوبات">اللابتوبات</option>
            <option value="كروت شاشة">كروت الشاشة</option>
            <option value="معالجات">المعالجات</option>
          </select>

          <select className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <option value="all">جميع الأسعار</option>
            <option value="low">أقل من 2000 ر.س</option>
            <option value="mid">2000 - 5000 ر.س</option>
            <option value="high">أكثر من 5000 ر.س</option>
          </select>

          <select className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <option value="all">جميع الماركات</option>
            <option value="samsung">سامسونج</option>
            <option value="apple">أبل</option>
            <option value="asus">أسوس</option>
          </select>

          <select className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <option value="all">جميع التقييمات</option>
            <option value="5">5 نجوم</option>
            <option value="4">4+ نجوم</option>
            <option value="3">3+ نجوم</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">لا توجد نتائج مطابقة لبحثك</p>
        </div>
      )}
    </div>
  )
}

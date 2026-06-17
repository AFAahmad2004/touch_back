'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Minus } from 'lucide-react'
import { products } from '@/lib/data'

export default function ComparePage() {
  const searchParams = useSearchParams()
  const ids = searchParams.get('ids')?.split(',') || []

  const compareProducts = products.filter(p => ids.includes(p.id))
  const specs = ['الشاشة', 'المعالج', 'الذاكرة', 'التخزين', 'البطارية', 'الكاميرا']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">مقارنة الأجهزة</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">قارن بين الأجهزة لاختيار الأفضل</p>

      {compareProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">اختر جهازين على الأقل للمقارنة</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <thead>
              <tr>
                <th className="p-4 text-right border-b dark:border-gray-700">المواصفة</th>
                {compareProducts.map((product) => (
                  <th key={product.id} className="p-4 text-center border-b dark:border-gray-700 min-w-[200px]">
                    <div className="relative w-32 h-32 mx-auto mb-2">
                      <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" />
                    </div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">{product.price}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 font-medium border-b dark:border-gray-700">التقييم</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center border-b dark:border-gray-700">
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < p.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              {specs.map((spec, i) => (
                <tr key={spec} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}>
                  <td className="p-4 font-medium border-b dark:border-gray-700">{spec}</td>
                  {compareProducts.map((p) => (
                    <td key={p.id} className="p-4 text-center border-b dark:border-gray-700 text-sm">
                      {p.specs[i] || <Minus className="w-4 h-4 mx-auto text-gray-400" />}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 font-medium">الإجراء</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      عرض التفاصيل
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

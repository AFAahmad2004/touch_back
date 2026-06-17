import { Metadata } from 'next'
import Image from 'next/image'
import { DollarSign } from 'lucide-react'
import { budgetGuides } from '@/lib/data'

export const metadata: Metadata = {
  title: 'أفضل الأجهزة حسب السعر | تك بلس',
  description: 'دليل الشراء حسب الميزانية: أفضل الأجهزة في كل فئة سعرية',
}

export default function BudgetGuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">أفضل الأجهزة حسب السعر</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">اختار ميزانيتك وشوف الأفضل</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {budgetGuides.map((guide, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md card-hover">
            <div className="relative h-48">
              <Image src={guide.image} alt={guide.range} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <h2 className="text-white font-bold text-xl flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {guide.range}
                </h2>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-3">أفضل الخيارات:</h3>
              <ul className="space-y-2">
                {guide.products.map((product, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {j + 1}
                    </span>
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

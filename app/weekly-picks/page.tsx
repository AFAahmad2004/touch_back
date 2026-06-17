import { Metadata } from 'next'
import Image from 'next/image'
import { Star, CheckCircle } from 'lucide-react'
import { weeklyPicks } from '@/lib/data'

export const metadata: Metadata = {
  title: 'أفضل اختيارات الأسبوع | تك بلس',
  description: 'اختيارات محررينا الأسبوعية لأفضل الأجهزة التقنية',
}

export default function WeeklyPicksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">أفضل اختيارات الأسبوع</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">محررينا يختارون لك الأفضل</p>

      <div className="space-y-8">
        {weeklyPicks.map((pick, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={pick.image} alt={pick.product} fill className="object-cover" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-blue-600 dark:text-blue-400 font-medium">{pick.category}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{pick.product}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{pick.reason}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>موصى به من فريق التحرير</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

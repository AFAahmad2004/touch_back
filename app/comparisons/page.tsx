import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GitCompare, ArrowLeft } from 'lucide-react'
import { comparisons } from '@/lib/data'

export const metadata: Metadata = {
  title: 'مقارنات الأجهزة | تك بلس',
  description: 'قارن بين الموبايلات، اللابتوبات، كروت الشاشة، والمعالجات',
}

export default function ComparisonsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">المقارنات</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">قارن بين الأجهزة واختار الأفضل لك</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((comp) => (
          <Link key={comp.id} href={`/compare?ids=${comp.devices.map(d => d.toLowerCase().replace(/\s+/g, '-')).join(',')}`} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{comp.title}</h3>
                <GitCompare className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                  <Image src={comp.image} alt={comp.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  {comp.devices.map((device, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-sm">{device}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                  الفائز: {comp.winner}
                </span>
                <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'السماعات والإكسسوارات التقنية | تك بلس',
  description: 'أفضل السماعات، الساعات الذكية، الشواحن، وإكسسوارات التكنولوجيا',
}

export default function AudioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">السماعات والإكسسوارات</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">اكتشف أفضل السماعات والإكسسوارات التقنية</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {['سماعات رأس', 'سماعات لاسلكية', 'ساعات ذكية', 'شواحن', 'كيابل', 'حماية'].map((sub) => (
          <div key={sub} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-bold text-lg">{sub}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

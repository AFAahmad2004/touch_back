import { Metadata } from 'next'
import { Mail, MapPin, Phone, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'تواصل معنا | تك بلس',
  description: 'تواصل مع فريق تك بلس للاستفسارات والاقتراحات والإعلانات',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">تواصل معنا</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">نحن هنا لمساعدتك والاستماع لاقتراحاتك</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">معلومات التواصل</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>info@techplus.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="font-bold mb-2">للإعلانات والتعاون</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              للاستفسارات حول الإعلانات والشراكات التجارية، يرجى التواصل على:
              ads@techplus.com
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">أرسل رسالة</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">الاسم</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الموضوع</label>
              <select className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500">
                <option>استفسار عام</option>
                <option>اقتراح محتوى</option>
                <option>إعلانات</option>
                <option>شكوى</option>
                <option>أخرى</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الرسالة</label>
              <textarea rows={4} className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send className="w-4 h-4" />
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

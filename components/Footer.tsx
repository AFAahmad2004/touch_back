import Link from 'next/link'
import { Cpu, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">تك بلس</span>
            </div>
            <p className="text-sm leading-relaxed">
              منصتك الأولى لعالم التكنولوجيا. نقدم مراجعات شاملة، مقارنات دقيقة، وشروحات مفصلة لمساعدتك في اتخاذ أفضل القرارات التقنية.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">أقسام الموقع</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mobiles" className="hover:text-blue-400 transition-colors">الموبايلات</Link></li>
              <li><Link href="/laptops" className="hover:text-blue-400 transition-colors">اللابتوبات</Link></li>
              <li><Link href="/audio" className="hover:text-blue-400 transition-colors">السماعات والإكسسوارات</Link></li>
              <li><Link href="/gpus" className="hover:text-blue-400 transition-colors">كروت الشاشة</Link></li>
              <li><Link href="/processors" className="hover:text-blue-400 transition-colors">المعالجات</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">تواصل معنا</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">شروط الاستخدام</Link></li>
              <li><Link href="/admin" className="hover:text-blue-400 transition-colors">لوحة التحكم</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@techplus.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +966 50 123 4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2024 تك بلس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}

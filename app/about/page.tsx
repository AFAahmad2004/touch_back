import { Metadata } from 'next'
import { Users, Target, Award, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'من نحن | تك بلس',
  description: 'تعرف على فريق تك بلس ورسالتنا في تقديم المحتوى التقني الموثوق',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">من نحن</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Target className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">رسالتنا</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
          نسعى في تك بلس لتقديم محتوى تقني موثوق وشامل يساعد المستخدم العربي في اتخاذ قراراته التقنية بثقة. 
          نؤمن بأن التكنولوجيا يجب أن تكون في متناول الجميع، ونعمل على تبسيط المفاهيم المعقدة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
          <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">فريق متخصص</h3>
          <p className="text-sm text-gray-500">فريق من الخبراء والمهتمين بالتكنولوجيا</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
          <Award className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">مصداقية عالية</h3>
          <p className="text-sm text-gray-500">مراجعات مستقلة واختبارات دقيقة</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
          <Globe className="w-10 h-10 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">محتوى عربي</h3>
          <p className="text-sm text-gray-500">نقدم المحتوى باللغة العربية باحترافية</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4">فريق العمل</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'أحمد محمد', role: 'رئيس التحرير', bio: 'خبير تقني بخبرة 10 سنوات في مراجعة الأجهزة' },
            { name: 'خالد العلي', role: 'محرر الأخبار', bio: 'يتابع آخر مستجدات عالم التكنولوجيا لحظة بلحظة' },
            { name: 'سامي الدوسري', role: 'محرر المراجعات', bio: 'متخصص في اختبارات الأداء والمقارنات' },
            { name: 'فهد السالم', role: 'محرر الشروحات', bio: 'يقدم شروحات مبسطة للمفاهيم التقنية المعقدة' },
          ].map((member) => (
            <div key={member.name} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-lg">{member.name[0]}</span>
              </div>
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                <p className="text-sm text-gray-500 mt-1">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

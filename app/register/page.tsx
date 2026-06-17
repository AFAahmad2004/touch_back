'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, UserPlus, Zap, CheckCircle } from 'lucide-react'
import { authAPI } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // قوة كلمة المرور
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' }
    if (password.length < 6) return { strength: 1, label: 'ضعيفة', color: 'bg-red-500' }
    if (password.length < 8) return { strength: 2, label: 'متوسطة', color: 'bg-yellow-500' }
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { strength: 4, label: 'قوية جداً', color: 'bg-green-500' }
    return { strength: 3, label: 'جيدة', color: 'bg-blue-500' }
  }

  const passwordStrength = getPasswordStrength(form.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // التحقق
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('يرجى ملء جميع الحقول')
      return
    }
    if (form.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('كلمة المرور وتأكيدها غير متطابقتان')
      return
    }

    setLoading(true)
    try {
      const data = await authAPI.register({
        name: form.name,
        email: form.email,
        password: form.password,
      })

      // حفظ التوكن
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      setSuccess(true)
      setTimeout(() => router.push('/'), 2000)
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إنشاء الحساب')
    } finally {
      setLoading(false)
    }
  }

  // شاشة النجاح
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">تم إنشاء الحساب بنجاح!</h2>
          <p className="text-gray-500">جاري توجيهك للرئيسية...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-blue-600">
            <Zap className="w-8 h-8" />
            تك بلس
          </Link>
          <h1 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">إنشاء حساب جديد</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">انضم إلى مجتمع تك بلس</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl p-4 mb-6 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* الاسم */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* البريد */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                dir="ltr"
              />
            </div>

            {/* كلمة المرور */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="8 أحرف على الأقل"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* مؤشر قوة كلمة المرور */}
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    قوة كلمة المرور: <span className="font-medium">{passwordStrength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* تأكيد كلمة المرور */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="أعد كتابة كلمة المرور"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 transition-all ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? 'border-red-400 focus:ring-red-400'
                      : form.confirmPassword && form.password === form.confirmPassword
                      ? 'border-green-400 focus:ring-green-400'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">كلمتا المرور غير متطابقتان</p>
              )}
            </div>

            {/* الموافقة على الشروط */}
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" required className="mt-1 rounded" />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                أوافق على{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">شروط الاستخدام</Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">سياسة الخصوصية</Link>
              </label>
            </div>

            {/* زر التسجيل */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          </form>

          {/* رابط تسجيل الدخول */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            ← العودة للرئيسية
          </Link>
        </p>
      </div>
    </div>
  )
}
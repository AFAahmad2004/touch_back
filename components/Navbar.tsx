'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Smartphone,
  Laptop,
  Headphones,
  Cpu,
  BookOpen,
  Newspaper,
  GitCompare,
  DollarSign,
  Star,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react'
import { useTheme } from 'next-themes'

const navLinks = [
  { href: '/', label: 'الرئيسية', icon: null },
  { href: '/mobiles', label: 'الموبايلات', icon: Smartphone },
  { href: '/laptops', label: 'اللابتوبات', icon: Laptop },
  { href: '/audio', label: 'السماعات', icon: Headphones },
  { href: '/gpus', label: 'كروت الشاشة', icon: Cpu },
  { href: '/processors', label: 'المعالجات', icon: Cpu },
  { href: '/tutorials', label: 'الشروحات', icon: BookOpen },
  { href: '/news', label: 'الأخبار', icon: Newspaper },
  { href: '/comparisons', label: 'المقارنات', icon: GitCompare },
  { href: '/budget-guides', label: 'حسب السعر', icon: DollarSign },
  { href: '/weekly-picks', label: 'اختيارات الأسبوع', icon: Star },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // جلب بيانات المستخدم من localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
  }, [pathname]) // إعادة التحقق عند تغيير الصفحة

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setUserMenuOpen(false)
    router.push('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-blue-600 dark:text-blue-400">تك بلس</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* قائمة المزيد */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-1">
                المزيد
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block border dark:border-gray-700">
                {navLinks.slice(6).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* أزرار اليمين */}
          <div className="flex items-center gap-2">

            {/* البحث */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* الوضع الليلي */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* ===== أزرار تسجيل الدخول / المستخدم ===== */}
            {user ? (
              // مستخدم مسجّل — قائمة منسدلة
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
                >
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0] || 'U'}
                  </div>
                  <span className="max-w-[80px] truncate">{user.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {userMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 border dark:border-gray-700">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      {(user.role === 'ADMIN' || user.role === 'EDITOR') && (
                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-2 py-0.5 rounded-full mt-1 inline-block">
                          {user.role}
                        </span>
                      )}
                    </div>
                    {(user.role === 'ADMIN' || user.role === 'EDITOR') && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User className="w-4 h-4" />
                        لوحة التحكم
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // غير مسجّل — زرا تسجيل الدخول والتسجيل
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  دخول
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* زر القائمة للموبايل */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* شريط البحث */}
      {searchOpen && (
        <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-3xl mx-auto">
            <form action="/search" className="relative">
              <input
                type="text"
                name="q"
                placeholder="ابحث عن موبايل، لابتوب، مراجعة..."
                className="w-full px-4 py-3 pr-12 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </form>
          </div>
        </div>
      )}

      {/* القائمة للموبايل */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                </span>
              </Link>
            ))}

            {/* أزرار الدخول في الموبايل */}
            <div className="border-t dark:border-gray-700 pt-3 mt-3">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-500">
                    مرحباً، <span className="font-bold text-gray-800 dark:text-white">{user.name}</span>
                  </div>
                  {(user.role === 'ADMIN' || user.role === 'EDITOR') && (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="w-4 h-4" />
                      لوحة التحكم
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    تسجيل الدخول
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    إنشاء حساب جديد
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
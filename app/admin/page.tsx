'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  Trash2,
  TrendingUp,
  RefreshCw,
  MessageCircle,
  Package,
  Layers
} from 'lucide-react'
import { adminAPI } from '@/lib/api'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [recentArticles, setRecentArticles] = useState<any[]>([])
  const [topArticles, setTopArticles] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [comments, setComments] = useState<any[]>([])
  const [error, setError] = useState('')

  const fetchStats = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminAPI.getStats()
      setStats(data.stats)
      setRecentArticles(data.recentArticles || [])
      setTopArticles(data.topArticles || [])
    } catch (err: any) {
      setError('تعذّر الاتصال بالسيرفر — تأكد من تشغيل الباك اند')
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const data = await adminAPI.getUsers()
      setUsers(data.users || [])
    } catch {}
  }

  const fetchComments = async () => {
    try {
      const data = await adminAPI.getComments()
      setComments(data.comments || [])
    } catch {}
  }

  // ✅ التحقق من التوكن أولاً قبل أي طلب
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    if (!token) {
      router.push('/login')
      return
    }

    if (!['ADMIN', 'EDITOR'].includes(user?.role)) {
      router.push('/')
      return
    }

    fetchStats()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    if (activeTab === 'users') fetchUsers()
    if (activeTab === 'comments') fetchComments()
  }, [activeTab])

  const handleDeleteComment = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف التعليق؟')) return
    try {
      await adminAPI.deleteComment(id)
      setComments(prev => prev.filter(c => c.id !== id))
    } catch {
      alert('فشل حذف التعليق')
    }
  }

  const handleUpdateUserRole = async (id: string, role: string) => {
    try {
      await adminAPI.updateUser(id, { role })
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u))
    } catch {
      alert('فشل تحديث المستخدم')
    }
  }

  const statCards = stats ? [
    { label: 'إجمالي المنتجات', value: stats.totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'إجمالي المقالات', value: stats.totalArticles, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'الأخبار', value: stats.totalNews, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'المستخدمون', value: stats.totalUsers, icon: Users, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'التعليقات', value: stats.totalComments, icon: MessageCircle, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    { label: 'التقييمات', value: stats.totalReviews, icon: BarChart3, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  ] : []

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen p-4 hidden md:block">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">لوحة التحكم</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
              { id: 'users', label: 'المستخدمين', icon: Users },
              { id: 'comments', label: 'التعليقات', icon: MessageCircle },
              { id: 'settings', label: 'الإعدادات', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}

            {/* رابط إدارة المحتوى */}
            <div className="border-t dark:border-gray-700 pt-2 mt-2">
              <Link
                href="/admin/content"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Layers className="w-5 h-5" />
                إدارة المحتوى
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">

          {/* داشبورد */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">لوحة التحكم</h1>
                <button
                  onClick={fetchStats}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  تحديث
                </button>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl p-4 mb-6">
                  ⚠️ {error}
                  <button
                    onClick={() => router.push('/login')}
                    className="mr-3 underline text-sm"
                  >
                    تسجيل الدخول مجدداً
                  </button>
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md animate-pulse">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2" />
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {statCards.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                      <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <h3 className="text-3xl font-bold">{stat.value?.toLocaleString() ?? 0}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 border-b dark:border-gray-700">
                    <h2 className="font-bold">آخر المقالات</h2>
                  </div>
                  <div className="divide-y dark:divide-gray-700">
                    {recentArticles.length === 0 ? (
                      <p className="p-4 text-gray-500 text-sm">لا توجد مقالات</p>
                    ) : recentArticles.map((article) => (
                      <div key={article.id} className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{article.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{article.views?.toLocaleString()} مشاهدة</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.status === 'PUBLISHED'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700'
                        }`}>
                          {article.status === 'PUBLISHED' ? 'منشور' : 'مسودة'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 border-b dark:border-gray-700">
                    <h2 className="font-bold">الأكثر مشاهدة</h2>
                  </div>
                  <div className="divide-y dark:divide-gray-700">
                    {topArticles.length === 0 ? (
                      <p className="p-4 text-gray-500 text-sm">لا توجد بيانات</p>
                    ) : topArticles.map((article, i) => (
                      <div key={article.id} className="p-4 flex items-center gap-3">
                        <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{article.title}</p>
                          <p className="text-xs text-gray-400">{article.views?.toLocaleString()} مشاهدة</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* المستخدمون */}
          {activeTab === 'users' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">إدارة المستخدمين</h1>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">الاسم</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">البريد</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">الدور</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">الحالة</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">تغيير الدور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {users.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">لا توجد مستخدمون</td></tr>
                    ) : users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 font-medium">{user.name}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                            user.role === 'EDITOR' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {user.isActive ? 'نشط' : 'موقوف'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                            className="text-sm border dark:border-gray-600 rounded-lg px-2 py-1 bg-gray-50 dark:bg-gray-900"
                          >
                            <option value="USER">USER</option>
                            <option value="EDITOR">EDITOR</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* التعليقات */}
          {activeTab === 'comments' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">إدارة التعليقات</h1>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">المستخدم</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">التعليق</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">المقال</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">الإجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {comments.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">لا توجد تعليقات</td></tr>
                    ) : comments.map((comment) => (
                      <tr key={comment.id}>
                        <td className="px-6 py-4 text-sm font-medium">{comment.user?.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{comment.content}</td>
                        <td className="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 truncate max-w-xs">{comment.article?.title}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDeleteComment(comment.id)}
                            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* الإعدادات */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">الإعدادات</h1>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <p className="text-gray-500">قسم الإعدادات قيد التطوير...</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
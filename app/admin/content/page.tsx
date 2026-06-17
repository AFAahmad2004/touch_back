'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Search, Filter,
  FileText, Package, Newspaper, X, Save, ChevronDown,
  CheckCircle, AlertCircle, Image as ImageIcon, Tag,
  ArrowUpDown, MoreVertical, Globe, Lock, Clock,
  Layers, Zap, RefreshCw, Upload
} from 'lucide-react'

// ===== Types =====
type ContentType = 'articles' | 'products' | 'news'
type Status = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'

interface Post {
  id: string
  title?: string
  name?: string
  slug: string
  status?: Status
  isActive?: boolean
  views?: number
  createdAt: string
  category?: any
  type?: string
  price?: number
  rating?: number
  brand?: string
}

// ===== API =====
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token')
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...options,
  })
  if (!res.ok) throw new Error((await res.json()).error || 'خطأ في الطلب')
  return res.json()
}

// ===== Toast =====
function Toast({ msg, type, onClose }: { msg: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  return (
    <div className={`fixed bottom-6 left-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-medium transition-all animate-slide-up ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {msg}
      <button onClick={onClose} className="mr-2 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
    </div>
  )
}

// ===== Modal إنشاء/تعديل =====
function ContentModal({
  open, onClose, type, item, categories, onSave
}: {
  open: boolean; onClose: () => void; type: ContentType
  item?: Post | null; categories: any[]; onSave: () => void
}) {
  const [form, setForm] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isEdit = !!item

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || item.name || '',
        name: item.name || item.title || '',
        slug: item.slug || '',
        status: item.status || 'DRAFT',
        type: item.type || 'ARTICLE',
        categoryId: typeof item.category === 'object' ? item.category?.id : '',
        price: item.price || '',
        brand: item.brand || '',
        rating: item.rating || 0,
      })
    } else {
      setForm({
        status: 'DRAFT', type: type === 'articles' ? 'ARTICLE' : type === 'news' ? 'NEWS' : '',
        rating: 0, price: ''
      })
    }
    setError('')
  }, [item, open, type])

  const handleSubmit = async () => {
    setError(''); setLoading(true)
    try {
      const endpoint = type === 'articles' ? '/articles' : type === 'products' ? '/products' : '/news'
      const body = type === 'products'
        ? { name: form.name, brand: form.brand, price: parseFloat(form.price) || 0, categoryId: form.categoryId, rating: parseFloat(form.rating) || 0, slug: form.slug || form.name?.toLowerCase().replace(/\s+/g, '-') }
        : { title: form.title, status: form.status, type: form.type, categoryId: form.categoryId, content: form.content || form.title || '', excerpt: form.excerpt || '' }

      if (isEdit) await apiFetch(`${endpoint}/${item!.id}`, { method: 'PUT', body: JSON.stringify(body) })
      else await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(body) })

      onSave(); onClose()
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  if (!open) return null

  const titles = { articles: isEdit ? 'تعديل المقال' : 'مقال جديد', products: isEdit ? 'تعديل المنتج' : 'منتج جديد', news: isEdit ? 'تعديل الخبر' : 'خبر جديد' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${type === 'articles' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600' : type === 'products' ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-600'}`}>
              {type === 'articles' ? <FileText className="w-4 h-4" /> : type === 'products' ? <Package className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />}
            </div>
            <h2 className="text-lg font-bold">{titles[type]}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          {/* العنوان / الاسم */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              {type === 'products' ? 'اسم المنتج' : 'العنوان'} <span className="text-red-500">*</span>
            </label>
            <input
              value={type === 'products' ? form.name || '' : form.title || ''}
              onChange={e => setForm({ ...form, [type === 'products' ? 'name' : 'title']: e.target.value })}
              placeholder={type === 'products' ? 'مثال: Samsung Galaxy S24 Ultra' : 'أدخل العنوان...'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          {/* حقول المنتج */}
          {type === 'products' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">الماركة</label>
                <input value={form.brand || ''} onChange={e => setForm({ ...form, brand: e.target.value })}
                  placeholder="Samsung, Apple..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">السعر (ر.س)</label>
                <input type="number" value={form.price || ''} onChange={e => setForm({ ...form, price: e.target.value })}
                  placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
              </div>
            </div>
          )}

          {/* الملخص للمقالات */}
          {type !== 'products' && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">الملخص</label>
              <textarea value={form.excerpt || ''} onChange={e => setForm({ ...form, excerpt: e.target.value })}
                placeholder="وصف مختصر..." rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
            </div>
          )}

          {/* المحتوى للمقالات */}
          {type === 'articles' && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">المحتوى</label>
              <textarea value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="اكتب محتوى المقال هنا..." rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* التصنيف */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">التصنيف</label>
              <div className="relative">
                <select value={form.categoryId || ''} onChange={e => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none">
                  <option value="">اختر تصنيفاً</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* الحالة أو النوع */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {type === 'articles' ? 'نوع المحتوى' : 'الحالة'}
              </label>
              <div className="relative">
                {type === 'articles' ? (
                  <select value={form.type || 'ARTICLE'} onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none">
                    <option value="ARTICLE">مقال</option>
                    <option value="REVIEW">مراجعة</option>
                    <option value="TUTORIAL">شرح</option>
                    <option value="NEWS">خبر</option>
                    <option value="COMPARISON">مقارنة</option>
                  </select>
                ) : (
                  <select value={form.status || 'DRAFT'} onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none">
                    <option value="DRAFT">مسودة</option>
                    <option value="PUBLISHED">منشور</option>
                    <option value="ARCHIVED">مؤرشف</option>
                  </select>
                )}
                <ChevronDown className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* حالة النشر للمقالات */}
          {type === 'articles' && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">حالة النشر</label>
              <div className="flex gap-3">
                {[
                  { val: 'DRAFT', label: 'مسودة', icon: Lock, color: 'yellow' },
                  { val: 'PUBLISHED', label: 'منشور', icon: Globe, color: 'green' },
                  { val: 'ARCHIVED', label: 'مؤرشف', icon: Clock, color: 'gray' },
                ].map(({ val, label, icon: Icon, color }) => (
                  <button key={val} type="button" onClick={() => setForm({ ...form, status: val })}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.status === val
                        ? color === 'yellow' ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                          : color === 'green' ? 'border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'border-gray-400 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'
                    }`}>
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-6 py-4 flex gap-3 rounded-b-3xl">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            إلغاء
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold transition-colors">
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'جاري الحفظ...' : isEdit ? 'حفظ التعديلات' : 'نشر الآن'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== صف في الجدول =====
function ContentRow({ item, type, onEdit, onDelete, onToggle }: {
  item: Post; type: ContentType
  onEdit: () => void; onDelete: () => void; onToggle: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const title = item.title || item.name || '-'
  const status = item.status
  const isProduct = type === 'products'
  const categoryName = typeof item.category === 'object' ? item.category?.name : item.category

  const statusConfig: Record<string, { label: string; cls: string }> = {
    PUBLISHED: { label: 'منشور', cls: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' },
    DRAFT: { label: 'مسودة', cls: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
    ARCHIVED: { label: 'مؤرشف', cls: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' },
  }

  return (
    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
            type === 'articles' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600' :
            type === 'products' ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' :
            'bg-amber-100 dark:bg-amber-900/40 text-amber-600'
          }`}>
            {title[0]}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate max-w-[200px]">{title}</p>
            <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.slug}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4 hidden md:table-cell">
        {categoryName && (
          <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full font-medium">
            {categoryName}
          </span>
        )}
      </td>
      <td className="px-5 py-4 hidden lg:table-cell">
        {isProduct ? (
          <span className="font-bold text-sm text-purple-600 dark:text-purple-400">
            {typeof item.price === 'number' ? `${item.price.toLocaleString()} ر.س` : '-'}
          </span>
        ) : status ? (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[status]?.cls || ''}`}>
            {statusConfig[status]?.label || status}
          </span>
        ) : null}
      </td>
      <td className="px-5 py-4 hidden xl:table-cell">
        <span className="text-xs text-gray-400">
          {new Date(item.createdAt).toLocaleDateString('ar-SA')}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-1">
          {/* تعديل سريع */}
          <button onClick={onEdit}
            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors opacity-0 group-hover:opacity-100">
            <Edit2 className="w-4 h-4" />
          </button>

          {/* قائمة الخيارات */}
          <div className="relative" ref={ref}>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div className="absolute left-0 top-10 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 z-20">
                <button onClick={() => { onEdit(); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                  <Edit2 className="w-4 h-4 text-blue-500" /> تعديل
                </button>
                {!isProduct && (
                  <button onClick={() => { onToggle(); setMenuOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                    {status === 'PUBLISHED'
                      ? <><EyeOff className="w-4 h-4 text-yellow-500" /> إلغاء النشر</>
                      : <><Eye className="w-4 h-4 text-green-500" /> نشر</>}
                  </button>
                )}
                <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
                <button onClick={() => { onDelete(); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" /> حذف
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}

// ===== الصفحة الرئيسية =====
export default function ContentManagerPage() {
  const router = useRouter()
  const [activeType, setActiveType] = useState<ContentType>('articles')
  const [items, setItems] = useState<Post[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Post | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => setToast({ msg, type })

  // حماية — فقط الأدمن
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user?.role || !['ADMIN', 'EDITOR'].includes(user.role)) router.push('/login')
    fetchCategories()
  }, [])

  useEffect(() => { fetchItems() }, [activeType])

  const fetchCategories = async () => {
    try { const d = await apiFetch('/categories'); setCategories(d.categories || []) } catch {}
  }

  const fetchItems = async () => {
    setLoading(true)
    try {
      const endpoint = activeType === 'articles' ? '/articles?limit=50' : activeType === 'products' ? '/products?limit=50' : '/news?limit=50'
      const d = await apiFetch(endpoint)
      setItems(d.articles || d.products || d.news || [])
    } catch (e: any) { showToast(e.message, 'error') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id: string) => {
    try {
      const endpoint = activeType === 'articles' ? '/articles' : activeType === 'products' ? '/products' : '/news'
      await apiFetch(`${endpoint}/${id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(i => i.id !== id))
      showToast('تم الحذف بنجاح')
    } catch (e: any) { showToast(e.message, 'error') }
    setDeleteId(null)
  }

  const handleToggleStatus = async (item: Post) => {
    try {
      const newStatus = item.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
      const endpoint = activeType === 'articles' ? '/articles' : '/news'
      await apiFetch(`${endpoint}/${item.id}`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) })
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: newStatus as Status } : i))
      showToast(newStatus === 'PUBLISHED' ? 'تم النشر بنجاح' : 'تم إلغاء النشر')
    } catch (e: any) { showToast(e.message, 'error') }
  }

  // فلترة
  const filtered = items.filter(item => {
    const title = (item.title || item.name || '').toLowerCase()
    const matchSearch = !search || title.includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || item.status === statusFilter || (statusFilter === 'ACTIVE' && item.isActive)
    return matchSearch && matchStatus
  })

  const tabs = [
    { id: 'articles' as ContentType, label: 'المقالات', icon: FileText, count: items.length, color: 'blue' },
    { id: 'products' as ContentType, label: 'المنتجات', icon: Package, count: items.length, color: 'purple' },
    { id: 'news' as ContentType, label: 'الأخبار', icon: Newspaper, count: items.length, color: 'amber' },
  ]

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-600 text-white shadow-blue-200',
    purple: 'bg-purple-600 text-white shadow-purple-200',
    amber: 'bg-amber-500 text-white shadow-amber-200',
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <style>{`
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">إدارة المحتوى</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              محرر المحتوى
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              أنشئ وعدّل وانشر المحتوى بمرونة كاملة
            </p>
          </div>
          <button
            onClick={() => { setEditItem(null); setModalOpen(true) }}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            إضافة جديد
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 bg-white dark:bg-gray-900 p-1.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveType(tab.id); setSearch(''); setStatusFilter('all') }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeType === tab.id
                  ? `${colorMap[tab.color]} shadow-lg`
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث في المحتوى..."
              className="w-full pr-9 pl-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {activeType !== 'products' && (
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="pl-4 pr-8 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium"
              >
                <option value="all">جميع الحالات</option>
                <option value="PUBLISHED">منشور</option>
                <option value="DRAFT">مسودة</option>
                <option value="ARCHIVED">مؤرشف</option>
              </select>
              <Filter className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}

          <button onClick={fetchItems}
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <span className="text-sm text-gray-400 font-medium">
            {filtered.length} عنصر
          </span>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-5 py-3.5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">العنوان</th>
                <th className="px-5 py-3.5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">التصنيف</th>
                <th className="px-5 py-3.5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  {activeType === 'products' ? 'السعر' : 'الحالة'}
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider hidden xl:table-cell">التاريخ</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-5 py-4" colSpan={5}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
                        <div className="space-y-1.5">
                          <div className="h-3.5 w-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                          <div className="h-2.5 w-32 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">لا يوجد محتوى</p>
                      <button
                        onClick={() => { setEditItem(null); setModalOpen(true) }}
                        className="text-sm text-blue-600 hover:underline font-medium"
                      >
                        أضف أول عنصر
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map(item => (
                  <ContentRow
                    key={item.id}
                    item={item}
                    type={activeType}
                    onEdit={() => { setEditItem(item); setModalOpen(true) }}
                    onDelete={() => setDeleteId(item.id)}
                    onToggle={() => handleToggleStatus(item)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal إنشاء/تعديل */}
      <ContentModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null) }}
        type={activeType}
        item={editItem}
        categories={categories}
        onSave={() => { fetchItems(); showToast(editItem ? 'تم التعديل بنجاح' : 'تم الإضافة بنجاح') }}
      />

      {/* Dialog تأكيد الحذف */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">تأكيد الحذف</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                إلغاء
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">
                حذف نهائياً
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'حدث خطأ')
  return data
}

// ===== المنتجات =====
export const productsAPI = {
  getAll: (params = '') => fetchAPI(`/products?${params}`),
  getOne: (slug: string) => fetchAPI(`/products/${slug}`),
  create: (body: object) => fetchAPI('/products', { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: object) => fetchAPI(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id: string) => fetchAPI(`/products/${id}`, { method: 'DELETE' }),
  addReview: (productId: string, body: object) =>
    fetchAPI(`/products/${productId}/reviews`, { method: 'POST', body: JSON.stringify(body) }),
}

// ===== المقالات =====
export const articlesAPI = {
  getAll: (params = '') => fetchAPI(`/articles?${params}`),
  getOne: (slug: string) => fetchAPI(`/articles/${slug}`),
  create: (body: object) => fetchAPI('/articles', { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: object) => fetchAPI(`/articles/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id: string) => fetchAPI(`/articles/${id}`, { method: 'DELETE' }),
  addComment: (articleId: string, content: string) =>
    fetchAPI(`/articles/${articleId}/comments`, { method: 'POST', body: JSON.stringify({ content }) }),
}

// ===== الأخبار =====
export const newsAPI = {
  getAll: (params = '') => fetchAPI(`/news?${params}`),
  getOne: (slug: string) => fetchAPI(`/news/${slug}`),
  create: (body: object) => fetchAPI('/news', { method: 'POST', body: JSON.stringify(body) }),
}

// ===== التصنيفات =====
export const categoriesAPI = {
  getAll: () => fetchAPI('/categories'),
}

// ===== المقارنات =====
export const comparisonsAPI = {
  getAll: () => fetchAPI('/comparisons'),
  create: (body: object) => fetchAPI('/comparisons', { method: 'POST', body: JSON.stringify(body) }),
}

// ===== المصادقة =====
export const authAPI = {
  register: (body: object) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: object) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => fetchAPI('/auth/me'),
  changePassword: (body: object) => fetchAPI('/auth/change-password', { method: 'PUT', body: JSON.stringify(body) }),
}

// ===== الأدمن =====
export const adminAPI = {
  getStats: () => fetchAPI('/admin/stats'),
  getUsers: (params = '') => fetchAPI(`/admin/users?${params}`),
  updateUser: (id: string, body: object) => fetchAPI(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  getComments: () => fetchAPI('/admin/comments'),
  deleteComment: (id: string) => fetchAPI(`/admin/comments/${id}`, { method: 'DELETE' }),
  getWeeklyPicks: () => fetchAPI('/admin/weekly-picks'),
  setWeeklyPicks: (body: object) => fetchAPI('/admin/weekly-picks', { method: 'POST', body: JSON.stringify(body) }),
}
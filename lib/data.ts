export const products = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro Max',
    image: '/images/iphone15.jpg',
    price: '4,599 ر.س',
    rating: 5,
    category: 'موبايلات',
    specs: ['شاشة 6.7 بوصة', 'معالج A17 Pro', 'كاميرا 48MP', 'بطارية 4422mAh'],
    badge: 'الأفضل مبيعاً'
  },
  {
    id: 's24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    image: '/images/s24.jpg',
    price: '4,199 ر.س',
    rating: 5,
    category: 'موبايلات',
    specs: ['شاشة 6.8 بوصة', 'معالج Snapdragon 8 Gen 3', 'كاميرا 200MP', 'قلم S Pen'],
    badge: 'جديد'
  },
  {
    id: 'macbook-pro-m3',
    name: 'MacBook Pro 14" M3 Pro',
    image: '/images/macbook.jpg',
    price: '7,499 ر.س',
    rating: 5,
    category: 'لابتوبات',
    specs: ['شاشة 14.2 بوصة', 'معالج M3 Pro', '18GB RAM', '512GB SSD'],
    badge: 'محررينا يختارون'
  },
  {
    id: 'asus-rog-strix',
    name: 'ASUS ROG Strix G16',
    image: '/images/asus.jpg',
    price: '5,999 ر.س',
    rating: 4,
    category: 'لابتوبات',
    specs: ['شاشة 16 بوصة 165Hz', 'RTX 4070', 'Core i9-13980HX', '32GB RAM'],
    badge: 'للألعاب'
  },
  {
    id: 'rtx-4090',
    name: 'NVIDIA RTX 4090',
    image: '/images/rtx4090.jpg',
    price: '6,999 ر.س',
    rating: 5,
    category: 'كروت شاشة',
    specs: ['24GB GDDR6X', '16384 نواة CUDA', 'تبريد مائي', 'DLSS 3'],
    badge: 'الأقوى'
  },
  {
    id: 'rx-7900xtx',
    name: 'AMD RX 7900 XTX',
    image: '/images/rx7900.jpg',
    price: '4,599 ر.س',
    rating: 4,
    category: 'كروت شاشة',
    specs: ['24GB GDDR6', '12288 نواة', 'تردد 2.5GHz', 'RDNA 3'],
    badge: 'أفضل قيمة'
  },
  {
    id: 'core-i9-14900k',
    name: 'Intel Core i9-14900K',
    image: '/images/i9.jpg',
    price: '2,199 ر.س',
    rating: 5,
    category: 'معالجات',
    specs: ['24 نواة / 32 خيط', 'تردد 6.0GHz', '36MB Cache', 'LGA 1700'],
    badge: 'الأفضل للألعاب'
  },
  {
    id: 'ryzen-9-7950x',
    name: 'AMD Ryzen 9 7950X3D',
    image: '/images/ryzen.jpg',
    price: '2,499 ر.س',
    rating: 5,
    category: 'معالجات',
    specs: ['16 نواة / 32 خيط', 'تردد 5.7GHz', '144MB Cache', 'AM5'],
    badge: 'الأفضل كفاءة'
  }
]

export const articles = [
  {
    id: '1',
    title: 'مراجعة شاملة: iPhone 15 Pro Max بعد 3 أشهر من الاستخدام',
    excerpt: 'تعمقنا في تجربة استخدام iPhone 15 Pro Max لفترة طويلة لنرى هل يستحق الشراء أم لا...',
    image: '/images/iphone-review.jpg',
    author: 'أحمد محمد',
    date: '2024-01-15',
    readTime: '12 دقيقة',
    views: 15420,
    category: 'مراجعات',
    slug: 'iphone-15-pro-max-review'
  },
  {
    id: '2',
    title: 'أفضل لابتوبات الألعاب لعام 2024 بميزانية 5000 ريال',
    excerpt: 'جمعنا لك أفضل الخيارات المتاحة في فئة الـ 5000 ريال مع مقارنة شاملة للأداء...',
    image: '/images/gaming-laptops.jpg',
    author: 'خالد العلي',
    date: '2024-01-12',
    readTime: '8 دقيقة',
    views: 12300,
    category: 'دليل الشراء',
    slug: 'best-gaming-laptops-2024'
  },
  {
    id: '3',
    title: 'RTX 4090 vs RX 7900 XTX: معركة العمالقة',
    excerpt: 'مقارنة شاملة بين أقوى كرتين شاشة في السوق مع اختبارات أداء مفصلة...',
    image: '/images/gpu-battle.jpg',
    author: 'سامي الدوسري',
    date: '2024-01-10',
    readTime: '15 دقيقة',
    views: 18900,
    category: 'مقارنات',
    slug: 'rtx-4090-vs-rx-7900-xtx'
  },
  {
    id: '4',
    title: 'دليلك الشامل لاختيار معالج الكمبيوتر المناسب لاحتياجاتك',
    excerpt: 'كل ما تحتاج معرفته قبل شراء معالج جديد من Intel أو AMD...',
    image: '/images/cpu-guide.jpg',
    author: 'فهد السالم',
    date: '2024-01-08',
    readTime: '10 دقيقة',
    views: 9800,
    category: 'شروحات',
    slug: 'cpu-buying-guide'
  }
]

export const news = [
  {
    id: '1',
    title: 'أبل تعلن عن موعد مؤتمر WWDC 2024 وتوقعات بكشف iOS 18',
    excerpt: 'تستعد أبل للكشف عن الجيل القادم من أنظمتها مع تركيز كبير على الذكاء الاصطناعي...',
    image: '/images/wwdc.jpg',
    date: '2024-01-15',
    category: 'أخبار أبل'
  },
  {
    id: '2',
    title: 'NVIDIA تكشف عن RTX 50 Series بتقنية AI متقدمة',
    excerpt: 'التسريبات تكشف عن أداء خرافي للجيل القادم من كروت NVIDIA...',
    image: '/images/rtx50.jpg',
    date: '2024-01-14',
    category: 'أخبار كروت الشاشة'
  },
  {
    id: '3',
    title: 'سامسونج تؤكد: Galaxy S25 Ultra سيكون ثورة في التصوير',
    excerpt: 'تسريبات جديدة تكشف عن مواصفات كاميرا خرافية للجيل القادم...',
    image: '/images/s25.jpg',
    date: '2024-01-13',
    category: 'أخبار موبايلات'
  }
]

export const comparisons = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max vs Galaxy S24 Ultra',
    devices: ['iPhone 15 Pro Max', 'Galaxy S24 Ultra'],
    image: '/images/compare-phones.jpg',
    winner: 'تعادل',
    date: '2024-01-10'
  },
  {
    id: '2',
    title: 'MacBook Pro M3 vs Dell XPS 15',
    devices: ['MacBook Pro 14 M3', 'Dell XPS 15'],
    image: '/images/compare-laptops.jpg',
    winner: 'MacBook Pro',
    date: '2024-01-08'
  }
]

export const weeklyPicks = [
  {
    category: 'أفضل موبايل',
    product: 'Galaxy S24 Ultra',
    reason: 'أفضل كاميرا وأداء متوازن',
    image: '/images/s24.jpg'
  },
  {
    category: 'أفضل لابتوب',
    product: 'MacBook Air M3',
    reason: 'أفضل قيمة للأداء والبطارية',
    image: '/images/macbook-air.jpg'
  },
  {
    category: 'أفضل سماعة',
    product: 'Sony WH-1000XM5',
    reason: 'أفضل عزل للضوضاء',
    image: '/images/sony.jpg'
  }
]

export const budgetGuides = [
  {
    range: 'أقل من 1000 ريال',
    products: ['Redmi Note 13', 'Realme 11', 'Samsung A14'],
    image: '/images/budget-1k.jpg'
  },
  {
    range: '1000 - 2000 ريال',
    products: ['Pixel 7a', 'Nothing Phone 2', 'Galaxy A54'],
    image: '/images/budget-2k.jpg'
  },
  {
    range: '2000 - 4000 ريال',
    products: ['iPhone 13', 'Galaxy S23 FE', 'Pixel 8'],
    image: '/images/budget-4k.jpg'
  }
]

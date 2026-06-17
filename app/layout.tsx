import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const tajawal = Tajawal({ 
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'تك بلس - عالم التكنولوجيا',
  description: 'أفضل موقع تقني عربي يقدم مراجعات، مقارنات، شروحات، وأخبار التكنولوجيا',
  keywords: ['تكنولوجيا', 'موبايلات', 'لابتوبات', 'مراجعات تقنية', 'مقارنات'],
  authors: [{ name: 'تك بلس' }],
  openGraph: {
    title: 'تك بلس - عالم التكنولوجيا',
    description: 'أفضل موقع تقني عربي',
    type: 'website',
    locale: 'ar_SA',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'ca-pub-YOUR_ADSENSE_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable} suppressHydrationWarning>
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

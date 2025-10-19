import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy Attend - ระบบบันทึกการเข้าเรียน',
  description: 'ระบบบันทึกและจัดการการเข้าเรียนของนักเรียนที่ใช้งานง่าย',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: '32x32' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16' }
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml', sizes: '180x180' }
    ],
  },
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#10b981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
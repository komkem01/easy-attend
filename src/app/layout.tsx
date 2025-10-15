import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy Attend - ระบบบันทึกการเข้าเรียน',
  description: 'ระบบบันทึกและจัดการการเข้าเรียนของนักเรียนที่ใช้งานง่าย',
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
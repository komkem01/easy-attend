'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'teacher' | 'student'>('teacher')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Simulate API call
        setTimeout(() => {
            console.log('Login:', { email, password, role })
            
            // Store user role in localStorage for demo
            localStorage.setItem('userRole', role)
            localStorage.setItem('userEmail', email)
            
            // Redirect based on role
            if (role === 'teacher') {
                router.push('/teacher/dashboard')
            } else {
                router.push('/student/dashboard')
            }
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">EA</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">เข้าสู่ระบบ</h1>
                    <p className="text-blue-600">Easy Attend - ระบบบันทึกการเข้าเรียนของนักเรียน</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                เข้าสู่ระบบในฐานะ
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('teacher')}
                                    className={`p-4 border-2 rounded-lg transition-all ${
                                        role === 'teacher' 
                                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">👨‍🏫</div>
                                        <div className="font-medium">ครู</div>
                                        <div className="text-xs text-gray-500">Teacher</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`p-4 border-2 rounded-lg transition-all ${
                                        role === 'student' 
                                            ? 'border-green-500 bg-green-50 text-green-700' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">👨‍🎓</div>
                                        <div className="font-medium">นักเรียน</div>
                                        <div className="text-xs text-gray-500">Student</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                อีเมล
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                                placeholder="กรอกอีเมลของคุณ"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                รหัสผ่าน
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white"
                                placeholder="กรอกรหัสผ่านของคุณ"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    จดจำการเข้าสู่ระบบ
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                                ลืมรหัสผ่าน?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                        >
                            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            ยังไม่มีบัญชี?{' '}
                            <a href="/register" className="text-blue-600 hover:text-blue-500 font-semibold hover:underline">
                                สมัครสมาชิก
                            </a>
                        </p>
                    </div>
                </div>

                {/* About Link */}
                <div className="text-center mt-6">
                    <a href="/about" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>เกี่ยวกับระบบ</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
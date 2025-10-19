export default function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg sm:text-xl">EA</span>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">เข้าสู่ระบบ</h1>
                    <p className="text-sm sm:text-base text-blue-600">Easy Attend - ใช้งานฟรี</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <form className="space-y-4 sm:space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                ชื่อผู้ใช้/อีเมล
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white text-sm sm:text-base"
                                placeholder="ชื่อผู้ใช้หรืออีเมล"
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
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 bg-white text-sm sm:text-base"
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
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            เข้าสู่ระบบ
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            ยังไม่มีบัญชี?{' '}
                            <a href="/register" className="text-blue-600 hover:text-blue-500 font-semibold">
                                สมัครสมาชิก
                            </a>
                        </p>
                    </div>

                    {/* Demo Accounts */}
                    {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"> */}
                    {/* <h3 className="text-sm font-semibold text-blue-800 mb-3">บัญชีทดสอบ (ใช้งานฟรี):</h3> */}
                    {/* <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">ครู:</span>
                <span className="font-mono text-blue-700">teacher@demo.com / demo123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">ผู้ดูแล:</span>
                <span className="font-mono text-blue-700">admin@demo.com / demo123</span>
              </div>
            </div> */}
                    {/* </div> */}
                </div>

                {/* Navigation Links */}
                <div className="text-center mt-6 space-y-2">
                    <div>
                        <a href="/" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>กลับสู่หน้าแรก</span>
                        </a>
                    </div>
                    <div>
                        <a href="/about" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>เกี่ยวกับระบบ</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
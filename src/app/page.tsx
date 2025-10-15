export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EA</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Easy Attend</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">คุณสมบัติ</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">เกี่ยวกับ</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">ติดต่อ</a>
            </div>
            <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              เข้าสู่ระบบ
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Easy Attend
          </h1>
          <p className="text-xl text-blue-700 mb-4">
            ระบบบันทึกการเข้าเรียนของนักเรียน
          </p>
          <p className="text-lg text-blue-600 mb-8">
            ใช้งานฟรี ไม่มีค่าใช้จ่าย
          </p>
          
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300 inline-block">
            เริ่มใช้งานฟรี
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">ฟังก์ชันหลัก</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-blue-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">👨‍🎓</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                จัดการข้อมูลนักเรียน
              </h3>
              <p className="text-blue-600 text-sm">
                เพิ่ม ลบ แก้ไขข้อมูลนักเรียน จัดกลุ่มตามชั้นเรียน
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                บันทึกการเข้าเรียน
              </h3>
              <p className="text-blue-600 text-sm">
                เช็คชื่อรายวัน บันทึกสาเหตุการขาด ระบบเวลาอัตโนมัติ
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                รายงานและสถิติ
              </h3>
              <p className="text-blue-600 text-sm">
                สถิติการเข้าเรียน รายงานรายเดือน ส่งออกไฟล์ Excel/PDF
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🔔</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                การแจ้งเตือน
              </h3>
              <p className="text-blue-600 text-sm">
                แจ้งเตือนผู้ปกครอง ส่ง SMS/อีเมล ตั้งค่าการแจ้งเตือน
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                จัดการผู้ใช้
              </h3>
              <p className="text-blue-600 text-sm">
                บัญชีครู/ผู้ดูแล สิทธิ์การเข้าถึง ล็อกการใช้งาน
              </p>
            </div>

            <div className="bg-white border border-blue-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                ใช้งานง่าย
              </h3>
              <p className="text-blue-600 text-sm">
                รองรับมือถือ อินเทอร์เฟซใช้งานง่าย ทำงานออฟไลน์ได้
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            ใช้งานฟรี ไม่มีค่าใช้จ่าย
          </h2>
          <p className="text-blue-100 mb-6">
            เริ่มใช้งานได้ทันที ไม่ต้องชำระเงิน
          </p>
          <a href="/login" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:bg-blue-50 transition-all duration-300 inline-block">
            เข้าสู่ระบบฟรี
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">EA</span>
            </div>
            <span className="text-xl font-bold">Easy Attend</span>
          </div>
          <p className="text-blue-200 mb-4">
            ระบบบันทึกการเข้าเรียนของนักเรียน - ใช้งานฟรี
          </p>
          <p className="text-blue-300 text-sm">
            &copy; 2024 Easy Attend. สงวนลิขสิทธิ์.
          </p>
        </div>
      </footer>
    </main>
  )
}
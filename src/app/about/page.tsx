export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EA</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Easy Attend</span>
            </div>
            <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
              เข้าสู่ระบบ
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Easy Attend
            </h1>
            <p className="text-xl text-blue-700 mb-4">
              ระบบบันทึกการเข้าเรียนของนักเรียน
            </p>
            <p className="text-lg text-blue-600">
              ใช้งานฟรี ไม่มีค่าใช้จ่าย
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">ฟังก์ชันหลัก</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-blue-200 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">�</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  จัดการโรงเรียน/ห้องเรียน
                </h3>
                <p className="text-blue-600 text-sm">
                  สร้างห้องเรียน เพิ่มสมาชิก จัดการนักเรียนและครู
                </p>
              </div>

              <div className="bg-white border border-blue-200 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">📝</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  บันทึกการเข้าเรียน
                </h3>
                <p className="text-blue-600 text-sm">
                  เช็คชื่อ present/absent/leave พร้อมเหตุผล
                </p>
              </div>

              <div className="bg-white border border-blue-200 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">�</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  มอบหมายงาน
                </h3>
                <p className="text-blue-600 text-sm">
                  สร้างงาน กำหนดวันส่ง อัปโหลดไฟล์แนบ
                </p>
              </div>

              <div className="bg-white border border-blue-200 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">�</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  ส่งงาน
                </h3>
                <p className="text-blue-600 text-sm">
                  นักเรียนส่งงาน อัปโหลดไฟล์ เพิ่มหมายเหตุ
                </p>
              </div>

              <div className="bg-white border border-blue-200 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  ระบบผู้ใช้
                </h3>
                <p className="text-blue-600 text-sm">
                  บัญชีครูและนักเรียน แยกสิทธิ์ตามบทบาท
                </p>
              </div>

              <div className="bg-white border border-blue-200 p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">�</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  รายงานสถิติ
                </h3>
                <p className="text-blue-600 text-sm">
                  สถิติการเข้าเรียน ผลงานที่ส่ง ตามห้องเรียน
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-700 rounded-2xl p-8 text-center text-white mb-16">
            <h2 className="text-2xl font-bold mb-4">
              ใช้งานฟรี ไม่มีค่าใช้จ่าย
            </h2>
            <p className="text-blue-100 mb-6">
              เริ่มใช้งานได้ทันที ไม่ต้องชำระเงิน
            </p>
            <a href="/" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:bg-blue-50 transition-all duration-300 inline-block">
              เข้าสู่ระบบฟรี
            </a>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">EA</span>
              </div>
              <span className="text-xl font-bold text-blue-900">Easy Attend</span>
            </div>
            <p className="text-blue-600 mb-4">
              ระบบบันทึกการเข้าเรียนของนักเรียน - ใช้งานฟรี
            </p>
            <p className="text-blue-500 text-sm">
              &copy; 2024 Easy Attend. สงวนลิขสิทธิ์.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
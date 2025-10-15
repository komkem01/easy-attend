## Easy Attend - ระบบบันทึกการเข้าเรียนของนักเรียน

ระบบจัดการการเข้าเรียนที่ทันสมัย สร้างด้วย Next.js และ TypeScript

### คุณสมบัติหลัก

- 👨‍🎓 **จัดการข้อมูลนักเรียน** - เพิ่ม ลบ แก้ไขข้อมูลนักเรียนและจัดกลุ่มตามชั้นเรียน
- 📝 **บันทึกการเข้าเรียน** - เช็คชื่อรายวันพร้อมบันทึกสาเหตุการขาด
- 📊 **รายงานและสถิติ** - สร้างรายงานการเข้าเรียนและสถิติต่างๆ
- 🔔 **การแจ้งเตือน** - แจ้งเตือนผู้ปกครองผ่าน SMS/อีเมล
- 👥 **จัดการผู้ใช้** - ระบบสิทธิ์การเข้าถึงแยกตามระดับ
- 📱 **Responsive Design** - ใช้งานได้ทั้งมือถือและเดสก์ท็อป

### เทคโนโลยีที่ใช้

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### การติดตั้งและรัน

```bash
# ติดตั้ง dependencies
npm install

# รันในโหมด development
npm run dev

# สร้าง production build
npm run build

# รัน production server
npm start
```

### โครงสร้างโปรเจค

```
easy-attend/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

### การใช้งาน

1. เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`
2. ระบบจะแสดงหน้าแรกพร้อมคุณสมบัติต่างๆ
3. เริ่มพัฒนาต่อโดยแก้ไขไฟล์ใน `src/app/page.tsx`

### การพัฒนาต่อ

- สร้างหน้าเข้าสู่ระบบ: `src/app/login/page.tsx`
- สร้างหน้าจัดการนักเรียน: `src/app/students/page.tsx`
- สร้างหน้าบันทึกการเข้าเรียน: `src/app/attendance/page.tsx`
- สร้างหน้ารายงาน: `src/app/reports/page.tsx`
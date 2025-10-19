# 🚀 Monorepo with Separate Deployment Setup Guide

## 📁 Project Structure Conversion

เราจะแปลง project ปัจจุบันเป็น monorepo โดยแยก deploy ได้:

```
easy-attend/
├── apps/
│   ├── frontend/         # Next.js → Vercel
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vercel.json
│   └── backend/          # Node.js → Railway
│       ├── src/
│       ├── prisma/
│       ├── package.json
│       └── railway.toml
├── packages/
│   └── shared/           # Types & Utils
│       ├── src/
│       │   ├── types/
│       │   ├── schemas/
│       │   └── utils/
│       └── package.json
├── package.json          # Root workspace
├── turbo.json           # Turborepo (optional)
└── docker-compose.yml   # Local development
```

---

## 🔧 Step-by-Step Implementation

### 1️⃣ **Setup Root Workspace**
```bash
# Update root package.json
npm init -y
```

### 2️⃣ **Create Apps Directory Structure**
```bash
mkdir -p apps/frontend apps/backend packages/shared
```

### 3️⃣ **Move Current Frontend**
```bash
# Move current files to apps/frontend/
mv src apps/frontend/
mv public apps/frontend/
mv next.config.js apps/frontend/
mv tailwind.config.js apps/frontend/
mv postcss.config.js apps/frontend/
mv tsconfig.json apps/frontend/
cp package.json apps/frontend/
```

---

## 📦 Configuration Files

### 🔧 **Root package.json**
```json
{
  "name": "easy-attend",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "npm run dev --workspace=frontend",
    "dev:backend": "npm run dev --workspace=backend",
    "build": "npm run build --workspace=shared && npm run build --workspace=frontend && npm run build --workspace=backend",
    "build:frontend": "npm run build --workspace=shared && npm run build --workspace=frontend",
    "build:backend": "npm run build --workspace=shared && npm run build --workspace=backend"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "turbo": "^1.10.0"
  }
}
```

### 🎨 **Frontend package.json**
```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@easy-attend/shared": "*",
    "next": "14.0.3",
    "react": "^18",
    "react-dom": "^18"
  }
}
```

### 🔙 **Backend package.json**
```json
{
  "name": "backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@easy-attend/shared": "*",
    "fastify": "^4.24.0",
    "@prisma/client": "^5.6.0",
    "prisma": "^5.6.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

### 📚 **Shared package.json**
```json
{
  "name": "@easy-attend/shared",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

---

## 🚀 Deployment Configuration

### 🌐 **Vercel (Frontend) - vercel.json**
```json
{
  "version": 2,
  "name": "easy-attend-frontend",
  "builds": [
    {
      "src": "apps/frontend/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/apps/frontend/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://easy-attend-backend.railway.app"
  },
  "buildCommand": "cd apps/frontend && npm run build",
  "outputDirectory": "apps/frontend/.next",
  "installCommand": "npm install && npm run build --workspace=shared"
}
```

### 🛤️ **Railway (Backend) - railway.toml**
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build:backend"

[deploy]
startCommand = "npm run start --workspace=backend"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[env]
NODE_ENV = "production"
```

### 🐳 **Railway Dockerfile (Alternative)**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/backend/package.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy source code
COPY packages/shared ./packages/shared
COPY apps/backend ./apps/backend

# Build shared package
RUN npm run build --workspace=shared

# Build backend
RUN npm run build --workspace=backend

# Expose port
EXPOSE 8000

# Start backend
CMD ["npm", "run", "start", "--workspace=backend"]
```

---

## 🔄 Development Workflow

### 🏃‍♂️ **Local Development**
```bash
# Install all dependencies
npm install

# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Frontend on :3000
npm run dev:backend   # Backend on :8000
```

### 📝 **Shared Types Usage**
```typescript
// packages/shared/src/types/index.ts
export interface User {
  id: string
  email: string
  name: string
  role: 'teacher' | 'student'
}

export interface AttendanceSession {
  id: string
  title: string
  classroomId: string
  status: 'active' | 'ended'
}

// Frontend usage: apps/frontend/src/components/...
import { User, AttendanceSession } from '@easy-attend/shared'

// Backend usage: apps/backend/src/services/...
import { User, AttendanceSession } from '@easy-attend/shared'
```

---

## 🚀 Deployment Process

### 1️⃣ **Vercel Deployment (Frontend)**
```bash
# Connect to Vercel
npx vercel

# Configure build settings:
# Framework: Next.js
# Root Directory: apps/frontend
# Build Command: npm run build:frontend
# Output Directory: apps/frontend/.next
```

### 2️⃣ **Railway Deployment (Backend)**
```bash
# Connect to Railway
npm install -g @railway/cli
railway login
railway init

# Deploy
railway up
```

### 3️⃣ **Environment Variables**

**Vercel (Frontend):**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

**Railway (Backend):**
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## 🎯 **Advantages of This Setup**

### ✅ **Development Benefits:**
- 🔄 Single repo management
- 📝 Shared types/schemas
- 🛠️ Unified development workflow
- 🔄 Single version control

### ✅ **Deployment Benefits:**
- 🌐 Frontend on Vercel (Fast Edge)
- 🛤️ Backend on Railway (Full Node.js features)
- 💰 Cost-effective ($5/month vs $20/month)
- 🔧 Independent scaling

### ✅ **Technical Benefits:**
- 🔌 WebSocket support on backend
- 📁 Unlimited file uploads
- 🗄️ Better database connections
- 🎯 No API route limitations

---

## 🛠️ **Migration Steps**

1. **Setup Structure** (30 mins)
2. **Move Frontend Files** (15 mins)
3. **Create Backend** (1-2 hours)
4. **Setup Shared Package** (30 mins)
5. **Configure Deployments** (45 mins)
6. **Test Everything** (30 mins)

**Total Time: ~4 hours**

---

## 🎉 **Result**

✅ **Single Repository**  
✅ **Shared Code/Types**  
✅ **Frontend on Vercel** (Fast, Free)  
✅ **Backend on Railway** (Full features, $5/month)  
✅ **Easy Development** (npm run dev)  
✅ **Independent Deployment**  

**Best of both worlds!** 🚀
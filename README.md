# Mohamed Tayel - AI Developer & Full Stack Portfolio

Welcome to the premium, standalone portfolio for Mohamed Tayel. This project is a completely independent, production-ready full-stack application built natively with React, Vite, Express, and Prisma. 

It features an integrated Admin Dashboard for managing contact requests, robust local asset serving for certificates, and a stunning framer-motion powered glassmorphism UI.

## 🚀 Technology Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS (Glassmorphism UI)
- Framer Motion (Cinematic Animations)
- Lucide React (Icons)
- React Router DOM

**Backend:**
- Node.js & Express
- Prisma ORM (SQLite / PostgreSQL)
- JWT Authentication
- Bcrypt (Password Hashing)

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your machine.

### 2. Installation
Run the following command in the root directory. It will install dependencies for **both** the React frontend and the Express backend concurrently.
```bash
npm install
```

### 3. Environment Configuration
Navigate to the `server/` directory and ensure your environment variables are configured. A `.env.example` file is provided.
Create a `.env` file inside `server/` with the following variables:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db" # Or your PostgreSQL URL
JWT_SECRET="your-super-secret-key"
```

### 4. Database Initialization
This project uses Prisma with SQLite out of the box for instant local development.
Run the following commands inside the `server/` directory:
```bash
npx prisma db push
npm run db:seed
```
*(The seed script generates a default admin user: `admin@mohamed.dev` / `admin123`)*

### 5. Start Development Server
Start the entire full-stack application (Frontend + Backend + Vite Proxy) concurrently from the root directory:
```bash
npm run dev
```
- **Portfolio:** http://localhost:8080
- **Admin Dashboard:** http://localhost:8080/admin
- **API Backend:** http://localhost:3000

---

## 📦 Production Build

To bundle the application for production, run:
```bash
npm run build
```
The optimized HTML, CSS, and JS files will be generated in the `dist/` directory.

---

## ☁️ Deployment Instructions

### Frontend (Vercel / Netlify / Hostinger)
1. Set the build command to: `npm run build`
2. Set the publish directory to: `dist`
3. Ensure you configure API rewrites/proxies in your hosting provider to route `/api/*` traffic to your deployed backend URL.

### Backend (Render / Railway / VPS)
1. Deploy the `server/` directory as a Node.js application.
2. Ensure you define `DATABASE_URL` (preferably PostgreSQL in production) and `JWT_SECRET` in your hosting environment variables.
3. The server will start via `tsx src/server.ts` or compiled JavaScript.

---

## 🔒 Admin Dashboard
The portfolio includes a hidden admin dashboard seamlessly integrated into the premium frontend UI to manage incoming messages from the contact form.
- **Route:** `/admin`
- Logs securely interact with the backend `/api/requests` endpoint and enforce JWT authentication.

## 📄 Certificates & Assets
All 13 original certificate PDFs and images are cached securely in the `public/` directory, allowing flawless, rapid loading in production environments via Vite static asset resolution.

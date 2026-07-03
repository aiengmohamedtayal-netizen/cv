# Mohamed Tayel - Senior Frontend & AI Engineer Portfolio

Welcome to the premium, standalone portfolio for Mohamed Tayel. This project is a modern, production-ready frontend application built natively with React, Vite, and TypeScript.

## 🚀 Description

A stunning personal portfolio showcasing projects, experience, and certificates. It features an integrated 3D Spline scene, a gorgeous framer-motion powered glassmorphism UI, and robust accessibility standards.

## ✨ Features

- **Interactive 3D Elements:** Integrated Spline scene for a highly immersive hero section.
- **Modern UI/UX:** Glassmorphism design system using Tailwind CSS and shadcn/ui.
- **Cinematic Animations:** Smooth scroll and reveal effects powered by Framer Motion.
- **Responsive:** Mobile-first approach ensuring a perfect experience across all devices.
- **Performance Optimized:** Built with Vite for lightning-fast HMR and optimized production bundles.
- **Strict Typing:** 100% TypeScript for reliable, bug-free components.

## 🛠️ Tech Stack

**Core:**
- React 18
- TypeScript
- Vite

**Styling & UI:**
- Tailwind CSS (Glassmorphism UI)
- shadcn/ui
- Framer Motion (Cinematic Animations)
- Lucide React (Icons)
- Spline (3D Web Experiences)

**Routing & Utilities:**
- React Router DOM v6 (v7 future flags enabled)
- React Hook Form
- Sonner (Toasts)

## 📂 Folder Structure

```
.
├── public/                 # Static assets (images, fonts, sitemap.xml)
├── src/                    
│   ├── components/         # React components
│   │   ├── blocks/         # High-level feature blocks
│   │   ├── ui/             # Reusable UI primitives (shadcn)
│   ├── data/               # Static data for portfolio content
│   ├── pages/              # Route components
│   ├── App.tsx             # Main application layout and routing
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles and Tailwind directives
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── tailwind.config.ts      # Tailwind configuration
```

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your machine.

### 2. Installation
Run the following command in the root directory to install dependencies.
```bash
npm install
```

### 3. Start Development Server
Start the Vite development server with Hot Module Replacement (HMR).
```bash
npm run dev
```
Access the application at: http://localhost:8080

---

## 📦 Build

To bundle the application for production, run:
```bash
npm run build
```
The optimized HTML, CSS, and JS files will be generated in the `dist/` directory.

---

## ☁️ Deployment Instructions

### Vercel / Netlify / Hostinger
1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Node Version:** 18.x or 20.x

*(Note: The build script automatically copies `index.html` to `404.html` to handle client-side routing on static hosts.)*

---

## 🌍 Environment Variables
Create a `.env` file in the root if you plan to integrate an API backend in the future. See `.env.example` for reference.

## 📸 Screenshots
*(Coming Soon)*

## 🙌 Credits
- Design Inspiration: Modern Glassmorphism & Cyberpunk aesthetics.
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- 3D Models: [Spline](https://spline.design/)

## 📄 License
This project is licensed under the [MIT License](LICENSE).

# PRD — Cakra Jaya Personal Portfolio (v2)

## Overview

Rebuild personal portfolio website dari HTML/CSS/JS ke React + Tailwind CSS dengan arsitektur yang bersih, data-driven, dan mendukung dark mode. Color palette: biru & putih.

---

## Tech Stack

| Layer | Pilihan |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React / React Icons |
| Animasi | Framer Motion |
| Dark Mode | Tailwind `darkMode: 'class'` |
| Data | JSON files di `src/data/` |
| Routing | Single Page (tidak pakai React Router) |

---

## Struktur Folder

```
src/
├── assets/               # Gambar, CV, foto portfolio
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   └── Card.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── sections/
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Experience.jsx
│       └── Portfolio.jsx
├── data/
│   ├── experience.json
│   └── portfolio.json
├── hooks/
│   └── useDarkMode.js
├── pages/
│   └── Home.jsx
├── App.jsx
└── main.jsx
```

---

## Sections

### 1. Navbar
- Logo "CakraJaya" dengan font berat
- Links: Home, About, Portfolio, Download CV
- Toggle dark mode (ikon matahari/bulan)
- Hamburger menu untuk mobile
- Sticky + blur backdrop saat scroll

### 2. Hero
- Foto profil dengan efek ring biru
- Nama besar + subtitle (Developer | Student)
- Social icons (Instagram, GitHub, LinkedIn, Email)
- Tombol Download CV + Lihat Portfolio
- Animasi fade-in staggered

### 3. About
- Paragraf singkat bio
- Tech Stack grid (ikon dari skillicons.dev)
- Responsive 2 kolom di desktop

### 4. Experience
- Data dari `experience.json`
- Layout timeline vertikal (garis tengah di desktop, kiri di mobile)
- Tiap item: posisi, perusahaan, periode, deskripsi
- Alternating left/right di desktop
- Hover card dengan subtle shadow

### 5. Portfolio
- Data dari `portfolio.json`
- Grid card responsif (1 → 2 → 3 kolom)
- Tiap card: foto thumbnail, nama proyek, badge tech stack
- **Overlay detail** saat di-klik/hover:
  - Deskripsi lengkap
  - Tech stack badges
  - Foto-foto tambahan (carousel/grid kecil)
  - Link website & GitHub
- Modal/drawer untuk tampilan detail lengkap

### 6. Footer
- Copyright + tahun otomatis
- Social links

---

## Data Structure

### `experience.json`
```json
[
  {
    "id": 1,
    "role": "Web Developer",
    "company": "Gretiva Artha Group",
    "period": "May 2025 - Present",
    "description": "Developing full-stack web applications...",
    "logo": "/assets/companies/gretiva.webp",
    "type": "full-time"
  }
]
```

### `portfolio.json`
```json
[
  {
    "id": 1,
    "title": "Telerehab",
    "description": "Platform telemedicine untuk dokter, terapis, dan pasien...",
    "thumbnail": "/assets/projects/telerehab.webp",
    "images": [
      "/assets/projects/telerehab-1.webp",
      "/assets/projects/telerehab-2.webp"
    ],
    "techStack": ["Laravel", "MySQL", "Bootstrap", "Alpine.js"],
    "liveUrl": "https://telerehab.gretiva.com",
    "githubUrl": null,
    "featured": true
  }
]
```

---

## Design System

### Color Palette (Tailwind custom)
```js
colors: {
  primary: {
    50:  '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  }
}
```

### Dark Mode
- Background dark: `#0f172a` (slate-900)
- Card dark: `#1e293b` (slate-800)
- Toggle disimpan di `localStorage`

### Typography
- Display: `Syne` (Google Fonts) — untuk nama & heading besar
- Body: `DM Sans` — untuk paragraf & UI

---

## Fitur Tambahan
- Smooth scroll ke tiap section
- Active link highlight di navbar sesuai scroll position
- Lazy loading gambar
- Responsive penuh (mobile-first)
- Meta tags dasar untuk SEO

---

## Setup & Commands

Lihat bagian **Setup Steps** di bawah PRD ini.
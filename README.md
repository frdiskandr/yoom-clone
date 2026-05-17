# Conferecing App 🎥

Aplikasi web conferencing/meeting real-time yang dibangun dengan **Next.js 16**, **Stream.io Video API**, dan **Clerk Authentication**. Aplikasi ini memungkinkan pengguna untuk membuat, menjadwalkan, dan bergabung dalam video conference dengan mudah.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi](#-instalasi)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Cara Menjalankan](#-cara-menjalankan)
- [Fitur Lengkap](#-fitur-lengkap)
- [Komponen Utama](#-komponen-utama)
- [Routing & Pages](#-routing--pages)
- [Styling & UI](#-styling--ui)
- [Developer Guide](#-developer-guide)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## ✨ Fitur Utama

- **🔐 Autentikasi Aman** - Login/Sign-up dengan Clerk (Magic Links, Social OAuth)
- **📹 Video Conference Real-time** - Percakapan video HD berkualitas tinggi menggunakan Stream.io
- **📅 Penjadwalan Rapat** - Jadwalkan rapat untuk waktu mendatang
- **⚡ Rapat Instan** - Mulai rapat langsung tanpa penjadwalan
- **🔗 Join Meeting** - Bergabung dengan rapat melalui link
- **📊 Manajemen Rapat** - Lihat rapat yang akan datang, rapat sebelumnya, dan rekaman
- **🎤 Personal Room** - Ruang rapat pribadi yang dapat dibagikan
- **📱 Responsive Design** - Optimal untuk desktop dan mobile

## 🛠 Tech Stack

| Kategori                | Teknologi                                                             |
| ----------------------- | --------------------------------------------------------------------- |
| **Framework**           | [Next.js 16.2.6](https://nextjs.org) dengan App Router                |
| **Frontend Library**    | [React 19.2.4](https://react.dev)                                     |
| **Video API**           | [Stream.io Video SDK 1.36.1](https://getstream.io)                    |
| **Autentikasi**         | [Clerk 7.3.3](https://clerk.com)                                      |
| **Styling**             | [Tailwind CSS 4](https://tailwindcss.com)                             |
| **UI Components**       | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://radix-ui.com) |
| **Date Picker**         | [React Datepicker 9.1.0](https://reactdatepicker.com)                 |
| **Toast Notifications** | [Sonner 2.0.7](https://sonner.emilkowal.ski)                          |
| **Language**            | [TypeScript 5](https://www.typescriptlang.org)                        |
| **Linting**             | [ESLint 9](https://eslint.org)                                        |
| **Icon Library**        | [Lucide React 1.14.0](https://lucide.dev)                             |

## 📁 Struktur Proyek

```
conferecing-app/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout dengan Clerk & Providers
│   ├── (auth)/                  # Route group untuk auth pages
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   └── (root)/                  # Route group untuk app pages (protected)
│       ├── layout.tsx           # Layout dengan Navbar & Sidebar
│       ├── (home)/              # Home section
│       │   ├── page.tsx         # Dashboard utama
│       │   ├── personal-room/   # Personal room page
│       │   ├── previous/        # Rapat sebelumnya
│       │   ├── recordings/      # Rekaman video
│       │   └── upcoming/        # Rapat mendatang
│       └── meeting/[id]/        # Dynamic route untuk detail meeting
│           └── page.tsx
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── sheet.tsx
│   │   ├── sonner.tsx
│   │   └── textarea.tsx
│   ├── CallList.tsx             # Menampilkan daftar calls
│   ├── EndCallButton.tsx        # Tombol akhiri panggilan
│   ├── HomeCard.tsx             # Card di home page
│   ├── Loader.tsx               # Loading spinner
│   ├── MeetingCard.tsx          # Card untuk meeting
│   ├── MeetingModal.tsx         # Modal untuk create/join meeting
│   ├── MeetingRoom.tsx          # Room interface untuk video call
│   ├── MeetingSetup.tsx         # Setup sebelum join meeting
│   ├── MeetingTypeList.tsx      # Daftar tipe meeting (instant, schedule, join)
│   ├── MobileNav.tsx            # Navigation untuk mobile
│   ├── Navbar.tsx               # Navigation bar
│   └── Sidebar.tsx              # Sidebar navigation
├── providers/                    # Context providers
│   └── StreamsClientProviders.tsx # Stream.io video client provider
├── hooks/                        # Custom React hooks
│   ├── useGetCallById.ts        # Hook untuk get meeting by ID
│   └── useGetCalls.ts           # Hook untuk get meetings list
├── actions/                      # Server actions
│   └── Stream.action.ts         # Stream.io token provider
├── lib/                          # Utility functions
│   └── utils.ts                 # Helper functions (cn, clsx)
├── constant/                     # Konstanta aplikasi
│   └── index.tsx               # Routes, avatar images, dll
├── public/                       # Static assets
│   ├── icons/                   # SVG icons
│   └── images/                  # Images & backgrounds
└── config files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    └── components.json
```

## 💻 Persyaratan Sistem

- **Node.js**: 18.17 atau lebih tinggi
- **npm/yarn/pnpm**: Package manager (pnpm direkomendasikan)
- **Git**: Untuk version control

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/your-username/conferecing-app.git
cd conferecing-app
```

### 2. Install Dependencies

```bash
pnpm install
# atau
npm install
```

## ⚙️ Konfigurasi Environment

Buat file `.env.local` di root directory dan tambahkan variabel berikut:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stream.io Video
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key
```

### Cara Mendapatkan API Keys:

**Clerk:**

1. Buka [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Buat aplikasi baru
3. Copy `Publishable Key` dan `Secret Key` dari API Keys section

**Stream.io:**

1. Daftar di [https://getstream.io](https://getstream.io)
2. Buat Video & Livestream project
3. Dapatkan API Key dan Secret dari dashboard

## 🚀 Cara Menjalankan

### Development Server

```bash
pnpm dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build aplikasi
pnpm build

# Jalankan production build
pnpm start
```

### Linting

```bash
pnpm lint
```

## 🎯 Fitur Lengkap

### 1. **Authentication (Autentikasi)**

- Sign-in dengan email, social media, atau magic links
- Sign-up untuk user baru
- Logout functionality
- Profile management via Clerk dashboard

### 2. **Meeting Management**

#### Instant Meeting (Rapat Instan)

- Buat rapat langsung tanpa penjadwalan
- Dapatkan link yang dapat dibagikan
- Mulai dengan klik tombol "Start Instant Meeting"

#### Schedule Meeting (Jadwalkan Rapat)

- Pilih tanggal dan waktu
- Tambahkan deskripsi rapat
- Sistem akan generate unique meeting ID
- Dapatkan link untuk dibagikan ke peserta

#### Join Meeting (Bergabung Rapat)

- Masukkan meeting code/link
- Setup camera & microphone sebelum join
- Langsung masuk ke video conference

### 3. **Meeting Features**

- Video/Audio call HD
- Screen sharing capability
- Participant management
- Recording functionality
- Real-time chat (jika diimplementasikan)

### 4. **Dashboard & History**

- **Home**: Overview rapat hari ini dan upcoming meetings
- **Upcoming**: Daftar semua rapat yang akan datang
- **Previous**: Riwayat rapat yang telah selesai
- **Recordings**: Akses rekaman video conference
- **Personal Room**: Link rapat pribadi yang selalu tersedia

## 🧩 Komponen Utama

| Komponen          | Fungsi                                      |
| ----------------- | ------------------------------------------- |
| `MeetingTypeList` | Menu utama (Instant, Schedule, Join)        |
| `MeetingModal`    | Modal untuk create/join meeting dengan form |
| `MeetingRoom`     | Interface video conference utama            |
| `MeetingSetup`    | Setup camera/microphone sebelum join        |
| `CallList`        | Menampilkan daftar meetings                 |
| `MeetingCard`     | Card untuk tampilkan meeting preview        |
| `Navbar`          | Header dengan user info & menu              |
| `Sidebar`         | Navigation menu ke berbagai section         |
| `EndCallButton`   | Tombol untuk keluar dari meeting            |

## 🛣️ Routing & Pages

```
/ (Home/Dashboard)
├── /upcoming - Rapat mendatang
├── /previous - Rapat sebelumnya
├── /recordings - Video recordings
├── /personal-room - Ruang pribadi
└── /meeting/[id] - Detail meeting & video conference
```

**Protected Routes**: Semua route di `(root)` memerlukan authentication
**Public Routes**: `(auth)` pages untuk login/signup

## 🎨 Styling & UI

- **Framework**: Tailwind CSS v4 dengan PostCSS
- **Components**: shadcn/ui (dibangun dari Radix UI)
- **Dark Mode**: Support dark mode menggunakan next-themes
- **Responsive**: Mobile-first design dengan Tailwind breakpoints

### Warna Palet Default:

```css
/* Primary Colors */
--primary: #2563eb (Blue) --success: #22c55e (Green) /* Text */
  --text-dark: #0f172a --text-secondary: #334155 /* Background */
  --bg-light: #ffffff --bg-section: #f8fafc /* Border */ --border: #e2e8f0;
```

## 👨‍💻 Developer Guide

### Creating New Components

1. **UI Components** → `components/ui/`
2. **Feature Components** → `components/` (misal: `components/meetings/`)
3. Gunakan TypeScript untuk type safety
4. Leverage shadcn/ui untuk consistency

### Adding New Pages

```bash
# Create new route
mkdir -p app/(root)/new-feature
touch app/(root)/new-feature/page.tsx
```

### Custom Hooks

Store di `hooks/` folder, gunakan `use` prefix:

```typescript
// hooks/useCustomHook.ts
export function useCustomHook() {
  // logic
}
```

### Server Actions

Store di `actions/` folder:

```typescript
// actions/myAction.ts
"use server";
export async function myAction() {
  // server-side logic
}
```

## 📤 Deployment

### Deploy ke Vercel (Rekomendasi)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables untuk Production

1. Buka Vercel Dashboard
2. Pilih project
3. Settings → Environment Variables
4. Tambahkan semua `.env.local` variables

### Pre-deployment Checklist

- [ ] Test semua fitur di local
- [ ] Jalankan `pnpm lint`
- [ ] Build success: `pnpm build`
- [ ] Update API keys untuk production
- [ ] Enable HTTPS & SSL
- [ ] Configure CORS jika ada backend eksternal

## 🆘 Troubleshooting

### Issue: "Stream API Key Missing"

**Solusi**: Pastikan `NEXT_PUBLIC_STREAM_API_KEY` sudah di `.env.local` dan restart dev server

### Issue: Auth redirect loop

**Solusi**: Verifikasi Clerk environment variables dan redirect URLs di Clerk dashboard

### Issue: Video tidak tampil

**Solusi**:

- Periksa browser permissions (camera/microphone)
- Pastikan browser mendukung WebRTC
- Clear browser cache

### Issue: Build error TypeScript

**Solusi**:

```bash
npm run build -- --no-lint
# atau
pnpm build
```

### Port 3000 sudah digunakan

**Solusi**:

```bash
pnpm dev -- -p 3001
```

## 📚 Resources & References

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Stream.io Video SDK](https://getstream.io/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 📝 License

Private project - All rights reserved

## 👤 Author

Developed for video conferencing solution

---

**Happy Coding! 🚀**

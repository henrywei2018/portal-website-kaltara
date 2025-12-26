# Track Spec: Revamp Admin UI & Konten Management

## Overview
Menyempurnakan halaman admin agar lebih mudah digunakan untuk pengelolaan seluruh konten portal, dengan sidebar terstruktur dan tampilan manajemen administrasi internal yang umum.

## Functional Requirements
1. **Sidebar Admin**
   - Sidebar dengan grup menu (Konten, Statistik, Pengaturan, Pengguna).
   - Struktur mixed: menu utama tetap terlihat, sub-menu bisa collapse.

2. **Dashboard Ringkas**
   - Kartu statistik ringkas.
   - Quick actions untuk akses cepat.

3. **Search & Filter**
   - Pencarian global.
   - Filter list pada halaman manajemen.

4. **Modul Konten**
   - Halaman dinamis.
   - Berita/Artikel/Pengumuman.
   - Navigasi menu.

5. **Tampilan List**
   - Hybrid: table untuk data besar, card untuk ringkas.

6. **UI/UX Friendly & Modern**
   - Navigasi jelas, hierarki visual kuat, dan cepat dipahami.
   - Interaksi minim klik (quick actions, empty state informatif).

7. **Gaya Visual**
   - Mengikuti gaya admin saat ini (warna hijau, rounded).

## Non-Functional Requirements
- Responsif untuk mobile.
- Konsisten dengan sistem desain admin yang ada.
- Fokus pada keterbacaan, aksesibilitas, dan kecepatan orientasi pengguna.

## Acceptance Criteria
- Admin memiliki sidebar terstruktur dengan grup menu.
- Dashboard admin menampilkan ringkasan statistik + quick actions.
- List konten mendukung search dan filter.
- Modul konten utama tampil konsisten di admin.
- Tampilan list mengikuti pendekatan hybrid.
- UI/UX terasa friendly dan modern.

## Out of Scope
- Redesign total UI publik.
- Perubahan tech stack.

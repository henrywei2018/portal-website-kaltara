# Track Spec: CMS Admin Portal Kaltara

## Overview
Membangun dashboard admin CMS agar navigasi menu dan halaman portal dapat dikelola secara fleksibel tanpa mengubah codebase.

## Functional Requirements
1. **Manajemen Menu Navigasi**
   - Admin dapat menambah, mengubah, menghapus, dan mengurutkan menu utama.
   - Mendukung sub-menu 2 level.
   - Mendukung link eksternal.
   - Admin dapat toggle tampil/sembunyi untuk tiap item menu.

2. **Manajemen Halaman Dinamis**
   - Admin dapat membuat, mengubah, menghapus halaman.
   - Halaman memiliki judul, slug, dan konten berbasis blok modular.
   - Halaman dapat ditandai sebagai aktif/nonaktif.
   - Halaman dapat dihubungkan ke menu navigasi.

3. **Manajemen Berita/Artikel/Pengumuman**
   - Admin dapat membuat, mengubah, menghapus konten berita/artikel/pengumuman.
   - Konten menggunakan **Markdown editor**.
   - Memiliki status publish/draft.
   - Dapat dikategorikan (Berita/Artikel/Pengumuman) dan ditampilkan di publik.

4. **Manajemen Pengguna & Role Admin**
   - Role bertingkat: Super Admin, Editor, Viewer.
   - Super Admin: akses penuh.
   - Editor: kelola halaman & menu, serta konten berita/artikel/pengumuman.
   - Viewer: hanya melihat.
   - **Tidak ada registrasi publik; semua user dibuat, diubah, dan dinonaktifkan oleh admin.**

5. **Halaman Default**
   - Sistem menyediakan halaman awal: Beranda, Profil Pemerintah, Transparansi Publik.

## Non-Functional Requirements
- UX admin sederhana dan responsif (mobile friendly).
- Validasi input (slug unik, judul wajib, urutan menu).
- Tidak mengubah tech stack saat ini (Laravel + Inertia + React + Tailwind).

## Acceptance Criteria
- Admin dapat mengelola menu dan halaman tanpa edit codebase.
- Menu publik menampilkan perubahan sesuai pengaturan admin.
- Halaman dinamis dapat diakses via slug di sisi publik.
- Berita/artikel/pengumuman dapat dibuat dengan Markdown dan tampil di publik.
- Hak akses role berjalan sesuai ketentuan.
- Tidak ada registrasi publik; user hanya dikelola oleh admin.

## Out of Scope
- CMS media library (upload gambar/file).
- Workflow approval konten multi-step.
- Integrasi SSO eksternal.

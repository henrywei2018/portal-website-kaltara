# Track Spec: Standarisasi UI/UX Admin (List + Modal CRUD)

## Overview
Menyatukan pola UI/UX admin agar semua modul menggunakan indeks list yang ringkas (data + informasi + aksi), pencarian/filter/pagination, serta CRUD melalui modal slide-over.

## Functional Requirements
1. **Modul Cakupan**
   - Navigasi (menu)
   - Halaman (pages)
   - Konten (berita/pengumuman)
   - Dokumen PDF (pengumuman/IPKD)
   - Pengguna & role

2. **Pola Halaman Index**
   - List data ringkas dan mudah dibaca.
   - Menampilkan informasi inti dan aksi per item.
   - Aksi per item menggunakan dropdown “Aksi”.

3. **Pencarian, Filter, Pagination**
   - Pencarian tersedia di index.
   - Filter tersedia dalam drawer (khusus layar kecil).
   - Pagination 10 item per halaman.

4. **CRUD via Modal**
   - CRUD ditampilkan menggunakan modal slide-over dari kanan.
   - Modal create/edit menggunakan pola yang konsisten antar modul.

## Non-Functional Requirements
- UI compact, mudah dipindai, dan ramah pengguna.
- Konsisten dengan tema admin saat ini.

## Acceptance Criteria
- Semua modul admin mengikuti pola list + dropdown aksi.
- CRUD tampil via modal slide-over.
- Pencarian, filter, pagination tersedia dan konsisten.
- Pagination default 10 item/halaman.

## Out of Scope
- Perubahan struktur data atau model bisnis.
- Penggantian desain global di luar admin.

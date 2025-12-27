# Track Spec: Katalog Layanan Publik/Administrasi

## Overview
Menambahkan katalog layanan publik dengan kategori sektor tetap, pengelolaan layanan via admin (filter sektor + list layanan), dan tampilan publik dengan search global serta filter sektor (chips).

## Functional Requirements

### 1) Sektor Layanan (Master Data)
- Sektor tetap: Keluarga, Pendidikan, Karier, Usaha, Lingkungan & Tempat Tinggal, Kendaraan, Kesehatan, Hari Tua, Tanggap Darurat, Sosial & Hukum, Rekreasi, Lainnya.
- Data sektor dapat dikelola admin:
  - Nama sektor
  - Ikon/logo
  - Urutan tampil
  - Deskripsi singkat
  - Warna/label tampilan
  - Status tampil (aktif/nonaktif)

### 2) Layanan (Data Utama)
- Setiap layanan berada di satu sektor.
- Detail layanan mencakup:
  - Media & Informasi
  - Manfaat bagi masyarakat
  - Fitur Aplikasi SIDATUK
  - Ketentuan layanan
  - Alur pengguna layanan
  - Infografis (upload gambar + preview)
  - FAQ (list Q&A)
- Jumlah layanan per sektor dihitung otomatis dari data (bukan input manual).

### 3) Admin UI
- Satu halaman katalog layanan.
- Filter sektor untuk menyaring list layanan.
- List layanan mengikuti pola admin: list ringkas + aksi + modal CRUD.
- Form layanan menggunakan editor rich text per bagian.
- FAQ dikelola sebagai list pertanyaan & jawaban.

### 4) Publik UI
- Search bar global untuk layanan.
- Filter sektor berbentuk tag/chips.

## Non-Functional Requirements
- UI konsisten dengan tema admin sekarang.
- UX ringkas, mudah dipindai.
- Upload infografis mendukung preview.

## Acceptance Criteria
- Admin dapat membuat/ubah/hapus sektor.
- Admin dapat membuat/ubah/hapus layanan dan mengisi seluruh bagian detail.
- List layanan bisa difilter berdasarkan sektor.
- Publik bisa mencari layanan dan memfilter sektor dengan chips.
- Jumlah layanan per sektor tampil otomatis sesuai data.

## Out of Scope
- Perubahan besar desain publik di luar halaman katalog layanan.
- Integrasi eksternal di luar SIDATUK.

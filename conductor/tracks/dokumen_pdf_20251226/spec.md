# Track Spec: Manajemen Dokumen PDF (Pengumuman, IPKD, Dokumen Lain)

## Overview
Menambahkan pengelolaan dokumen PDF untuk Pengumuman, IPKD, dan Dokumen Lain, lengkap dengan preview dan metadata publikasi agar admin bisa mengelola file secara rapi tanpa menyentuh codebase.

## Functional Requirements
1. **Jenis Dokumen**
   - Pengumuman (PDF + preview)
   - IPKD (PDF + preview)
   - Dokumen Lain (kategori umum/arsip)

2. **Metadata Wajib**
   - Judul/Nama dokumen
   - Deskripsi singkat
   - Upload file PDF (maks 10 MB)
   - Tanggal Terbit
   - Tanggal Publikasi

3. **Preview PDF**
   - Embedded preview di halaman edit (iframe/pdf viewer).
   - Tombol “Lihat PDF” untuk membuka tab baru.

4. **Status**
   - Draft → Published.

5. **Storage**
   - Simpan file PDF di storage lokal (public disk).

## Non-Functional Requirements
- Validasi ukuran file maksimum 10 MB.
- UI konsisten dengan tema admin (warna hijau, rounded).
- Responsif dan mudah digunakan.

## Acceptance Criteria
- Admin bisa menambah/ubah/hapus dokumen PDF untuk Pengumuman, IPKD, dan Dokumen Lain.
- Semua metadata wajib tervalidasi.
- Preview PDF tersedia embedded + link buka tab baru.
- Dokumen dapat diset Draft atau Published.
- File tersimpan di storage lokal.

## Out of Scope
- Integrasi storage eksternal (S3/Cloud).
- Workflow approval multi-step.

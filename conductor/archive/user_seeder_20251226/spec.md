# Track Spec: Seeder User & Role Default

## Overview
Menambahkan seeder untuk membuat akun default Super Admin, Editor, dan Viewer agar setup awal portal selalu siap digunakan.

## Functional Requirements
1. **Seeder User Default**
   - Membuat 3 akun default: Super Admin, Editor, Viewer.
   - Masing-masing akun memiliki nama dan email tetap.
   - Password sama untuk semua akun.
   - Semua akun `is_active = true` dan `email_verified_at` terisi.

2. **Idempotent**
   - Seeder dapat dijalankan berulang tanpa duplikasi (gunakan `firstOrCreate` atau `updateOrCreate`).

3. **Integrasi Seeder**
   - Seeder user default dipanggil dari `DatabaseSeeder`.

## Non-Functional Requirements
- Password disimpan dalam bentuk hash.
- Tidak mengubah tech stack.

## Acceptance Criteria
- Menjalankan `php artisan db:seed` akan membuat 3 akun default sesuai role.
- Seeder aman dijalankan berulang kali (tidak menggandakan data).
- Semua akun aktif dan terverifikasi.

## Out of Scope
- Import user dari file eksternal.
- UI untuk mengubah default seeding.

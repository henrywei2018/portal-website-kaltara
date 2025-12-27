<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use App\Models\ContentItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ContentItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $items = [
            ContentType::News->value => [
                [
                    'title' => 'Kaltara Perkuat Layanan Publik Digital',
                    'excerpt' => 'Transformasi layanan publik terus didorong untuk mempercepat akses masyarakat.',
                    'body' => "## Fokus Digital\n\nPemerintah Provinsi Kalimantan Utara mempercepat digitalisasi layanan untuk menjangkau masyarakat lebih luas.\n\n- Layanan terpadu berbasis portal\n- Pemantauan status layanan\n- Akses informasi yang transparan",
                ],
                [
                    'title' => 'Program Prioritas Infrastruktur 2025',
                    'excerpt' => 'Arah pembangunan difokuskan pada konektivitas dan fasilitas dasar.',
                    'body' => "### Ringkasan\n\nPembangunan jalan dan fasilitas publik diprioritaskan untuk meningkatkan mobilitas dan akses layanan dasar.",
                ],
                [
                    'title' => 'Sinergi UMKM dan Layanan Perizinan',
                    'excerpt' => 'Kolaborasi antar dinas mempercepat layanan perizinan usaha.',
                    'body' => "### Informasi Utama\n\nPelaku UMKM kini dapat mengakses perizinan secara daring melalui portal.",
                ],
                [
                    'title' => 'Pelayanan Kesehatan Terpadu',
                    'excerpt' => 'Penguatan layanan kesehatan dasar di wilayah terpencil.',
                    'body' => "### Inisiatif\n\nPemerintah provinsi memperluas jangkauan layanan kesehatan terpadu.",
                ],
                [
                    'title' => 'Update Statistik Pembangunan Daerah',
                    'excerpt' => 'Ringkasan data ekonomi dan sosial terbaru Kalimantan Utara.',
                    'body' => "### Data Terkini\n\n- Pertumbuhan ekonomi stabil\n- Program sosial tepat sasaran",
                ],
                [
                    'title' => 'Penguatan Transparansi Publik',
                    'excerpt' => 'Informasi publik disajikan lebih terbuka dan mudah diakses.',
                    'body' => "### Transparansi\n\nPortal menghadirkan dokumen publik terbaru yang dapat diunduh masyarakat.",
                ],
            ],
            ContentType::Article->value => [
                [
                    'title' => 'Membangun Portal Informasi yang Ramah Warga',
                    'excerpt' => 'Prinsip desain yang mudah diakses untuk seluruh lapisan masyarakat.',
                    'body' => "## Kenapa Ramah Warga?\n\nPortal harus mudah dibaca, navigasi jelas, dan ringkas pada setiap perangkat.",
                ],
                [
                    'title' => 'Peran Data Terbuka dalam Kebijakan Publik',
                    'excerpt' => 'Data terbuka mempercepat pengambilan keputusan yang berbasis fakta.',
                    'body' => "## Data Terbuka\n\nTransparansi data membantu evaluasi program pemerintah dan partisipasi warga.",
                ],
                [
                    'title' => 'Kolaborasi Lintas Dinas untuk Layanan Terpadu',
                    'excerpt' => 'Integrasi layanan mempercepat proses dan meminimalkan duplikasi.',
                    'body' => "## Kolaborasi\n\nDengan integrasi layanan, masyarakat mendapatkan layanan end-to-end.",
                ],
                [
                    'title' => 'Literasi Digital untuk Masyarakat',
                    'excerpt' => 'Edukasi digital penting untuk memaksimalkan layanan publik daring.',
                    'body' => "## Literasi Digital\n\nProgram literasi digital membantu masyarakat memanfaatkan portal secara optimal.",
                ],
            ],
            ContentType::Announcement->value => [
                [
                    'title' => 'Pengumuman Pembaruan Portal',
                    'excerpt' => 'Portal layanan diperbarui dengan tampilan dan fitur baru.',
                    'body' => "### Pengumuman\n\nPortal informasi resmi telah diperbarui untuk meningkatkan pengalaman pengguna.",
                ],
                [
                    'title' => 'Jadwal Pemeliharaan Sistem',
                    'excerpt' => 'Pemeliharaan sistem dilakukan untuk meningkatkan performa.',
                    'body' => "### Jadwal\n\nPemeliharaan sistem dijadwalkan pada akhir pekan ini.",
                ],
                [
                    'title' => 'Layanan Publik Terpadu Resmi Dibuka',
                    'excerpt' => 'Kanal layanan terpadu dapat diakses melalui menu layanan publik.',
                    'body' => "### Layanan Baru\n\nMasyarakat dapat memantau status layanan secara real-time.",
                ],
            ],
        ];

        foreach ($items as $type => $entries) {
            foreach ($entries as $index => $entry) {
                $slug = Str::slug($entry['title']);

                ContentItem::query()->updateOrCreate(
                    ['slug' => $slug],
                    [
                        'title' => $entry['title'],
                        'type' => $type,
                        'status' => ContentStatus::Published,
                        'excerpt' => $entry['excerpt'],
                        'body' => $entry['body'],
                        'published_at' => $now->copy()->subDays($index + 1),
                    ]
                );
            }
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaults = [
            [
                'title' => 'Profil Pemerintah',
                'slug' => 'profil-pemerintah',
                'blocks' => [
                    ['type' => 'heading', 'content' => 'Profil Pemerintah Provinsi Kalimantan Utara'],
                    [
                        'type' => 'paragraph',
                        'content' => 'Profil singkat mengenai struktur organisasi, visi, misi, dan fokus pembangunan Pemerintah Provinsi Kalimantan Utara.',
                    ],
                    [
                        'type' => 'list',
                        'content' => "Visi pembangunan daerah\nMisi pelayanan publik\nFokus program prioritas",
                    ],
                    [
                        'type' => 'quote',
                        'content' => 'Kami berkomitmen menghadirkan layanan publik yang transparan, cepat, dan mudah diakses.',
                    ],
                ],
            ],
            [
                'title' => 'Transparansi Publik',
                'slug' => 'transparansi-publik',
                'blocks' => [
                    ['type' => 'heading', 'content' => 'Transparansi Publik'],
                    [
                        'type' => 'paragraph',
                        'content' => 'Kumpulan informasi resmi, laporan kinerja, dan dokumen publik yang dapat diakses oleh masyarakat.',
                    ],
                    [
                        'type' => 'list',
                        'content' => "Laporan keuangan\nDokumen pengumuman publik\nData kinerja tahunan",
                    ],
                ],
            ],
        ];

        foreach ($defaults as $page) {
            Page::query()->firstOrCreate(
                ['slug' => $page['slug']],
                [
                    'title' => $page['title'],
                    'status' => 'published',
                    'blocks' => $page['blocks'] ?? [],
                ]
            );
        }
    }
}

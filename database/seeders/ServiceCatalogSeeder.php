<?php

namespace Database\Seeders;

use App\Models\ServiceCatalogFaq;
use App\Models\ServiceCatalogItem;
use App\Models\ServiceSector;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sectors = [
            ['name' => 'Keluarga', 'color' => '#0f6b4f', 'services' => 6],
            ['name' => 'Pendidikan', 'color' => '#1f6feb', 'services' => 4],
            ['name' => 'Karier', 'color' => '#d97706', 'services' => 3],
            ['name' => 'Usaha', 'color' => '#2563eb', 'services' => 3],
            ['name' => 'Lingkungan & Tempat Tinggal', 'color' => '#16a34a', 'services' => 3],
            ['name' => 'Kendaraan', 'color' => '#0ea5e9', 'services' => 2],
            ['name' => 'Kesehatan', 'color' => '#dc2626', 'services' => 5],
            ['name' => 'Hari Tua', 'color' => '#6d28d9', 'services' => 2],
            ['name' => 'Tanggap Darurat', 'color' => '#ea580c', 'services' => 3],
            ['name' => 'Sosial & Hukum', 'color' => '#475569', 'services' => 4],
            ['name' => 'Rekreasi', 'color' => '#14b8a6', 'services' => 2],
            ['name' => 'Lainnya', 'color' => '#64748b', 'services' => 1],
        ];

        $providerName = 'Pemerintah Provinsi Kalimantan Utara';
        $statuses = ['online', 'limited', 'offline'];
        $operationalHours = [
            ['day' => 'Senin', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
            ['day' => 'Selasa', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
            ['day' => 'Rabu', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
            ['day' => 'Kamis', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
            ['day' => 'Jumat', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
            ['day' => 'Sabtu', 'opens_at' => null, 'closes_at' => null, 'is_closed' => true],
            ['day' => 'Minggu', 'opens_at' => null, 'closes_at' => null, 'is_closed' => true],
        ];
        $socialLinks = [
            ['platform' => 'instagram', 'url' => 'https://instagram.com/kaltara'],
            ['platform' => 'facebook', 'url' => 'https://facebook.com/kaltara'],
            ['platform' => 'youtube', 'url' => 'https://youtube.com/@kaltara'],
        ];

        foreach ($sectors as $index => $sector) {
            $storedSector = ServiceSector::query()->firstOrCreate(
                ['slug' => Str::slug($sector['name'])],
                [
                    'name' => $sector['name'],
                    'description' => 'Informasi layanan sektor '.$sector['name'].'.',
                    'color' => $sector['color'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );

            for ($serviceIndex = 1; $serviceIndex <= $sector['services']; $serviceIndex++) {
                $title = "Layanan {$sector['name']} {$serviceIndex}";
                $slug = Str::slug($title);
                $status = $statuses[($serviceIndex - 1) % count($statuses)];

                $item = ServiceCatalogItem::query()->firstOrCreate(
                    ['slug' => $slug],
                    [
                        'service_sector_id' => $storedSector->id,
                        'title' => $title,
                        'provider_name' => $providerName,
                        'summary' => "Ringkasan untuk {$title}.",
                        'service_status' => $status,
                        'service_cta_label' => 'Akses Layanan',
                        'service_cta_url' => "https://kaltara.go.id/layanan/{$slug}",
                        'hotline_phone' => '0811-000-000',
                        'service_website_url' => "https://kaltara.go.id/layanan/{$slug}/info",
                        'service_address' => 'Jl. Kolonel Soetadji, Tanjung Selor, Kalimantan Utara',
                        'service_phone' => '(0552) 555555',
                        'service_email' => 'layanan@kaltara.go.id',
                        'operational_hours' => $operationalHours,
                        'social_links' => $socialLinks,
                        'media_information' => "<p>Media dan informasi terkait {$title}.</p>",
                        'community_benefits' => '<ul><li>Manfaat langsung bagi masyarakat.</li><li>Akses informasi yang lebih cepat.</li></ul>',
                        'sidatuk_features' => '<ul><li>Form pengajuan layanan</li><li>Pelacakan status</li></ul>',
                        'service_terms' => '<p>Pastikan data yang diisi sesuai dokumen resmi.</p>',
                        'service_flow' => '<ol><li>Pilih layanan.</li><li>Lengkapi data.</li><li>Ajukan dan pantau status.</li></ol>',
                        'is_active' => true,
                    ]
                );

                if (! $item->faqs()->exists()) {
                    $faqs = [
                        ['question' => 'Bagaimana cara mengakses layanan ini?', 'answer' => 'Masuk ke portal, lalu klik tombol akses layanan.'],
                        ['question' => 'Apa syarat utama layanan ini?', 'answer' => 'Siapkan dokumen identitas dan bukti pendukung.'],
                        ['question' => 'Berapa lama prosesnya?', 'answer' => 'Estimasi 1-3 hari kerja setelah pengajuan.'],
                    ];

                    foreach ($faqs as $faqIndex => $faq) {
                        ServiceCatalogFaq::query()->create([
                            'service_catalog_item_id' => $item->id,
                            'question' => $faq['question'],
                            'answer' => $faq['answer'],
                            'sort_order' => $faqIndex + 1,
                        ]);
                    }
                }
            }
        }
    }
}

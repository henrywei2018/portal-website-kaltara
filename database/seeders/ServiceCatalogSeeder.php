<?php

namespace Database\Seeders;

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
            ['name' => 'Keluarga', 'color' => '#0f6b4f'],
            ['name' => 'Pendidikan', 'color' => '#1f6feb'],
            ['name' => 'Karier', 'color' => '#d97706'],
            ['name' => 'Usaha', 'color' => '#2563eb'],
            ['name' => 'Lingkungan & Tempat Tinggal', 'color' => '#16a34a'],
            ['name' => 'Kendaraan', 'color' => '#0ea5e9'],
            ['name' => 'Kesehatan', 'color' => '#dc2626'],
            ['name' => 'Hari Tua', 'color' => '#6d28d9'],
            ['name' => 'Tanggap Darurat', 'color' => '#ea580c'],
            ['name' => 'Sosial & Hukum', 'color' => '#475569'],
            ['name' => 'Rekreasi', 'color' => '#14b8a6'],
            ['name' => 'Lainnya', 'color' => '#64748b'],
        ];

        foreach ($sectors as $index => $sector) {
            ServiceSector::query()->firstOrCreate(
                ['slug' => Str::slug($sector['name'])],
                [
                    'name' => $sector['name'],
                    'description' => 'Informasi layanan sektor '.$sector['name'].'.',
                    'color' => $sector['color'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}

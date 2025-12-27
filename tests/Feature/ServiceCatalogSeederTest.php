<?php

use App\Models\ServiceCatalogFaq;
use App\Models\ServiceCatalogItem;
use App\Models\ServiceSector;
use Database\Seeders\ServiceCatalogSeeder;
use Illuminate\Support\Str;

test('service catalog seeder creates demo services per sector', function () {
    $this->seed(ServiceCatalogSeeder::class);

    $expectedCounts = [
        'Keluarga' => 6,
        'Pendidikan' => 4,
        'Karier' => 3,
        'Usaha' => 3,
        'Lingkungan & Tempat Tinggal' => 3,
        'Kendaraan' => 2,
        'Kesehatan' => 5,
        'Hari Tua' => 2,
        'Tanggap Darurat' => 3,
        'Sosial & Hukum' => 4,
        'Rekreasi' => 2,
        'Lainnya' => 1,
    ];

    foreach ($expectedCounts as $name => $count) {
        $sector = ServiceSector::query()
            ->where('slug', Str::slug($name))
            ->first();

        expect($sector)->not->toBeNull();

        $items = ServiceCatalogItem::query()
            ->where('service_sector_id', $sector->id)
            ->get();

        expect($items)->toHaveCount($count);

        $sampleItem = $items->first();

        expect($sampleItem)->not->toBeNull()
            ->and($sampleItem->provider_name)->not->toBeEmpty()
            ->and($sampleItem->summary)->not->toBeEmpty()
            ->and($sampleItem->service_logo_path)->not->toBeEmpty()
            ->and($sampleItem->media_information)->not->toBeEmpty()
            ->and($sampleItem->community_benefits)->not->toBeEmpty()
            ->and($sampleItem->sidatuk_features)->not->toBeEmpty()
            ->and($sampleItem->service_terms)->not->toBeEmpty()
            ->and($sampleItem->service_flow)->not->toBeEmpty();

        expect($sector->icon_path)->not->toBeEmpty();

        $faqCount = ServiceCatalogFaq::query()
            ->where('service_catalog_item_id', $sampleItem->id)
            ->count();

        expect($faqCount)->toBeGreaterThan(0);
    }
});

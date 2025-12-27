<?php

use App\Models\ServiceCatalogFaq;
use App\Models\ServiceCatalogItem;
use App\Models\ServiceSector;
use Database\Seeders\ServiceCatalogSeeder;

test('service sector can have catalog items', function () {
    $sector = ServiceSector::factory()->create();
    $item = ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
    ]);

    expect($sector->catalogItems)->toHaveCount(1)
        ->and($sector->catalogItems->first()->is($item))->toBeTrue();
});

test('service catalog item can have faqs', function () {
    $item = ServiceCatalogItem::factory()->create();
    $faq = ServiceCatalogFaq::factory()->create([
        'service_catalog_item_id' => $item->id,
    ]);

    expect($item->faqs)->toHaveCount(1)
        ->and($item->faqs->first()->is($faq))->toBeTrue();
});

test('service catalog seeder creates default sectors', function () {
    $this->seed(ServiceCatalogSeeder::class);

    expect(ServiceSector::query()->count())->toBeGreaterThan(0)
        ->and(ServiceSector::query()->where('name', 'Keluarga')->exists())->toBeTrue();
});

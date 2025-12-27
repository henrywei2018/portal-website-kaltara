<?php

use App\Models\ServiceCatalogItem;
use App\Models\ServiceSector;
use Inertia\Testing\AssertableInertia as Assert;

test('public catalog shows active items with sector filters', function () {
    $sector = ServiceSector::factory()->create([
        'name' => 'Pendidikan',
        'slug' => 'pendidikan',
        'is_active' => true,
    ]);

    ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Beasiswa',
        'slug' => 'layanan-beasiswa',
        'is_active' => true,
        'media_information' => '<p>Informasi beasiswa.</p>',
    ]);

    ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Nonaktif',
        'slug' => 'layanan-nonaktif',
        'is_active' => false,
    ]);

    $response = $this->get('/layanan');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('portal/service-catalog/index')
        ->has('items', 1)
        ->where('items.0.title', 'Layanan Beasiswa')
        ->has('sectors', 1)
        ->where('sectors.0.name', 'Pendidikan')
        ->where('filters.query', '')
        ->where('filters.sector', null)
    );
});

test('public catalog can search and filter by sector', function () {
    $sector = ServiceSector::factory()->create([
        'name' => 'Kesehatan',
        'slug' => 'kesehatan',
        'is_active' => true,
    ]);

    $otherSector = ServiceSector::factory()->create([
        'name' => 'Sosial',
        'slug' => 'sosial',
        'is_active' => true,
    ]);

    ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Kesehatan Ibu',
        'slug' => 'layanan-kesehatan-ibu',
        'is_active' => true,
        'media_information' => '<p>Info kesehatan.</p>',
    ]);

    ServiceCatalogItem::factory()->create([
        'service_sector_id' => $otherSector->id,
        'title' => 'Layanan Sosial',
        'slug' => 'layanan-sosial',
        'is_active' => true,
    ]);

    $response = $this->get("/layanan?q=ibu&sector={$sector->id}");

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('portal/service-catalog/index')
        ->has('items', 1)
        ->where('items.0.title', 'Layanan Kesehatan Ibu')
        ->where('filters.query', 'ibu')
        ->where('filters.sector', $sector->id)
    );
});

test('public catalog detail shows active service item', function () {
    $sector = ServiceSector::factory()->create([
        'name' => 'Keluarga',
        'slug' => 'keluarga',
        'is_active' => true,
    ]);

    $item = ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Keluarga',
        'slug' => 'layanan-keluarga',
        'is_active' => true,
        'media_information' => '<p>Informasi keluarga.</p>',
    ]);

    $response = $this->get("/layanan/{$item->slug}");

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('portal/service-catalog/show')
        ->where('item.title', 'Layanan Keluarga')
        ->where('item.slug', 'layanan-keluarga')
        ->where('item.sector.name', 'Keluarga')
    );
});

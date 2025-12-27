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
        'provider_name' => 'Dinas Kependudukan',
        'summary' => 'Ringkasan layanan keluarga.',
        'service_status' => 'online',
        'service_cta_label' => 'Akses Layanan',
        'service_cta_url' => 'https://layanan.example.test',
        'hotline_phone' => '08123456789',
        'service_website_url' => 'https://layanan.example.test/info',
        'service_address' => 'Jl. Merdeka No. 1, Tanjung Selor',
        'service_phone' => '(0551) 123456',
        'service_email' => 'kontak@layanan.example.test',
        'operational_hours' => [
            ['day' => 'Senin', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
        ],
        'social_links' => [
            ['platform' => 'instagram', 'url' => 'https://instagram.com/layanan'],
        ],
        'service_logo_path' => 'service-catalog/logos/logo.png',
        'service_logo_disk' => 'public',
    ]);

    $response = $this->get("/layanan/{$item->slug}");

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('portal/service-catalog/show')
        ->where('item.title', 'Layanan Keluarga')
        ->where('item.slug', 'layanan-keluarga')
        ->where('item.sector.name', 'Keluarga')
        ->where('item.provider_name', 'Dinas Kependudukan')
        ->where('item.summary', 'Ringkasan layanan keluarga.')
        ->where('item.service_status', 'online')
        ->where('item.service_cta_label', 'Akses Layanan')
        ->where('item.service_cta_url', 'https://layanan.example.test')
        ->where('item.hotline_phone', '08123456789')
        ->where('item.service_website_url', 'https://layanan.example.test/info')
        ->where('item.service_address', 'Jl. Merdeka No. 1, Tanjung Selor')
        ->where('item.service_phone', '(0551) 123456')
        ->where('item.service_email', 'kontak@layanan.example.test')
        ->where('item.operational_hours.0.day', 'Senin')
        ->where('item.social_links.0.platform', 'instagram')
        ->where('item.service_logo_url', fn ($value) => is_string($value) && $value !== '')
    );
});

test('public catalog detail normalizes invalid service status', function () {
    $sector = ServiceSector::factory()->create([
        'name' => 'Sosial',
        'slug' => 'sosial',
        'is_active' => true,
    ]);

    $item = ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Sosial',
        'slug' => 'layanan-sosial',
        'is_active' => true,
        'service_status' => 'tidak-valid',
    ]);

    $response = $this->get("/layanan/{$item->slug}");

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('portal/service-catalog/show')
        ->where('item.service_status', 'online')
    );
});

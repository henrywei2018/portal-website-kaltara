<?php

use App\Enums\UserRole;
use App\Models\ServiceCatalogItem;
use App\Models\ServiceSector;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));
});

test('admin can view service catalog items', function () {
    $sector = ServiceSector::factory()->create();
    ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Keluarga',
        'media_information' => 'Media informasi pendidikan.',
    ]);

    $response = $this->get('/admin/service-catalog');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/service-catalog/index')
        ->has('items', 1)
        ->where('items.0.title', 'Layanan Keluarga')
        ->where('items.0.media_information', '<p>Media informasi pendidikan.</p>')
        ->has('sectors', 1)
    );
});

test('admin can filter service catalog items by sector', function () {
    $sector = ServiceSector::factory()->create([
        'name' => 'Pendidikan',
    ]);

    $otherSector = ServiceSector::factory()->create([
        'name' => 'Kesehatan',
    ]);

    ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Pendidikan',
    ]);

    ServiceCatalogItem::factory()->create([
        'service_sector_id' => $otherSector->id,
        'title' => 'Layanan Kesehatan',
    ]);

    $response = $this->get("/admin/service-catalog?sector={$sector->id}");

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/service-catalog/index')
        ->has('items', 1)
        ->where('items.0.title', 'Layanan Pendidikan')
        ->where('filters.sector', $sector->id)
    );
});

test('admin can create service catalog item with faq and infographic', function () {
    Storage::fake('public');
    $sector = ServiceSector::factory()->create();
    $file = UploadedFile::fake()->image('infografis.png');
    $logo = UploadedFile::fake()->image('logo.png');
    $operationalHours = [
        ['day' => 'Senin', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
        ['day' => 'Selasa', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
    ];
    $socialLinks = [
        ['platform' => 'instagram', 'url' => 'https://instagram.com/layanan'],
        ['platform' => 'youtube', 'url' => 'https://youtube.com/layanan'],
    ];

    $response = $this->post('/admin/service-catalog', [
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Pendidikan',
        'provider_name' => 'Dinas Pendidikan Provinsi',
        'summary' => 'Ringkasan layanan pendidikan untuk masyarakat.',
        'service_status' => 'online',
        'service_cta_label' => 'Akses Layanan',
        'service_cta_url' => 'https://layanan.example.test',
        'hotline_phone' => '08123456789',
        'service_website_url' => 'https://layanan.example.test/info',
        'service_address' => 'Jl. Merdeka No. 1, Tanjung Selor',
        'service_phone' => '(0551) 123456',
        'service_email' => 'kontak@layanan.example.test',
        'operational_hours' => $operationalHours,
        'social_links' => $socialLinks,
        'media_information' => 'Media informasi pendidikan.',
        'community_benefits' => 'Manfaat untuk masyarakat.',
        'sidatuk_features' => 'Fitur SIDATUK.',
        'service_terms' => 'Ketentuan layanan.',
        'service_flow' => 'Alur layanan.',
        'is_active' => true,
        'infographic' => $file,
        'service_logo' => $logo,
        'faqs' => [
            ['question' => 'Apa syaratnya?', 'answer' => 'KTP dan KK.', 'sort_order' => 1],
        ],
    ]);

    $response->assertRedirect()->assertSessionHas('success');

    $item = ServiceCatalogItem::query()->firstOrFail();

    $this->assertDatabaseHas('service_catalog_items', [
        'id' => $item->id,
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Pendidikan',
        'is_active' => 1,
    ]);

    $this->assertDatabaseHas('service_catalog_faqs', [
        'service_catalog_item_id' => $item->id,
        'question' => 'Apa syaratnya?',
    ]);

    Storage::disk('public')->assertExists($item->infographic_path);
    Storage::disk('public')->assertExists($item->service_logo_path);

    expect($item->provider_name)->toBe('Dinas Pendidikan Provinsi')
        ->and($item->summary)->toBe('Ringkasan layanan pendidikan untuk masyarakat.')
        ->and($item->service_status)->toBe('online')
        ->and($item->service_cta_label)->toBe('Akses Layanan')
        ->and($item->service_cta_url)->toBe('https://layanan.example.test')
        ->and($item->hotline_phone)->toBe('08123456789')
        ->and($item->service_website_url)->toBe('https://layanan.example.test/info')
        ->and($item->service_address)->toBe('Jl. Merdeka No. 1, Tanjung Selor')
        ->and($item->service_phone)->toBe('(0551) 123456')
        ->and($item->service_email)->toBe('kontak@layanan.example.test')
        ->and($item->operational_hours)->toMatchArray($operationalHours)
        ->and($item->social_links)->toMatchArray($socialLinks);
});

test('service catalog item requires mandatory fields', function () {
    $response = $this->post('/admin/service-catalog', [
        'title' => 'Layanan Tanpa Sektor',
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors([
        'service_sector_id',
        'media_information',
        'community_benefits',
        'sidatuk_features',
        'service_terms',
        'service_flow',
    ]);
});

test('admin can update service catalog item and faqs', function () {
    $sector = ServiceSector::factory()->create();
    $item = ServiceCatalogItem::factory()->create([
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Lama',
    ]);

    $response = $this->patch("/admin/service-catalog/{$item->id}", [
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Baru',
        'provider_name' => 'Dinas Pendidikan Provinsi',
        'summary' => 'Ringkasan layanan pendidikan untuk masyarakat.',
        'service_status' => 'limited',
        'service_cta_label' => 'Lihat Layanan',
        'service_cta_url' => 'https://layanan.example.test/baru',
        'hotline_phone' => '0800001122',
        'service_website_url' => 'https://layanan.example.test/portal',
        'service_address' => 'Jl. Jenderal Sudirman No. 10, Tanjung Selor',
        'service_phone' => '(0551) 654321',
        'service_email' => 'info@layanan.example.test',
        'operational_hours' => [
            ['day' => 'Senin', 'opens_at' => '08:00', 'closes_at' => '15:00', 'is_closed' => false],
        ],
        'social_links' => [
            ['platform' => 'facebook', 'url' => 'https://facebook.com/layanan'],
        ],
        'media_information' => 'Media informasi baru.',
        'community_benefits' => 'Manfaat baru.',
        'sidatuk_features' => 'Fitur baru.',
        'service_terms' => 'Ketentuan baru.',
        'service_flow' => 'Alur baru.',
        'is_active' => false,
        'faqs' => [
            ['question' => 'Bagaimana alurnya?', 'answer' => 'Ikuti instruksi.', 'sort_order' => 1],
        ],
    ]);

    $response->assertRedirect()->assertSessionHas('success');

    $this->assertDatabaseHas('service_catalog_items', [
        'id' => $item->id,
        'title' => 'Layanan Baru',
        'is_active' => 0,
    ]);

    $this->assertDatabaseHas('service_catalog_faqs', [
        'service_catalog_item_id' => $item->id,
        'question' => 'Bagaimana alurnya?',
    ]);

    $item->refresh();

    expect($item->provider_name)->toBe('Dinas Pendidikan Provinsi')
        ->and($item->summary)->toBe('Ringkasan layanan pendidikan untuk masyarakat.')
        ->and($item->service_status)->toBe('limited')
        ->and($item->service_cta_label)->toBe('Lihat Layanan')
        ->and($item->service_cta_url)->toBe('https://layanan.example.test/baru')
        ->and($item->hotline_phone)->toBe('0800001122')
        ->and($item->service_website_url)->toBe('https://layanan.example.test/portal')
        ->and($item->service_address)->toBe('Jl. Jenderal Sudirman No. 10, Tanjung Selor')
        ->and($item->service_phone)->toBe('(0551) 654321')
        ->and($item->service_email)->toBe('info@layanan.example.test')
        ->and($item->operational_hours)->toMatchArray([
            ['day' => 'Senin', 'opens_at' => '08:00', 'closes_at' => '15:00', 'is_closed' => false],
        ])
        ->and($item->social_links)->toMatchArray([
            ['platform' => 'facebook', 'url' => 'https://facebook.com/layanan'],
        ]);
});

test('admin can delete service catalog item', function () {
    $item = ServiceCatalogItem::factory()->create();

    $response = $this->delete("/admin/service-catalog/{$item->id}");

    $response->assertRedirect()->assertSessionHas('success');

    $this->assertDatabaseMissing('service_catalog_items', [
        'id' => $item->id,
    ]);
});

test('viewer cannot access service catalog items', function () {
    $this->actingAs(User::factory()->create([
        'role' => UserRole::Viewer,
    ]));

    $this->get('/admin/service-catalog')->assertForbidden();
});

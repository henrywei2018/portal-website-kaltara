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
    ]);

    $response = $this->get('/admin/service-catalog');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/service-catalog/index')
        ->has('items', 1)
        ->where('items.0.title', 'Layanan Keluarga')
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

    $response = $this->post('/admin/service-catalog', [
        'service_sector_id' => $sector->id,
        'title' => 'Layanan Pendidikan',
        'media_information' => 'Media informasi pendidikan.',
        'community_benefits' => 'Manfaat untuk masyarakat.',
        'sidatuk_features' => 'Fitur SIDATUK.',
        'service_terms' => 'Ketentuan layanan.',
        'service_flow' => 'Alur layanan.',
        'is_active' => true,
        'infographic' => $file,
        'faqs' => [
            ['question' => 'Apa syaratnya?', 'answer' => 'KTP dan KK.', 'sort_order' => 1],
        ],
    ]);

    $response->assertRedirect();

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

    $response->assertRedirect();

    $this->assertDatabaseHas('service_catalog_items', [
        'id' => $item->id,
        'title' => 'Layanan Baru',
        'is_active' => 0,
    ]);

    $this->assertDatabaseHas('service_catalog_faqs', [
        'service_catalog_item_id' => $item->id,
        'question' => 'Bagaimana alurnya?',
    ]);
});

test('admin can delete service catalog item', function () {
    $item = ServiceCatalogItem::factory()->create();

    $response = $this->delete("/admin/service-catalog/{$item->id}");

    $response->assertRedirect();

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

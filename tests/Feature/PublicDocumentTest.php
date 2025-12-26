<?php

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Models\DocumentItem;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;

it('renders published announcements list', function () {
    Storage::fake('public');

    DocumentItem::factory()->create([
        'title' => 'Pengumuman Resmi',
        'type' => DocumentType::Announcement,
        'status' => DocumentStatus::Published,
        'file_path' => 'documents/pengumuman.pdf',
        'file_disk' => 'public',
        'published_at' => now(),
    ]);

    DocumentItem::factory()->create([
        'title' => 'Draft Pengumuman',
        'type' => DocumentType::Announcement,
        'status' => DocumentStatus::Draft,
    ]);

    DocumentItem::factory()->create([
        'title' => 'IPKD Publik',
        'type' => DocumentType::Ipkd,
        'status' => DocumentStatus::Published,
        'published_at' => now(),
    ]);

    $response = get('/pengumuman');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('portal/documents')
        ->has('items', 1)
        ->where('items.0.title', 'Pengumuman Resmi')
        ->where('items.0.file_url', Storage::disk('public')->url('documents/pengumuman.pdf'))
    );
});

it('renders published ipkd list', function () {
    Storage::fake('public');

    DocumentItem::factory()->create([
        'title' => 'IPKD 2024',
        'type' => DocumentType::Ipkd,
        'status' => DocumentStatus::Published,
        'file_path' => 'documents/ipkd-2024.pdf',
        'file_disk' => 'public',
        'published_at' => now(),
    ]);

    DocumentItem::factory()->create([
        'title' => 'Draft IPKD',
        'type' => DocumentType::Ipkd,
        'status' => DocumentStatus::Draft,
    ]);

    DocumentItem::factory()->create([
        'title' => 'Pengumuman Publik',
        'type' => DocumentType::Announcement,
        'status' => DocumentStatus::Published,
        'published_at' => now(),
    ]);

    $response = get('/ipkd');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('portal/documents')
        ->has('items', 1)
        ->where('items.0.title', 'IPKD 2024')
        ->where('items.0.file_url', Storage::disk('public')->url('documents/ipkd-2024.pdf'))
    );
});

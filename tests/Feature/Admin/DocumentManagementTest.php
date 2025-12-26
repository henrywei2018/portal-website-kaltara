<?php

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Enums\UserRole;
use App\Models\DocumentItem;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));
});

test('admin can view document management list', function () {
    DocumentItem::factory()->create([
        'title' => 'IPKD 2024',
        'type' => DocumentType::Ipkd,
        'status' => DocumentStatus::Published,
    ]);

    $response = $this->get('/admin/documents');

    $response->assertOk();

    $response->assertInertia(fn ($page) => $page
        ->component('admin/documents/index')
        ->has('items', 1)
        ->where('items.0.title', 'IPKD 2024')
        ->where('listMode', 'cards')
        ->has('types')
        ->has('statuses')
    );
});

test('admin can create document item with PDF upload', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->create('ipkd-2024.pdf', 500, 'application/pdf');

    $response = $this->post('/admin/documents', [
        'title' => 'IPKD 2024',
        'description' => 'Ringkasan IPKD tahun 2024.',
        'type' => DocumentType::Ipkd->value,
        'status' => DocumentStatus::Draft->value,
        'file' => $file,
        'issued_at' => '2024-12-01',
        'published_at' => '2024-12-15',
    ]);

    $response->assertRedirect();

    $item = DocumentItem::query()->firstOrFail();

    $this->assertDatabaseHas('document_items', [
        'id' => $item->id,
        'title' => 'IPKD 2024',
        'type' => DocumentType::Ipkd->value,
        'status' => DocumentStatus::Draft->value,
        'file_disk' => 'public',
        'file_name' => 'ipkd-2024.pdf',
    ]);

    Storage::disk('public')->assertExists($item->file_path);
});

test('admin can update document item metadata without replacing file', function () {
    Storage::fake('public');
    Storage::disk('public')->put('documents/existing.pdf', 'dummy');

    $item = DocumentItem::factory()->create([
        'title' => 'Pengumuman Lama',
        'description' => 'Versi lama.',
        'type' => DocumentType::Announcement,
        'status' => DocumentStatus::Draft,
        'file_path' => 'documents/existing.pdf',
        'file_name' => 'existing.pdf',
        'file_size' => 10,
        'file_disk' => 'public',
        'issued_at' => '2024-01-01',
        'published_at' => '2024-01-02',
    ]);

    $response = $this->patch("/admin/documents/{$item->id}", [
        'title' => 'Pengumuman Baru',
        'description' => 'Versi terbaru.',
        'type' => DocumentType::Announcement->value,
        'status' => DocumentStatus::Published->value,
        'issued_at' => '2024-02-01',
        'published_at' => '2024-02-10',
    ]);

    $response->assertRedirect();

    $item->refresh();

    expect($item->title)->toBe('Pengumuman Baru')
        ->and($item->file_path)->toBe('documents/existing.pdf');

    Storage::disk('public')->assertExists('documents/existing.pdf');
});

test('admin can delete document item and its file', function () {
    Storage::fake('public');
    Storage::disk('public')->put('documents/to-delete.pdf', 'dummy');

    $item = DocumentItem::factory()->create([
        'file_path' => 'documents/to-delete.pdf',
        'file_name' => 'to-delete.pdf',
        'file_size' => 10,
        'file_disk' => 'public',
    ]);

    $response = $this->delete("/admin/documents/{$item->id}");

    $response->assertRedirect();

    $this->assertDatabaseMissing('document_items', [
        'id' => $item->id,
    ]);

    Storage::disk('public')->assertMissing('documents/to-delete.pdf');
});

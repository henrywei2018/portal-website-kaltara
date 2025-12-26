<?php

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use App\Enums\UserRole;
use App\Models\ContentItem;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));
});

test('admin can view content management list', function () {
    ContentItem::factory()->create([
        'title' => 'Pengumuman Resmi',
        'slug' => 'pengumuman-resmi',
        'type' => ContentType::Announcement,
        'status' => ContentStatus::Published,
        'body' => "# Pengumuman\n\nKonten markdown.",
    ]);

    $response = $this->get('/admin/content');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/content/index')
        ->has('items', 1)
        ->where('items.0.title', 'Pengumuman Resmi')
        ->where('items.0.meta', 'Pengumuman · Terbit')
        ->where('items.0.body', "# Pengumuman\n\nKonten markdown.")
        ->where('listMode', 'cards')
    );
});

test('content list uses table mode for large datasets', function () {
    ContentItem::factory()->count(7)->create();

    $response = $this->get('/admin/content');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/content/index')
        ->where('listMode', 'table')
    );
});

test('admin can search content by query', function () {
    ContentItem::factory()->create([
        'title' => 'Agenda Gubernur',
        'slug' => 'agenda-gubernur',
        'type' => ContentType::News,
        'status' => ContentStatus::Published,
    ]);

    ContentItem::factory()->create([
        'title' => 'Pengumuman Publik',
        'slug' => 'pengumuman-publik',
        'type' => ContentType::Announcement,
        'status' => ContentStatus::Published,
    ]);

    $response = $this->get('/admin/content?q=agenda');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/content/index')
        ->has('items', 1)
        ->where('items.0.title', 'Agenda Gubernur')
        ->where('filters.search', 'agenda')
    );
});

test('admin can filter content by type and status', function () {
    ContentItem::factory()->create([
        'title' => 'Draft Berita',
        'slug' => 'draft-berita',
        'type' => ContentType::News,
        'status' => ContentStatus::Draft,
    ]);

    ContentItem::factory()->create([
        'title' => 'Terbit Pengumuman',
        'slug' => 'terbit-pengumuman',
        'type' => ContentType::Announcement,
        'status' => ContentStatus::Published,
    ]);

    $response = $this->get('/admin/content?type=announcement&status=published');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/content/index')
        ->has('items', 1)
        ->where('items.0.title', 'Terbit Pengumuman')
        ->where('filters.type', 'announcement')
        ->where('filters.status', 'published')
    );
});

test('viewer cannot access content management', function () {
    $this->actingAs(User::factory()->create([
        'role' => UserRole::Viewer,
    ]));

    $this->get('/admin/content')->assertForbidden();
});

test('admin can create content item', function () {
    $response = $this->post('/admin/content', [
        'title' => 'Agenda Gubernur',
        'slug' => 'agenda-gubernur',
        'type' => ContentType::News->value,
        'status' => ContentStatus::Draft->value,
        'excerpt' => 'Ringkasan agenda resmi.',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('content_items', [
        'title' => 'Agenda Gubernur',
        'slug' => 'agenda-gubernur',
        'type' => ContentType::News->value,
        'status' => ContentStatus::Draft->value,
    ]);
});

test('admin can update content item', function () {
    $item = ContentItem::factory()->create([
        'title' => 'Berita Lama',
        'slug' => 'berita-lama',
        'type' => ContentType::News,
        'status' => ContentStatus::Draft,
    ]);

    $response = $this->patch("/admin/content/{$item->id}", [
        'title' => 'Berita Baru',
        'slug' => 'berita-baru',
        'type' => ContentType::Article->value,
        'status' => ContentStatus::Published->value,
        'excerpt' => 'Ringkasan diperbarui.',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('content_items', [
        'id' => $item->id,
        'title' => 'Berita Baru',
        'slug' => 'berita-baru',
        'type' => ContentType::Article->value,
        'status' => ContentStatus::Published->value,
    ]);
});

test('admin can delete content item', function () {
    $item = ContentItem::factory()->create([
        'title' => 'Hapus Saya',
        'slug' => 'hapus-saya',
        'type' => ContentType::News,
        'status' => ContentStatus::Draft,
    ]);

    $response = $this->delete("/admin/content/{$item->id}");

    $response->assertRedirect();

    $this->assertDatabaseMissing('content_items', [
        'id' => $item->id,
    ]);
});

<?php

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use App\Models\ContentItem;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;

it('renders published content on the public listing', function () {
    ContentItem::factory()->create([
        'title' => 'Berita Utama',
        'slug' => 'berita-utama',
        'type' => ContentType::News,
        'status' => ContentStatus::Published,
        'excerpt' => 'Ringkasan berita utama.',
        'published_at' => now(),
    ]);

    ContentItem::factory()->create([
        'title' => 'Draft Artikel',
        'slug' => 'draft-artikel',
        'type' => ContentType::Article,
        'status' => ContentStatus::Draft,
    ]);

    $response = get('/berita');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('news/index')
        ->has('newsItems', 1)
        ->where('newsItems.0.title', 'Berita Utama')
        ->where('newsItems.0.category', ContentType::News->label())
    );
});

it('renders published content detail by slug', function () {
    $content = ContentItem::factory()->create([
        'title' => 'Pengumuman Resmi',
        'slug' => 'pengumuman-resmi',
        'type' => ContentType::Announcement,
        'status' => ContentStatus::Published,
        'body' => "# Judul Pengumuman\n\nIsi pengumuman.",
        'published_at' => now(),
    ]);

    $response = get("/berita/{$content->slug}");

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('news/show')
        ->where('news.slug', 'pengumuman-resmi')
        ->where('news.category', ContentType::Announcement->label())
        ->where('news.body_html', fn (string $value) => str_contains($value, '<h1>'))
    );
});

it('does not show draft content detail', function () {
    $content = ContentItem::factory()->create([
        'title' => 'Draft Internal',
        'slug' => 'draft-internal',
        'type' => ContentType::Article,
        'status' => ContentStatus::Draft,
    ]);

    get("/berita/{$content->slug}")->assertNotFound();
});

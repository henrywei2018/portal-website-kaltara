<?php

use App\Models\Page;
use Inertia\Testing\AssertableInertia as Assert;

test('public page renders by slug', function () {
    $page = Page::factory()->create([
        'title' => 'Profil Pemerintah',
        'slug' => 'profil-pemerintah',
        'status' => 'published',
        'blocks' => [
            ['type' => 'heading', 'content' => 'Tentang Kaltara'],
            ['type' => 'paragraph', 'content' => 'Informasi singkat tentang provinsi.'],
        ],
    ]);

    $response = $this->get("/{$page->slug}");

    $response->assertOk();

    $response->assertInertia(fn (Assert $inertia) => $inertia
        ->component('pages/show')
        ->where('page.title', 'Profil Pemerintah')
        ->where('page.slug', 'profil-pemerintah')
        ->where('page.blocks.0.type', 'heading')
    );
});

test('draft page is not visible to public', function () {
    $page = Page::factory()->create([
        'title' => 'Draft Page',
        'slug' => 'draft-page',
        'status' => 'draft',
    ]);

    $this->get("/{$page->slug}")->assertNotFound();
});

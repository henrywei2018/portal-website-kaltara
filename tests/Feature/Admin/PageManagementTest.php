<?php

use App\Enums\UserRole;
use App\Models\Page;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));
});

test('admin can view page management list', function () {
    Page::factory()->create([
        'title' => 'Profil Pemerintah',
        'slug' => 'profil-pemerintah',
        'status' => 'published',
    ]);

    $response = $this->get('/admin/pages');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/pages/index')
        ->has('pages', 1)
        ->where('pages.0.title', 'Profil Pemerintah')
        ->where('listMode', 'cards')
    );
});

test('page list uses table mode for large datasets', function () {
    Page::factory()->count(7)->create();

    $response = $this->get('/admin/pages');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/pages/index')
        ->where('listMode', 'table')
    );
});

test('viewer cannot access page management', function () {
    $this->actingAs(User::factory()->create([
        'role' => UserRole::Viewer,
    ]));

    $this->get('/admin/pages')->assertForbidden();
});

test('admin can create a page', function () {
    $response = $this->post('/admin/pages', [
        'title' => 'Transparansi Publik',
        'slug' => 'transparansi-publik',
        'status' => 'published',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('pages', [
        'title' => 'Transparansi Publik',
        'slug' => 'transparansi-publik',
        'status' => 'published',
    ]);
});

test('admin can update a page', function () {
    $page = Page::factory()->create([
        'title' => 'Beranda',
        'slug' => 'beranda',
        'status' => 'draft',
    ]);

    $response = $this->patch("/admin/pages/{$page->id}", [
        'title' => 'Beranda Utama',
        'slug' => 'beranda-utama',
        'status' => 'published',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('pages', [
        'id' => $page->id,
        'title' => 'Beranda Utama',
        'slug' => 'beranda-utama',
        'status' => 'published',
    ]);
});

test('admin can update page blocks', function () {
    $page = Page::factory()->create([
        'title' => 'Profil',
        'slug' => 'profil',
        'status' => 'published',
    ]);

    $blocks = [
        ['type' => 'heading', 'content' => 'Profil Pemerintah'],
        ['type' => 'paragraph', 'content' => 'Informasi singkat tentang pemerintah.'],
    ];

    $response = $this->patch("/admin/pages/{$page->id}", [
        'title' => 'Profil',
        'slug' => 'profil',
        'status' => 'published',
        'blocks' => $blocks,
    ]);

    $response->assertRedirect();

    expect(Page::find($page->id)->blocks)->toBe($blocks);
});

test('admin can delete a page', function () {
    $page = Page::factory()->create([
        'title' => 'Profil',
        'slug' => 'profil',
        'status' => 'published',
    ]);

    $response = $this->delete("/admin/pages/{$page->id}");

    $response->assertRedirect();

    $this->assertDatabaseMissing('pages', [
        'id' => $page->id,
    ]);
});

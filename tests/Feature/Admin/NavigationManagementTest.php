<?php

use App\Enums\UserRole;
use App\Models\NavigationItem;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));
});

test('admin can view navigation management list', function () {
    NavigationItem::factory()->create([
        'label' => 'Beranda',
        'slug' => 'beranda',
        'url' => '/beranda',
        'sort_order' => 1,
    ]);

    $response = $this->get('/admin/navigation');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/navigation/index')
        ->has('items', 1)
        ->where('items.0.label', 'Beranda')
        ->where('listMode', 'cards')
    );
});

test('navigation list uses table mode for large datasets', function () {
    NavigationItem::factory()->count(7)->create();

    $response = $this->get('/admin/navigation');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/navigation/index')
        ->where('listMode', 'table')
    );
});

test('admin can search navigation items', function () {
    NavigationItem::factory()->create([
        'label' => 'Beranda',
        'slug' => 'beranda',
        'url' => '/beranda',
        'sort_order' => 1,
    ]);

    NavigationItem::factory()->create([
        'label' => 'Kontak',
        'slug' => 'kontak',
        'url' => '/kontak',
        'sort_order' => 2,
    ]);

    $response = $this->get('/admin/navigation?q=beranda');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/navigation/index')
        ->has('items', 1)
        ->where('items.0.label', 'Beranda')
        ->where('filters.search', 'beranda')
    );
});

test('admin can filter navigation by visibility', function () {
    NavigationItem::factory()->create([
        'label' => 'Publik',
        'slug' => 'publik',
        'url' => '/publik',
        'is_visible' => true,
        'sort_order' => 1,
    ]);

    NavigationItem::factory()->create([
        'label' => 'Internal',
        'slug' => 'internal',
        'url' => '/internal',
        'is_visible' => false,
        'sort_order' => 2,
    ]);

    $response = $this->get('/admin/navigation?visibility=hidden');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/navigation/index')
        ->has('items', 1)
        ->where('items.0.label', 'Internal')
        ->where('filters.visibility', 'hidden')
    );
});

test('viewer cannot access navigation management', function () {
    $this->actingAs(User::factory()->create([
        'role' => UserRole::Viewer,
    ]));

    $this->get('/admin/navigation')->assertForbidden();
});

test('admin can create a navigation item', function () {
    $response = $this->post('/admin/navigation', [
        'label' => 'Layanan',
        'slug' => 'layanan',
        'url' => '/layanan',
        'is_external' => false,
        'is_visible' => true,
        'sort_order' => 1,
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('navigation_items', [
        'label' => 'Layanan',
        'slug' => 'layanan',
        'url' => '/layanan',
    ]);
});

test('admin can update a navigation item', function () {
    $item = NavigationItem::factory()->create([
        'label' => 'Profil',
        'slug' => 'profil',
        'url' => '/profil',
        'sort_order' => 3,
    ]);

    $response = $this->patch("/admin/navigation/{$item->id}", [
        'label' => 'Profil Pemprov',
        'slug' => 'profil-pemprov',
        'url' => '/profil',
        'is_external' => false,
        'is_visible' => true,
        'sort_order' => 2,
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('navigation_items', [
        'id' => $item->id,
        'label' => 'Profil Pemprov',
        'slug' => 'profil-pemprov',
        'sort_order' => 2,
    ]);
});

test('admin can delete a navigation item', function () {
    $item = NavigationItem::factory()->create([
        'label' => 'Kontak',
        'slug' => 'kontak',
        'url' => '/kontak',
    ]);

    $response = $this->delete("/admin/navigation/{$item->id}");

    $response->assertRedirect();

    $this->assertDatabaseMissing('navigation_items', [
        'id' => $item->id,
    ]);
});

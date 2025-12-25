<?php

use App\Models\NavigationItem;
use Inertia\Testing\AssertableInertia as Assert;

test('public homepage exposes navigation structure', function () {
    NavigationItem::factory()->create([
        'label' => 'Beranda',
        'url' => '/beranda',
        'sort_order' => 1,
    ]);
    NavigationItem::factory()->create([
        'label' => 'Berita',
        'url' => '/berita',
        'sort_order' => 2,
    ]);
    NavigationItem::factory()->create([
        'label' => 'Data',
        'url' => '/data',
        'sort_order' => 3,
    ]);
    NavigationItem::factory()->create([
        'label' => 'Transparansi',
        'url' => '/transparansi',
        'sort_order' => 4,
    ]);
    $profil = NavigationItem::factory()->create([
        'label' => 'Profil',
        'url' => '/profil',
        'sort_order' => 5,
    ]);
    NavigationItem::factory()->create([
        'parent_id' => $profil->id,
        'label' => 'Profil Pemerintah',
        'url' => '/profil/pemerintah',
        'sort_order' => 1,
    ]);
    NavigationItem::factory()->create([
        'label' => 'Kontak',
        'url' => '/kontak',
        'sort_order' => 6,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
        ->has('navigation', 6)
        ->where('navigation.0.label', 'Beranda')
        ->where('navigation.1.label', 'Berita')
        ->where('navigation.2.label', 'Data')
        ->where('navigation.3.label', 'Transparansi')
        ->where('navigation.4.label', 'Profil')
        ->where('navigation.5.label', 'Kontak')
        ->has('navigation.4.children', 1)
        ->where('navigation.4.children.0.label', 'Profil Pemerintah')
        ->where('hero.title', 'Portal Informasi Provinsi Kalimantan Utara')
        ->has('pillars', 3)
        ->where('pillars.0.title', 'Resmi & Tepercaya')
        ->where('pillars.1.title', 'Modern & Ringkas')
        ->where('pillars.2.title', 'Ramah Warga')
        ->has('newsHighlights', 3)
        ->where('newsHighlights.0.title', 'Judul berita resmi 1')
        ->has('statsHighlights', 4)
        ->where('statsHighlights.0.title', 'Ekonomi Daerah')
    );
});

test('beranda route renders the homepage', function () {
    $response = $this->get('/beranda');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
    );
});

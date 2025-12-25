<?php

use Inertia\Testing\AssertableInertia as Assert;

test('public homepage exposes navigation structure', function () {
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
        ->where('hero.title', 'Portal Informasi Provinsi Kalimantan Utara')
    );
});

test('beranda route renders the homepage', function () {
    $response = $this->get('/beranda');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
    );
});

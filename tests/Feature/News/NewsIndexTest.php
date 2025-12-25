<?php

use Inertia\Testing\AssertableInertia as Assert;

test('news index page is publicly accessible', function () {
    $response = $this->get('/berita');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('news/index')
        ->has('newsItems', 3)
        ->where('searchQuery', '')
        ->where('newsItems.0.title', 'Judul berita resmi 1')
    );
});

test('news index can be filtered by query', function () {
    $response = $this->get('/berita?q=agenda');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('news/index')
        ->where('searchQuery', 'agenda')
        ->has('newsItems', 1)
        ->where('newsItems.0.title', 'Judul berita resmi 2')
    );
});

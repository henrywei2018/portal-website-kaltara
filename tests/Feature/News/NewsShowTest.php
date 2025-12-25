<?php

use Inertia\Testing\AssertableInertia as Assert;

test('news detail page is publicly accessible', function () {
    $response = $this->get('/berita/judul-berita-resmi-1');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('news/show')
        ->where('news.title', 'Judul berita resmi 1')
        ->where('news.slug', 'judul-berita-resmi-1')
    );
});

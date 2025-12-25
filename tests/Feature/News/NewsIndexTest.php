<?php

use Inertia\Testing\AssertableInertia as Assert;

test('news index page is publicly accessible', function () {
    $response = $this->get('/berita');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('news/index')
        ->has('newsItems', 3)
        ->where('newsItems.0.title', 'Judul berita resmi 1')
    );
});

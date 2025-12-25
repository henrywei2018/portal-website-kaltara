<?php

use Inertia\Testing\AssertableInertia as Assert;

test('stats dashboard is publicly accessible', function () {
    $response = $this->get('/data');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('stats/index')
        ->has('highlights', 4)
        ->where('highlights.0.title', 'Ekonomi Daerah')
        ->has('sections', 3)
        ->where('sections.0.title', 'Ekonomi')
        ->where('sections.1.title', 'Sosial')
        ->where('sections.2.title', 'Infrastruktur')
    );
});

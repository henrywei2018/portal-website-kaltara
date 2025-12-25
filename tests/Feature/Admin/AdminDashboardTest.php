<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected from the admin dashboard', function () {
    $response = $this->get('/admin');

    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the admin dashboard', function () {
    $this->actingAs(User::factory()->create());

    $response = $this->get('/admin');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
    );
});

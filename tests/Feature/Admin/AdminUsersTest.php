<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected from admin user management', function () {
    $response = $this->get('/admin/users');

    $response->assertRedirect(route('login'));
});

test('authenticated users can view admin user management', function () {
    $user = User::factory()->create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
    ]);

    $response = $this->actingAs($user)->get('/admin/users');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/users/index')
        ->has('users', 1)
        ->where('users.0.email', 'admin@example.com')
        ->has('roles', 3)
    );
});

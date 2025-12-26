<?php

use App\Enums\UserRole;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected from admin user management', function () {
    $response = $this->get('/admin/users');

    $response->assertRedirect(route('login'));
});

test('super admins can view admin user management', function () {
    $user = User::factory()->create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'role' => UserRole::SuperAdmin,
    ]);

    $response = $this->actingAs($user)->get('/admin/users');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/users/index')
        ->has('users.data', 1)
        ->where('users.data.0.email', 'admin@example.com')
        ->where('users.data.0.meta', 'Super Admin · Aktif')
        ->where('users.per_page', 10)
        ->has('roles', 3)
    );
});

test('non super admins cannot access admin user management', function () {
    $this->actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));

    $this->get('/admin/users')->assertForbidden();
});

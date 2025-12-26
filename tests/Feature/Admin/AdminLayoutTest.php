<?php

use App\Enums\UserRole;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

it('shares admin navigation groups for admin pages', function () {
    $user = User::factory()->create([
        'role' => UserRole::Editor,
        'is_active' => true,
        'email_verified_at' => now(),
    ]);

    actingAs($user);

    $response = $this->get('/admin');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->has('adminNav.groups', 3)
        ->where('adminNav.groups.0.title', 'Konten')
        ->where('adminNav.groups.0.items.3.title', 'Dokumen PDF')
        ->where('adminNav.groups.1.title', 'Pengguna')
        ->where('auth.user.email', $user->email)
    );
});

it('marks active admin navigation item based on current route', function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
        'is_active' => true,
        'email_verified_at' => now(),
    ]));

    $response = $this->get('/admin');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->where('adminNav.groups.0.items.0.isActive', true)
    );
});

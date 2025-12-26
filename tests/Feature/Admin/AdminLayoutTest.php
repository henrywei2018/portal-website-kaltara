<?php

use App\Enums\UserRole;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

it('shares admin navigation groups for admin pages', function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
        'is_active' => true,
        'email_verified_at' => now(),
    ]));

    $response = $this->get('/admin');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->has('adminNav.groups', 4)
        ->where('adminNav.groups.0.title', 'Konten')
        ->where('adminNav.groups.2.title', 'Pengguna')
    );
});

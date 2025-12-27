<?php

use App\Enums\UserRole;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

test('admin sidebar includes service catalog menus', function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));

    $response = $this->get('/admin');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->where('adminNav.groups.0.title', 'Konten')
        ->where('adminNav.groups.0.items.4.title', 'Katalog Layanan')
        ->where('adminNav.groups.0.items.5.title', 'Sektor Layanan')
    );
});

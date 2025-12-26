<?php

use App\Enums\UserRole;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));
});

test('admin navigation declares drawer filter pattern', function () {
    $response = $this->get('/admin/navigation');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/navigation/index')
        ->where('filterMode', 'drawer')
    );
});

test('admin content declares drawer filter pattern', function () {
    $response = $this->get('/admin/content');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/content/index')
        ->where('filterMode', 'drawer')
    );
});

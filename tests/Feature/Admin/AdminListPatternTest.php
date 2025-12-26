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

test('admin navigation list declares compact list pattern', function () {
    $response = $this->get('/admin/navigation');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/navigation/index')
        ->where('listStyle', 'compact')
        ->where('actionMode', 'dropdown')
    );
});

test('admin content list declares compact list pattern', function () {
    $response = $this->get('/admin/content');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/content/index')
        ->where('listStyle', 'compact')
        ->where('actionMode', 'dropdown')
    );
});

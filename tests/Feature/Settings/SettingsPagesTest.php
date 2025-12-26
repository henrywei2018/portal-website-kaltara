<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create());
});

it('renders settings pages', function (string $url, ?string $component, ?string $redirect = null) {
    $response = $this->get($url);

    if ($redirect) {
        $response->assertRedirect($redirect);

        return;
    }

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component($component)
    );
})->with([
    'profile' => ['/admin/settings/profile', 'settings/profile', null],
    'password' => ['/admin/settings/password', 'settings/password', null],
    'appearance' => ['/admin/settings/appearance', 'settings/appearance', null],
    'two-factor' => ['/admin/settings/two-factor', null, '/user/confirm-password'],
]);

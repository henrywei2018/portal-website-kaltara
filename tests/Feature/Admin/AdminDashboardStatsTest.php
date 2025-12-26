<?php

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use App\Enums\UserRole;
use App\Models\ContentItem;
use App\Models\NavigationItem;
use App\Models\Page;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

it('shows dashboard stats in admin', function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
        'is_active' => true,
        'email_verified_at' => now(),
    ]));

    Page::factory()->count(2)->create();
    NavigationItem::factory()->count(3)->create();
    ContentItem::factory()->create([
        'type' => ContentType::News,
        'status' => ContentStatus::Published,
    ]);
    ContentItem::factory()->create([
        'type' => ContentType::Announcement,
        'status' => ContentStatus::Draft,
    ]);

    $response = $this->get('/admin');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->where('stats.pages', 2)
        ->where('stats.navigation', 3)
        ->where('stats.content', 2)
        ->where('stats.published_content', 1)
    );
});

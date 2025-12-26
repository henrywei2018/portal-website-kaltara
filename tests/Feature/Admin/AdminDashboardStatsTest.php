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

it('provides quick actions and module links for the admin dashboard', function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
        'is_active' => true,
        'email_verified_at' => now(),
    ]));

    $response = $this->get('/admin');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard')
        ->has('quickActions', 3)
        ->where('quickActions.0.label', 'Tambah Halaman')
        ->where('quickActions.0.href', route('admin.pages.index'))
        ->where('quickActions.1.label', 'Tambah Konten')
        ->where('quickActions.1.href', route('admin.content.index'))
        ->where('quickActions.2.label', 'Tambah Menu')
        ->where('quickActions.2.href', route('admin.navigation.index'))
        ->has('quickLinks', 4)
        ->where('quickLinks.0.title', 'Pengguna & Role')
        ->where('quickLinks.0.href', route('admin.users.index'))
        ->where('quickLinks.1.title', 'Menu Navigasi')
        ->where('quickLinks.1.href', route('admin.navigation.index'))
        ->where('quickLinks.2.title', 'Halaman Dinamis')
        ->where('quickLinks.2.href', route('admin.pages.index'))
        ->where('quickLinks.3.title', 'Berita & Pengumuman')
        ->where('quickLinks.3.href', route('admin.content.index'))
    );
});

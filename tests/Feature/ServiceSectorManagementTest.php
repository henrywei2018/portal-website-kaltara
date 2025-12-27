<?php

use App\Enums\UserRole;
use App\Models\ServiceSector;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    actingAs(User::factory()->create([
        'role' => UserRole::Editor,
    ]));
});

test('admin can view service sector management', function () {
    ServiceSector::factory()->create([
        'name' => 'Keluarga',
        'slug' => 'keluarga',
        'sort_order' => 1,
    ]);

    $response = $this->get('/admin/service-sectors');

    $response->assertOk();

    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/service-sectors/index')
        ->has('sectors', 1)
        ->where('sectors.0.name', 'Keluarga')
        ->where('sectors.0.slug', 'keluarga')
    );
});

test('admin can create a service sector', function () {
    $response = $this->post('/admin/service-sectors', [
        'name' => 'Pendidikan',
        'description' => 'Informasi layanan pendidikan.',
        'color' => '#1f6feb',
        'sort_order' => 2,
        'is_active' => true,
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('service_sectors', [
        'name' => 'Pendidikan',
        'slug' => 'pendidikan',
        'color' => '#1f6feb',
        'sort_order' => 2,
        'is_active' => 1,
    ]);
});

test('service sector requires mandatory fields', function () {
    $response = $this->post('/admin/service-sectors', [
        'description' => 'Deskripsi kosong nama.',
        'sort_order' => 1,
        'is_active' => true,
    ]);

    $response->assertSessionHasErrors(['name']);
});

test('admin can update a service sector', function () {
    $sector = ServiceSector::factory()->create([
        'name' => 'Karier',
        'slug' => 'karier',
        'sort_order' => 3,
    ]);

    $response = $this->patch("/admin/service-sectors/{$sector->id}", [
        'name' => 'Karier & Kompetensi',
        'description' => 'Informasi layanan karier.',
        'color' => '#d97706',
        'sort_order' => 4,
        'is_active' => false,
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('service_sectors', [
        'id' => $sector->id,
        'name' => 'Karier & Kompetensi',
        'slug' => 'karier-kompetensi',
        'sort_order' => 4,
        'is_active' => 0,
    ]);
});

test('admin can delete a service sector', function () {
    $sector = ServiceSector::factory()->create([
        'name' => 'Usaha',
        'slug' => 'usaha',
    ]);

    $response = $this->delete("/admin/service-sectors/{$sector->id}");

    $response->assertRedirect();

    $this->assertDatabaseMissing('service_sectors', [
        'id' => $sector->id,
    ]);
});

test('viewer cannot access service sector management', function () {
    $this->actingAs(User::factory()->create([
        'role' => UserRole::Viewer,
    ]));

    $this->get('/admin/service-sectors')->assertForbidden();
});

<?php

use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\DefaultUserSeeder;
use Illuminate\Support\Facades\Hash;

use function Pest\Laravel\seed;

it('seeds default users with roles and active status', function () {
    seed(DefaultUserSeeder::class);

    $admin = User::query()->where('email', 'admin@kaltara.go.id')->first();
    $editor = User::query()->where('email', 'editor@kaltara.go.id')->first();
    $viewer = User::query()->where('email', 'viewer@kaltara.go.id')->first();

    expect($admin)->not->toBeNull();
    expect($editor)->not->toBeNull();
    expect($viewer)->not->toBeNull();

    expect($admin->name)->toBe('Super Admin Kaltara');
    expect($admin->role)->toBe(UserRole::SuperAdmin);
    expect($admin->is_active)->toBeTrue();
    expect($admin->email_verified_at)->not->toBeNull();
    expect(Hash::check('password', $admin->password))->toBeTrue();

    expect($editor->name)->toBe('Editor Kaltara');
    expect($editor->role)->toBe(UserRole::Editor);
    expect($editor->is_active)->toBeTrue();
    expect($editor->email_verified_at)->not->toBeNull();

    expect($viewer->name)->toBe('Viewer Kaltara');
    expect($viewer->role)->toBe(UserRole::Viewer);
    expect($viewer->is_active)->toBeTrue();
    expect($viewer->email_verified_at)->not->toBeNull();
});

it('does not duplicate default users when re-seeded', function () {
    seed(DefaultUserSeeder::class);
    seed(DefaultUserSeeder::class);

    $count = User::query()
        ->whereIn('email', [
            'admin@kaltara.go.id',
            'editor@kaltara.go.id',
            'viewer@kaltara.go.id',
        ])
        ->count();

    expect($count)->toBe(3);
});

it('includes default users when running the database seeder', function () {
    seed();

    $count = User::query()
        ->whereIn('email', [
            'admin@kaltara.go.id',
            'editor@kaltara.go.id',
            'viewer@kaltara.go.id',
        ])
        ->count();

    expect($count)->toBe(3);
});

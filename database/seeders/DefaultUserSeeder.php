<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaults = [
            [
                'email' => 'admin@kaltara.go.id',
                'name' => 'Super Admin Kaltara',
                'role' => UserRole::SuperAdmin,
            ],
            [
                'email' => 'editor@kaltara.go.id',
                'name' => 'Editor Kaltara',
                'role' => UserRole::Editor,
            ],
            [
                'email' => 'viewer@kaltara.go.id',
                'name' => 'Viewer Kaltara',
                'role' => UserRole::Viewer,
            ],
        ];

        foreach ($defaults as $user) {
            User::query()->updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => Hash::make('password'),
                    'role' => $user['role'],
                    'is_active' => true,
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}

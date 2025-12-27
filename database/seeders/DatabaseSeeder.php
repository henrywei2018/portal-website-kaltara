<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DefaultUserSeeder::class,
            NavigationItemSeeder::class,
            PageSeeder::class,
            ContentItemSeeder::class,
            DocumentItemSeeder::class,
            ServiceCatalogSeeder::class,
        ]);
    }
}

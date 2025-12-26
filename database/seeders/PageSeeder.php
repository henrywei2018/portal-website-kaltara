<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaults = [
            ['title' => 'Beranda', 'slug' => 'beranda'],
            ['title' => 'Profil Pemerintah', 'slug' => 'profil-pemerintah'],
            ['title' => 'Transparansi Publik', 'slug' => 'transparansi-publik'],
        ];

        foreach ($defaults as $page) {
            Page::query()->firstOrCreate(
                ['slug' => $page['slug']],
                ['title' => $page['title'], 'status' => 'published']
            );
        }
    }
}

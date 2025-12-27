<?php

namespace Database\Seeders;

use App\Models\NavigationItem;
use Illuminate\Database\Seeder;

class NavigationItemSeeder extends Seeder
{
    public function run(): void
    {
        NavigationItem::query()->delete();

        NavigationItem::query()->create([
            'label' => 'Beranda',
            'slug' => 'beranda',
            'url' => '/beranda',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 1,
        ]);

        NavigationItem::query()->create([
            'label' => 'Berita',
            'slug' => 'berita',
            'url' => '/berita',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 2,
        ]);

        NavigationItem::query()->create([
            'label' => 'Layanan Publik',
            'slug' => 'layanan',
            'url' => '/layanan',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 3,
        ]);

        $documents = NavigationItem::query()->create([
            'label' => 'Dokumen Publik',
            'slug' => 'dokumen-publik',
            'url' => null,
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 4,
        ]);

        NavigationItem::query()->create([
            'parent_id' => $documents->id,
            'label' => 'Pengumuman',
            'slug' => 'pengumuman',
            'url' => '/pengumuman',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 1,
        ]);

        NavigationItem::query()->create([
            'parent_id' => $documents->id,
            'label' => 'Publikasi IPKD',
            'slug' => 'ipkd',
            'url' => '/ipkd',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 2,
        ]);

        $profil = NavigationItem::query()->create([
            'label' => 'Profil',
            'slug' => 'profil',
            'url' => null,
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 5,
        ]);

        NavigationItem::query()->create([
            'parent_id' => $profil->id,
            'label' => 'Profil Pemerintah',
            'slug' => 'profil-pemerintah',
            'url' => '/profil-pemerintah',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 1,
        ]);

        NavigationItem::query()->create([
            'parent_id' => $profil->id,
            'label' => 'Transparansi Publik',
            'slug' => 'transparansi',
            'url' => '/transparansi-publik',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 2,
        ]);

        NavigationItem::query()->create([
            'label' => 'Data',
            'slug' => 'data',
            'url' => '/data',
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => 6,
        ]);
    }
}

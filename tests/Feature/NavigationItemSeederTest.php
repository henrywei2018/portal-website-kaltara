<?php

use App\Models\NavigationItem;
use Database\Seeders\NavigationItemSeeder;

test('navigation seeder aligns portal menus with public content', function () {
    $this->seed(NavigationItemSeeder::class);

    $topLevel = NavigationItem::query()
        ->whereNull('parent_id')
        ->orderBy('sort_order')
        ->pluck('label')
        ->all();

    expect($topLevel)->toEqual([
        'Beranda',
        'Berita',
        'Layanan Publik',
        'Dokumen Publik',
        'Profil',
        'Data',
    ]);

    $documents = NavigationItem::query()
        ->where('label', 'Dokumen Publik')
        ->firstOrFail();

    $documentChildren = NavigationItem::query()
        ->where('parent_id', $documents->id)
        ->orderBy('sort_order')
        ->get(['label', 'url'])
        ->map(fn (NavigationItem $item) => [
            'label' => $item->label,
            'url' => $item->url,
        ])
        ->all();

    expect($documentChildren)->toEqual([
        ['label' => 'Pengumuman', 'url' => '/pengumuman'],
        ['label' => 'Publikasi IPKD', 'url' => '/ipkd'],
    ]);

    $profile = NavigationItem::query()
        ->where('label', 'Profil')
        ->firstOrFail();

    $profileChildren = NavigationItem::query()
        ->where('parent_id', $profile->id)
        ->orderBy('sort_order')
        ->get(['label', 'url'])
        ->map(fn (NavigationItem $item) => [
            'label' => $item->label,
            'url' => $item->url,
        ])
        ->all();

    expect($profileChildren)->toEqual([
        ['label' => 'Profil Pemerintah', 'url' => '/profil-pemerintah'],
        ['label' => 'Transparansi Publik', 'url' => '/transparansi-publik'],
    ]);
});

<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

$homeProps = fn () => [
    'canRegister' => Features::enabled(Features::registration()),
    'navigation' => [
        ['label' => 'Beranda', 'href' => '#beranda'],
        ['label' => 'Berita', 'href' => '#berita'],
        ['label' => 'Data', 'href' => '#data'],
        ['label' => 'Transparansi', 'href' => '#transparansi'],
        ['label' => 'Profil', 'href' => '#profil'],
        ['label' => 'Kontak', 'href' => '#kontak'],
    ],
    'hero' => [
        'title' => 'Portal Informasi Provinsi Kalimantan Utara',
        'subtitle' => 'Pusat informasi resmi untuk berita, data statistik, layanan, dan transparansi publik.',
    ],
    'pillars' => [
        [
            'title' => 'Resmi & Tepercaya',
            'detail' => 'Informasi tervalidasi langsung dari pemerintah provinsi.',
        ],
        [
            'title' => 'Modern & Ringkas',
            'detail' => 'Tampilan rapi dan mudah dipahami untuk semua perangkat.',
        ],
        [
            'title' => 'Ramah Warga',
            'detail' => 'Bahasa yang jelas, dekat dengan kebutuhan masyarakat.',
        ],
    ],
];

Route::get('/', function () use ($homeProps) {
    return Inertia::render('welcome', $homeProps());
})->name('home');

Route::get('/beranda', function () use ($homeProps) {
    return Inertia::render('welcome', $homeProps());
})->name('portal.home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';

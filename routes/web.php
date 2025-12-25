<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
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
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';

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
    'newsHighlights' => [
        [
            'title' => 'Judul berita resmi 1',
            'category' => 'Pengumuman',
            'excerpt' => 'Ringkasan singkat berita resmi untuk publik dan mitra.',
        ],
        [
            'title' => 'Judul berita resmi 2',
            'category' => 'Agenda',
            'excerpt' => 'Informasi kegiatan pemerintah provinsi yang akan datang.',
        ],
        [
            'title' => 'Judul berita resmi 3',
            'category' => 'Laporan',
            'excerpt' => 'Update program prioritas dan capaian kinerja daerah.',
        ],
    ],
    'statsHighlights' => [
        ['title' => 'Ekonomi Daerah', 'value' => '5,6%'],
        ['title' => 'Inflasi Tahunan', 'value' => '2,8%'],
        ['title' => 'Pengangguran', 'value' => '4,1%'],
        ['title' => 'Indeks Pembangunan', 'value' => '72,4'],
    ],
];

$newsItems = [
    [
        'title' => 'Judul berita resmi 1',
        'category' => 'Pengumuman',
        'excerpt' => 'Ringkasan singkat berita resmi untuk publik dan mitra.',
        'published_at' => '2025-01-15',
    ],
    [
        'title' => 'Judul berita resmi 2',
        'category' => 'Agenda',
        'excerpt' => 'Informasi kegiatan pemerintah provinsi yang akan datang.',
        'published_at' => '2025-01-12',
    ],
    [
        'title' => 'Judul berita resmi 3',
        'category' => 'Laporan',
        'excerpt' => 'Update program prioritas dan capaian kinerja daerah.',
        'published_at' => '2025-01-10',
    ],
];

Route::get('/', function () use ($homeProps) {
    return Inertia::render('welcome', $homeProps());
})->name('home');

Route::get('/beranda', function () use ($homeProps) {
    return Inertia::render('welcome', $homeProps());
})->name('portal.home');

Route::get('/berita', function () use ($newsItems) {
    return Inertia::render('news/index', [
        'newsItems' => $newsItems,
    ]);
})->name('news.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';

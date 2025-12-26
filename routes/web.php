<?php

use App\Http\Controllers\Admin\NavigationController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Models\NavigationItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

$navigationItems = fn () => NavigationItem::query()
    ->whereNull('parent_id')
    ->where('is_visible', true)
    ->with(['children' => fn ($query) => $query
        ->where('is_visible', true)
        ->orderBy('sort_order'),
    ])
    ->orderBy('sort_order')
    ->get()
    ->map(fn (NavigationItem $item): array => [
        'label' => $item->label,
        'href' => $item->url ?? ($item->slug ? "/{$item->slug}" : '#'),
        'is_external' => $item->is_external,
        'children' => $item->children->map(fn (NavigationItem $child): array => [
            'label' => $child->label,
            'href' => $child->url ?? ($child->slug ? "/{$child->slug}" : '#'),
            'is_external' => $child->is_external,
        ]),
    ]);

$homeProps = fn () => [
    'navigation' => $navigationItems(),
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
        'slug' => 'judul-berita-resmi-1',
        'category' => 'Pengumuman',
        'excerpt' => 'Ringkasan singkat berita resmi untuk publik dan mitra.',
        'published_at' => '2025-01-15',
    ],
    [
        'title' => 'Judul berita resmi 2',
        'slug' => 'judul-berita-resmi-2',
        'category' => 'Agenda',
        'excerpt' => 'Informasi kegiatan pemerintah provinsi yang akan datang.',
        'published_at' => '2025-01-12',
    ],
    [
        'title' => 'Judul berita resmi 3',
        'slug' => 'judul-berita-resmi-3',
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

Route::get('/berita', function (Request $request) use ($newsItems) {
    $searchQuery = trim((string) $request->query('q', ''));
    $filteredItems = collect($newsItems)
        ->when($searchQuery !== '', function ($items) use ($searchQuery) {
            $needle = Str::lower($searchQuery);

            return $items->filter(function (array $item) use ($needle) {
                return Str::contains(Str::lower($item['title']), $needle)
                    || Str::contains(Str::lower($item['category']), $needle);
            })->values();
        })
        ->values()
        ->all();

    return Inertia::render('news/index', [
        'newsItems' => $filteredItems,
        'searchQuery' => $searchQuery,
    ]);
})->name('news.index');

Route::get('/berita/{slug}', function (string $slug) use ($newsItems) {
    $news = collect($newsItems)->firstWhere('slug', $slug);

    if (! $news) {
        abort(404);
    }

    return Inertia::render('news/show', [
        'news' => $news,
    ]);
})->name('news.show');

Route::get('/data', function (Request $request) {
    $isLoading = $request->boolean('loading');
    $isEmpty = $request->boolean('empty');

    return Inertia::render('stats/index', [
        'isLoading' => $isLoading,
        'isEmpty' => $isEmpty,
        'highlights' => [
            ['title' => 'Ekonomi Daerah', 'value' => '5,6%'],
            ['title' => 'Inflasi Tahunan', 'value' => '2,8%'],
            ['title' => 'Pengangguran', 'value' => '4,1%'],
            ['title' => 'Indeks Pembangunan', 'value' => '72,4'],
        ],
        'sections' => [
            [
                'title' => 'Ekonomi',
                'items' => [
                    ['label' => 'PDRB', 'value' => 'Rp 28,4 T'],
                    ['label' => 'Investasi', 'value' => 'Rp 6,2 T'],
                ],
            ],
            [
                'title' => 'Sosial',
                'items' => [
                    ['label' => 'IPM', 'value' => '72,4'],
                    ['label' => 'Kemiskinan', 'value' => '6,1%'],
                ],
            ],
            [
                'title' => 'Infrastruktur',
                'items' => [
                    ['label' => 'Akses Internet', 'value' => '78%'],
                    ['label' => 'Jalan Mantap', 'value' => '68%'],
                ],
            ],
        ],
    ]);
})->name('stats.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'can:access-admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::get('users', [UserManagementController::class, 'index'])
        ->middleware('can:manage-users')
        ->name('users.index');
    Route::patch('users/{user}', [UserManagementController::class, 'update'])
        ->middleware('can:manage-users')
        ->name('users.update');

    Route::get('navigation', [NavigationController::class, 'index'])
        ->middleware('can:manage-navigation')
        ->name('navigation.index');
    Route::post('navigation', [NavigationController::class, 'store'])
        ->middleware('can:manage-navigation')
        ->name('navigation.store');
    Route::patch('navigation/{navigationItem}', [NavigationController::class, 'update'])
        ->middleware('can:manage-navigation')
        ->name('navigation.update');
    Route::delete('navigation/{navigationItem}', [NavigationController::class, 'destroy'])
        ->middleware('can:manage-navigation')
        ->name('navigation.destroy');

    Route::get('pages', [PageController::class, 'index'])
        ->middleware('can:manage-pages')
        ->name('pages.index');
    Route::post('pages', [PageController::class, 'store'])
        ->middleware('can:manage-pages')
        ->name('pages.store');
    Route::patch('pages/{page}', [PageController::class, 'update'])
        ->middleware('can:manage-pages')
        ->name('pages.update');
    Route::delete('pages/{page}', [PageController::class, 'destroy'])
        ->middleware('can:manage-pages')
        ->name('pages.destroy');
});

require __DIR__.'/settings.php';

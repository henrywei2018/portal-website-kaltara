<?php

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\NavigationController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Models\ContentItem;
use App\Models\NavigationItem;
use App\Models\Page;
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

Route::get('/', function () use ($homeProps) {
    return Inertia::render('welcome', $homeProps());
})->name('home');

Route::get('/beranda', function () use ($homeProps) {
    return Inertia::render('welcome', $homeProps());
})->name('portal.home');

Route::redirect('/register', '/login');
Route::post('/register', function () {
    abort(404);
});

Route::get('/berita', function (Request $request) {
    $searchQuery = trim((string) $request->query('q', ''));
    $typeQuery = $request->query('type');
    $type = $typeQuery ? ContentType::tryFrom((string) $typeQuery) : null;

    $items = ContentItem::query()
        ->where('status', ContentStatus::Published)
        ->when($type, fn ($query, ContentType $type) => $query->where('type', $type->value))
        ->when($searchQuery !== '', function ($query) use ($searchQuery) {
            $needle = Str::lower($searchQuery);

            $query->where(function ($builder) use ($needle) {
                $builder->whereRaw('lower(title) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(slug) like ?', ["%{$needle}%"]);
            });
        })
        ->orderByDesc('published_at')
        ->orderByDesc('created_at')
        ->get()
        ->map(fn (ContentItem $item): array => [
            'title' => $item->title,
            'slug' => $item->slug,
            'category' => $item->type->label(),
            'excerpt' => $item->excerpt ?? '',
            'published_at' => $item->published_at?->format('d M Y') ?? '',
        ])
        ->values()
        ->all();

    return Inertia::render('news/index', [
        'newsItems' => $items,
        'searchQuery' => $searchQuery,
        'activeType' => $type?->value,
    ]);
})->name('news.index');

Route::get('/berita/{slug}', function (string $slug) {
    $newsItem = ContentItem::query()
        ->where('slug', $slug)
        ->where('status', ContentStatus::Published)
        ->first();

    if (! $newsItem) {
        abort(404);
    }

    return Inertia::render('news/show', [
        'news' => [
            'title' => $newsItem->title,
            'slug' => $newsItem->slug,
            'category' => $newsItem->type->label(),
            'excerpt' => $newsItem->excerpt ?? '',
            'published_at' => $newsItem->published_at?->format('d M Y') ?? '',
            'body_html' => Str::markdown($newsItem->body ?? ''),
        ],
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
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'can:access-admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'pages' => Page::query()->count(),
                'navigation' => NavigationItem::query()->count(),
                'content' => ContentItem::query()->count(),
                'published_content' => ContentItem::query()
                    ->where('status', ContentStatus::Published)
                    ->count(),
            ],
            'quickActions' => [
                [
                    'label' => 'Tambah Halaman',
                    'href' => route('admin.pages.index'),
                ],
                [
                    'label' => 'Tambah Konten',
                    'href' => route('admin.content.index'),
                ],
                [
                    'label' => 'Tambah Menu',
                    'href' => route('admin.navigation.index'),
                ],
            ],
            'quickLinks' => [
                [
                    'title' => 'Pengguna & Role',
                    'description' => 'Kelola akun admin dan hak akses.',
                    'href' => route('admin.users.index'),
                ],
                [
                    'title' => 'Menu Navigasi',
                    'description' => 'Atur menu utama dan sub-menu portal.',
                    'href' => route('admin.navigation.index'),
                ],
                [
                    'title' => 'Halaman Dinamis',
                    'description' => 'Buat dan perbarui halaman publik.',
                    'href' => route('admin.pages.index'),
                ],
                [
                    'title' => 'Berita & Pengumuman',
                    'description' => 'Kelola konten berita berbasis Markdown.',
                    'href' => route('admin.content.index'),
                ],
            ],
        ]);
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

    Route::get('content', [ContentController::class, 'index'])
        ->middleware('can:manage-content')
        ->name('content.index');
    Route::post('content', [ContentController::class, 'store'])
        ->middleware('can:manage-content')
        ->name('content.store');
    Route::patch('content/{contentItem}', [ContentController::class, 'update'])
        ->middleware('can:manage-content')
        ->name('content.update');
    Route::delete('content/{contentItem}', [ContentController::class, 'destroy'])
        ->middleware('can:manage-content')
        ->name('content.destroy');
});

Route::get('/{page:slug}', function (Page $page) use ($navigationItems) {
    if ($page->status !== 'published') {
        abort(404);
    }

    return Inertia::render('pages/show', [
        'page' => [
            'title' => $page->title,
            'slug' => $page->slug,
            'blocks' => $page->blocks ?? [],
        ],
        'navigation' => $navigationItems(),
    ]);
})->name('pages.show');

require __DIR__.'/settings.php';

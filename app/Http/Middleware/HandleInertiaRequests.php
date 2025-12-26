<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        $adminNav = $request->is('admin*')
            ? [
                'groups' => [
                    [
                        'title' => 'Konten',
                        'items' => [
                            ['title' => 'Dashboard', 'href' => route('admin.dashboard')],
                            ['title' => 'Halaman Dinamis', 'href' => route('admin.pages.index')],
                            ['title' => 'Berita & Pengumuman', 'href' => route('admin.content.index')],
                            ['title' => 'Menu Navigasi', 'href' => route('admin.navigation.index')],
                        ],
                    ],
                    [
                        'title' => 'Statistik',
                        'items' => [
                            ['title' => 'Ringkasan Portal', 'href' => route('stats.index')],
                        ],
                    ],
                    [
                        'title' => 'Pengguna',
                        'items' => [
                            ['title' => 'Manajemen Pengguna', 'href' => route('admin.users.index')],
                        ],
                    ],
                    [
                        'title' => 'Pengaturan',
                        'items' => [
                            ['title' => 'Profil', 'href' => route('profile.edit')],
                            ['title' => 'Password', 'href' => route('user-password.edit')],
                            ['title' => 'Tampilan', 'href' => route('appearance.edit')],
                        ],
                    ],
                ],
            ]
            : null;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            ...($adminNav ? ['adminNav' => $adminNav] : []),
        ];
    }
}

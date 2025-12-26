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
        $currentPath = '/'.$request->path();
        $normalizePath = static function (string $url): string {
            $path = parse_url($url, PHP_URL_PATH);

            return $path ?: $url;
        };
        $isActive = static function (string $currentPath, string $url) use ($normalizePath): bool {
            $path = $normalizePath($url);

            return $currentPath === $path || str_starts_with($currentPath, $path.'/');
        };
        $adminNav = $request->is('admin*')
            ? [
                'groups' => [
                    [
                        'title' => 'Konten',
                        'items' => [
                            [
                                'title' => 'Dashboard',
                                'href' => route('admin.dashboard'),
                                'isActive' => $isActive($currentPath, route('admin.dashboard')),
                            ],
                            [
                                'title' => 'Halaman Dinamis',
                                'href' => route('admin.pages.index'),
                                'isActive' => $isActive($currentPath, route('admin.pages.index')),
                            ],
                            [
                                'title' => 'Berita & Pengumuman',
                                'href' => route('admin.content.index'),
                                'isActive' => $isActive($currentPath, route('admin.content.index')),
                            ],
                            [
                                'title' => 'Menu Navigasi',
                                'href' => route('admin.navigation.index'),
                                'isActive' => $isActive($currentPath, route('admin.navigation.index')),
                            ],
                        ],
                    ],
                    [
                        'title' => 'Pengguna',
                        'items' => [
                            [
                                'title' => 'Manajemen Pengguna',
                                'href' => route('admin.users.index'),
                                'isActive' => $isActive($currentPath, route('admin.users.index')),
                            ],
                        ],
                    ],
                    [
                        'title' => 'Pengaturan',
                        'items' => [
                            [
                                'title' => 'Profil',
                                'href' => route('profile.edit'),
                                'isActive' => $isActive($currentPath, route('profile.edit')),
                            ],
                            [
                                'title' => 'Password',
                                'href' => route('user-password.edit'),
                                'isActive' => $isActive($currentPath, route('user-password.edit')),
                            ],
                            [
                                'title' => 'Tampilan',
                                'href' => route('appearance.edit'),
                                'isActive' => $isActive($currentPath, route('appearance.edit')),
                            ],
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

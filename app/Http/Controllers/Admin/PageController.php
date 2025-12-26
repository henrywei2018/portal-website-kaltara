<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePageRequest;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    private const TABLE_THRESHOLD = 6;

    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q', ''));
        $status = $request->query('status');

        $validStatuses = ['draft', 'published'];
        $selectedStatus = in_array($status, $validStatuses, true) ? $status : null;

        $pagesQuery = Page::query()->orderBy('title');

        if ($search !== '') {
            $needle = Str::lower($search);

            $pagesQuery->where(function ($query) use ($needle) {
                $query->whereRaw('lower(title) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(slug) like ?', ["%{$needle}%"]);
            });
        }

        if ($selectedStatus !== null) {
            $pagesQuery->where('status', $selectedStatus);
        }

        $pageCount = (clone $pagesQuery)->count();

        $pages = $pagesQuery
            ->get()
            ->map(fn (Page $page): array => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'status' => $page->status,
                'blocks' => $page->blocks ?? [],
                'updated_at' => $page->updated_at?->toDateTimeString(),
            ]);

        return Inertia::render('admin/pages/index', [
            'pages' => $pages,
            'listMode' => $pageCount >= self::TABLE_THRESHOLD ? 'table' : 'cards',
            'listStyle' => 'compact',
            'actionMode' => 'dropdown',
            'modalMode' => 'slide-over',
            'filters' => [
                'search' => $search,
                'status' => $selectedStatus,
            ],
        ]);
    }

    public function store(StorePageRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['blocks'] = $data['blocks'] ?? [];

        Page::query()->create($data);

        return redirect()->back();
    }

    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        $data = $request->validated();
        $data['blocks'] = $data['blocks'] ?? [];

        $page->update($data);

        return redirect()->back();
    }

    public function destroy(Page $page): RedirectResponse
    {
        $page->delete();

        return redirect()->back();
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePageRequest;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function index(): Response
    {
        $pages = Page::query()
            ->orderBy('title')
            ->get()
            ->map(fn (Page $page) => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'status' => $page->status,
                'blocks' => $page->blocks ?? [],
                'updated_at' => $page->updated_at?->toDateTimeString(),
            ]);

        return Inertia::render('admin/pages/index', [
            'pages' => $pages,
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

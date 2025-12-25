<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNavigationItemRequest;
use App\Http\Requests\Admin\UpdateNavigationItemRequest;
use App\Models\NavigationItem;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NavigationController extends Controller
{
    public function index(): Response
    {
        $items = NavigationItem::query()
            ->with('parent')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (NavigationItem $item): array => [
                'id' => $item->id,
                'parent_id' => $item->parent_id,
                'parent_label' => $item->parent?->label,
                'label' => $item->label,
                'slug' => $item->slug,
                'url' => $item->url,
                'is_external' => $item->is_external,
                'is_visible' => $item->is_visible,
                'sort_order' => $item->sort_order,
            ]);

        $parents = NavigationItem::query()
            ->whereNull('parent_id')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (NavigationItem $item): array => [
                'id' => $item->id,
                'label' => $item->label,
            ]);

        return Inertia::render('admin/navigation/index', [
            'items' => $items,
            'parents' => $parents,
        ]);
    }

    public function store(StoreNavigationItemRequest $request): RedirectResponse
    {
        NavigationItem::query()->create($request->validated());

        return back(303);
    }

    public function update(UpdateNavigationItemRequest $request, NavigationItem $navigationItem): RedirectResponse
    {
        $navigationItem->update($request->validated());

        return back(303);
    }

    public function destroy(NavigationItem $navigationItem): RedirectResponse
    {
        $navigationItem->delete();

        return back(303);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNavigationItemRequest;
use App\Http\Requests\Admin\UpdateNavigationItemRequest;
use App\Models\NavigationItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NavigationController extends Controller
{
    private const TABLE_THRESHOLD = 6;

    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q', ''));
        $visibility = $request->query('visibility');

        $selectedVisibility = in_array($visibility, ['visible', 'hidden'], true)
            ? $visibility
            : null;

        $itemsQuery = NavigationItem::query()
            ->with('parent')
            ->orderBy('sort_order');

        if ($search !== '') {
            $needle = Str::lower($search);

            $itemsQuery->where(function ($query) use ($needle) {
                $query->whereRaw('lower(label) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(slug) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(url) like ?', ["%{$needle}%"]);
            });
        }

        if ($selectedVisibility === 'visible') {
            $itemsQuery->where('is_visible', true);
        }

        if ($selectedVisibility === 'hidden') {
            $itemsQuery->where('is_visible', false);
        }

        $items = $itemsQuery
            ->paginate(10)
            ->withQueryString()
            ->through(fn (NavigationItem $item): array => [
                'id' => $item->id,
                'parent_id' => $item->parent_id,
                'parent_label' => $item->parent?->label,
                'label' => $item->label,
                'slug' => $item->slug,
                'url' => $item->url,
                'is_external' => $item->is_external,
                'is_visible' => $item->is_visible,
                'sort_order' => $item->sort_order,
                'meta' => sprintf(
                    'Urutan %d · %s',
                    $item->sort_order,
                    $item->is_visible ? 'Tampil' : 'Tersembunyi'
                ),
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
            'listMode' => $items->total() >= self::TABLE_THRESHOLD ? 'table' : 'cards',
            'listStyle' => 'compact',
            'actionMode' => 'dropdown',
            'modalMode' => 'slide-over',
            'filterMode' => 'drawer',
            'filters' => [
                'search' => $search,
                'visibility' => $selectedVisibility,
            ],
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

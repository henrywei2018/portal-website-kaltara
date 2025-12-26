<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreContentItemRequest;
use App\Http\Requests\Admin\UpdateContentItemRequest;
use App\Models\ContentItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ContentController extends Controller
{
    private const TABLE_THRESHOLD = 6;

    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q', ''));
        $type = ContentType::tryFrom((string) $request->query('type'));
        $status = ContentStatus::tryFrom((string) $request->query('status'));

        $itemsQuery = ContentItem::query()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at');

        if ($search !== '') {
            $needle = Str::lower($search);

            $itemsQuery->where(function ($query) use ($needle) {
                $query->whereRaw('lower(title) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(slug) like ?', ["%{$needle}%"]);
            });
        }

        if ($type) {
            $itemsQuery->where('type', $type->value);
        }

        if ($status) {
            $itemsQuery->where('status', $status->value);
        }

        $itemCount = (clone $itemsQuery)->count();

        $items = $itemsQuery
            ->get()
            ->map(fn (ContentItem $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'type' => $item->type->value,
                'status' => $item->status->value,
                'excerpt' => $item->excerpt,
                'body' => $item->body,
                'published_at' => $item->published_at?->toDateString(),
            ]);

        return Inertia::render('admin/content/index', [
            'items' => $items,
            'types' => ContentType::options(),
            'statuses' => ContentStatus::options(),
            'listMode' => $itemCount >= self::TABLE_THRESHOLD ? 'table' : 'cards',
            'listStyle' => 'compact',
            'actionMode' => 'dropdown',
            'filters' => [
                'search' => $search,
                'type' => $type?->value,
                'status' => $status?->value,
            ],
        ]);
    }

    public function store(StoreContentItemRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['published_at'] = $this->resolvePublishedAt($data['status'], $data['published_at'] ?? null);

        ContentItem::query()->create($data);

        return redirect()->back();
    }

    public function update(UpdateContentItemRequest $request, ContentItem $contentItem): RedirectResponse
    {
        $data = $request->validated();
        $data['published_at'] = $this->resolvePublishedAt($data['status'], $data['published_at'] ?? null);

        $contentItem->update($data);

        return redirect()->back();
    }

    public function destroy(ContentItem $contentItem): RedirectResponse
    {
        $contentItem->delete();

        return redirect()->back();
    }

    protected function resolvePublishedAt(string $status, ?string $publishedAt): ?Carbon
    {
        if ($status === ContentStatus::Published->value) {
            return $publishedAt ? Carbon::parse($publishedAt) : now();
        }

        return null;
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreContentItemRequest;
use App\Http\Requests\Admin\UpdateContentItemRequest;
use App\Models\ContentItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ContentController extends Controller
{
    private const TABLE_THRESHOLD = 6;

    public function index(): Response
    {
        $itemsQuery = ContentItem::query()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at');

        $itemCount = $itemsQuery->count();

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
            'types' => \App\Enums\ContentType::options(),
            'statuses' => \App\Enums\ContentStatus::options(),
            'listMode' => $itemCount >= self::TABLE_THRESHOLD ? 'table' : 'cards',
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
        if ($status === \App\Enums\ContentStatus::Published->value) {
            return $publishedAt ? Carbon::parse($publishedAt) : now();
        }

        return null;
    }
}

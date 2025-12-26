<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDocumentItemRequest;
use App\Http\Requests\Admin\UpdateDocumentItemRequest;
use App\Models\DocumentItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DocumentItemController extends Controller
{
    private const TABLE_THRESHOLD = 6;

    public function index(): Response
    {
        $itemsQuery = DocumentItem::query()
            ->orderByDesc('published_at')
            ->orderByDesc('issued_at')
            ->orderByDesc('created_at');

        $items = $itemsQuery
            ->paginate(10)
            ->withQueryString()
            ->through(fn (DocumentItem $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'description' => $item->description,
                'type' => $item->type->value,
                'status' => $item->status->value,
                'file_name' => $item->file_name,
                'file_size' => $item->file_size,
                'file_url' => Storage::disk($item->file_disk)->url($item->file_path),
                'preview_url' => Storage::disk($item->file_disk)->url($item->file_path),
                'issued_at' => $item->issued_at?->toDateString(),
                'published_at' => $item->published_at?->toDateString(),
                'meta' => sprintf(
                    '%s · %s',
                    $item->type->label(),
                    $item->status->label()
                ),
            ]);

        return Inertia::render('admin/documents/index', [
            'items' => $items,
            'types' => \App\Enums\DocumentType::options(),
            'statuses' => \App\Enums\DocumentStatus::options(),
            'listMode' => $items->total() >= self::TABLE_THRESHOLD ? 'table' : 'cards',
            'listStyle' => 'compact',
            'actionMode' => 'dropdown',
            'modalMode' => 'slide-over',
            'filterMode' => 'drawer',
        ]);
    }

    public function store(StoreDocumentItemRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $file = $request->file('file');

        if ($file) {
            $data = $this->attachFileMetadata($data, $file, 'public');
        }

        $data['published_at'] = $this->resolvePublishedAt($data['status'], $data['published_at'] ?? null);

        DocumentItem::query()->create($data);

        return redirect()->back();
    }

    public function update(UpdateDocumentItemRequest $request, DocumentItem $documentItem): RedirectResponse
    {
        $data = $request->validated();
        $file = $request->file('file');

        if ($file) {
            $this->deleteFileIfExists($documentItem);
            $data = $this->attachFileMetadata($data, $file, $documentItem->file_disk ?? 'public');
        }

        $data['published_at'] = $this->resolvePublishedAt($data['status'], $data['published_at'] ?? null);

        $documentItem->update($data);

        return redirect()->back();
    }

    public function destroy(DocumentItem $documentItem): RedirectResponse
    {
        $this->deleteFileIfExists($documentItem);
        $documentItem->delete();

        return redirect()->back();
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function attachFileMetadata(array $data, \Illuminate\Http\UploadedFile $file, string $disk): array
    {
        $path = $file->store('documents', $disk);

        $data['file_path'] = $path;
        $data['file_name'] = $file->getClientOriginalName();
        $data['file_size'] = (int) $file->getSize();
        $data['file_disk'] = $disk;

        return $data;
    }

    protected function deleteFileIfExists(DocumentItem $documentItem): void
    {
        $path = (string) $documentItem->file_path;

        if ($path === '') {
            return;
        }

        $disk = $documentItem->file_disk ?? 'public';

        Storage::disk($disk)->delete($path);
    }

    protected function resolvePublishedAt(string $status, ?string $publishedAt): ?Carbon
    {
        if ($status === \App\Enums\DocumentStatus::Published->value) {
            return $publishedAt ? Carbon::parse($publishedAt) : now();
        }

        return null;
    }
}

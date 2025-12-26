<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDocumentItemRequest;
use App\Http\Requests\Admin\UpdateDocumentItemRequest;
use App\Models\DocumentItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class DocumentItemController extends Controller
{
    public function store(StoreDocumentItemRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $file = $request->file('file');

        if ($file) {
            $data = $this->attachFileMetadata($data, $file, 'public');
        }

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
}

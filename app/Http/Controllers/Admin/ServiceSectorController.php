<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceSectorRequest;
use App\Http\Requests\Admin\UpdateServiceSectorRequest;
use App\Models\ServiceSector;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceSectorController extends Controller
{
    public function index(): Response
    {
        $sectors = ServiceSector::query()
            ->orderBy('sort_order')
            ->get()
            ->map(fn (ServiceSector $sector): array => [
                'id' => $sector->id,
                'name' => $sector->name,
                'slug' => $sector->slug,
                'description' => $sector->description,
                'color' => $sector->color,
                'sort_order' => $sector->sort_order,
                'is_active' => $sector->is_active,
                'icon_url' => $sector->icon_path
                    ? Storage::disk($sector->icon_disk)->url($sector->icon_path)
                    : null,
                'meta' => sprintf(
                    'Urutan %d · %s',
                    $sector->sort_order,
                    $sector->is_active ? 'Aktif' : 'Nonaktif'
                ),
            ]);

        return Inertia::render('admin/service-sectors/index', [
            'sectors' => $sectors,
        ]);
    }

    public function store(StoreServiceSectorRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->generateSlug($data['name']);

        $icon = $request->file('icon');

        if ($icon) {
            $data = array_merge($data, $this->attachIconMetadata($icon, 'public'));
        }

        ServiceSector::query()->create($data);

        return back(303);
    }

    public function update(UpdateServiceSectorRequest $request, ServiceSector $serviceSector): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->generateSlug($data['name'], $serviceSector);

        $icon = $request->file('icon');

        if ($icon) {
            $this->deleteIconIfExists($serviceSector);
            $data = array_merge($data, $this->attachIconMetadata($icon, $serviceSector->icon_disk ?? 'public'));
        }

        $serviceSector->update($data);

        return back(303);
    }

    public function destroy(ServiceSector $serviceSector): RedirectResponse
    {
        $this->deleteIconIfExists($serviceSector);
        $serviceSector->delete();

        return back(303);
    }

    /**
     * @return array{icon_path: string, icon_name: string, icon_size: int, icon_disk: string}
     */
    protected function attachIconMetadata(\Illuminate\Http\UploadedFile $icon, string $disk): array
    {
        $path = $icon->store('service-sectors', $disk);

        return [
            'icon_path' => $path,
            'icon_name' => $icon->getClientOriginalName(),
            'icon_size' => (int) $icon->getSize(),
            'icon_disk' => $disk,
        ];
    }

    protected function deleteIconIfExists(ServiceSector $serviceSector): void
    {
        $path = (string) $serviceSector->icon_path;

        if ($path === '') {
            return;
        }

        $disk = $serviceSector->icon_disk ?? 'public';

        Storage::disk($disk)->delete($path);
    }

    protected function generateSlug(string $name, ?ServiceSector $ignore = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while ($this->slugExists($slug, $ignore)) {
            $counter++;
            $slug = "{$baseSlug}-{$counter}";
        }

        return $slug;
    }

    protected function slugExists(string $slug, ?ServiceSector $ignore = null): bool
    {
        $query = ServiceSector::query()->where('slug', $slug);

        if ($ignore) {
            $query->where('id', '!=', $ignore->id);
        }

        return $query->exists();
    }
}

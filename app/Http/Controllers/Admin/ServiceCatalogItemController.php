<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceCatalogItemRequest;
use App\Http\Requests\Admin\UpdateServiceCatalogItemRequest;
use App\Models\ServiceCatalogFaq;
use App\Models\ServiceCatalogItem;
use App\Models\ServiceSector;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceCatalogItemController extends Controller
{
    public function index(Request $request): Response
    {
        $sector = $request->query('sector');
        $sectorId = is_numeric($sector) ? (int) $sector : null;

        $itemsQuery = ServiceCatalogItem::query()
            ->with(['sector', 'faqs'])
            ->orderBy('title');

        if ($sectorId) {
            $itemsQuery->where('service_sector_id', $sectorId);
        }

        $items = $itemsQuery
            ->get()
            ->map(fn (ServiceCatalogItem $item): array => [
                'id' => $item->id,
                'sector_id' => $item->service_sector_id,
                'sector_name' => $item->sector?->name,
                'title' => $item->title,
                'slug' => $item->slug,
                'provider_name' => $item->provider_name,
                'summary' => $item->summary,
                'service_status' => $item->service_status,
                'service_cta_label' => $item->service_cta_label,
                'service_cta_url' => $item->service_cta_url,
                'hotline_phone' => $item->hotline_phone,
                'service_website_url' => $item->service_website_url,
                'service_address' => $item->service_address,
                'service_phone' => $item->service_phone,
                'service_email' => $item->service_email,
                'operational_hours' => $item->operational_hours ?? [],
                'social_links' => $item->social_links ?? [],
                'media_information' => $this->formatRichText($item->media_information),
                'community_benefits' => $this->formatRichText($item->community_benefits),
                'sidatuk_features' => $this->formatRichText($item->sidatuk_features),
                'service_terms' => $this->formatRichText($item->service_terms),
                'service_flow' => $this->formatRichText($item->service_flow),
                'service_logo_url' => $item->service_logo_path
                    ? Storage::disk($item->service_logo_disk ?? 'public')->url($item->service_logo_path)
                    : null,
                'infographic_url' => $item->infographic_path
                    ? Storage::disk($item->infographic_disk)->url($item->infographic_path)
                    : null,
                'is_active' => $item->is_active,
                'meta' => sprintf(
                    '%s · %s',
                    $item->sector?->name ?? 'Tanpa sektor',
                    $item->is_active ? 'Aktif' : 'Nonaktif'
                ),
                'faqs' => $item->faqs
                    ->sortBy('sort_order')
                    ->values()
                    ->map(fn (ServiceCatalogFaq $faq): array => [
                        'question' => $faq->question,
                        'answer' => $faq->answer,
                        'sort_order' => $faq->sort_order,
                    ]),
            ]);

        $sectors = ServiceSector::query()
            ->orderBy('sort_order')
            ->get()
            ->map(fn (ServiceSector $sector): array => [
                'id' => $sector->id,
                'name' => $sector->name,
            ]);

        return Inertia::render('admin/service-catalog/index', [
            'items' => $items,
            'sectors' => $sectors,
            'filters' => [
                'sector' => $sectorId,
            ],
        ]);
    }

    public function store(StoreServiceCatalogItemRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->generateSlug($data['title']);

        $infographic = $request->file('infographic');
        $serviceLogo = $request->file('service_logo');

        if ($infographic) {
            $data = array_merge($data, $this->attachInfographicMetadata($infographic, 'public'));
        }

        if ($serviceLogo) {
            $data = array_merge($data, $this->attachServiceLogoMetadata($serviceLogo, 'public'));
        }

        $faqs = $data['faqs'] ?? [];
        unset($data['faqs']);

        $item = ServiceCatalogItem::query()->create($data);

        $this->syncFaqs($item, $faqs);

        return back(303)->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function update(UpdateServiceCatalogItemRequest $request, ServiceCatalogItem $serviceCatalogItem): RedirectResponse
    {
        $data = $request->validated();
        $data['slug'] = $this->generateSlug($data['title'], $serviceCatalogItem);

        $infographic = $request->file('infographic');
        $serviceLogo = $request->file('service_logo');

        if ($infographic) {
            $this->deleteInfographicIfExists($serviceCatalogItem);
            $data = array_merge(
                $data,
                $this->attachInfographicMetadata($infographic, $serviceCatalogItem->infographic_disk ?? 'public')
            );
        }

        if ($serviceLogo) {
            $this->deleteServiceLogoIfExists($serviceCatalogItem);
            $data = array_merge(
                $data,
                $this->attachServiceLogoMetadata($serviceLogo, $serviceCatalogItem->service_logo_disk ?? 'public')
            );
        }

        $faqs = $data['faqs'] ?? [];
        unset($data['faqs']);

        $serviceCatalogItem->update($data);

        $this->syncFaqs($serviceCatalogItem, $faqs);

        return back(303)->with('success', 'Layanan berhasil diperbarui.');
    }

    public function destroy(ServiceCatalogItem $serviceCatalogItem): RedirectResponse
    {
        $this->deleteInfographicIfExists($serviceCatalogItem);
        $this->deleteServiceLogoIfExists($serviceCatalogItem);
        $serviceCatalogItem->delete();

        return back(303)->with('success', 'Layanan berhasil dihapus.');
    }

    /**
     * @param  array<int, array{question: string, answer: string, sort_order?: int}>  $faqs
     */
    protected function syncFaqs(ServiceCatalogItem $item, array $faqs): void
    {
        $item->faqs()->delete();

        foreach ($faqs as $faq) {
            $item->faqs()->create([
                'question' => $faq['question'],
                'answer' => $faq['answer'],
                'sort_order' => $faq['sort_order'] ?? 0,
            ]);
        }
    }

    /**
     * @return array{infographic_path: string, infographic_name: string, infographic_size: int, infographic_disk: string}
     */
    protected function attachInfographicMetadata(\Illuminate\Http\UploadedFile $infographic, string $disk): array
    {
        $path = $infographic->store('service-catalog', $disk);

        return [
            'infographic_path' => $path,
            'infographic_name' => $infographic->getClientOriginalName(),
            'infographic_size' => (int) $infographic->getSize(),
            'infographic_disk' => $disk,
        ];
    }

    /**
     * @return array{service_logo_path: string, service_logo_name: string, service_logo_size: int, service_logo_disk: string}
     */
    protected function attachServiceLogoMetadata(\Illuminate\Http\UploadedFile $logo, string $disk): array
    {
        $path = $logo->store('service-catalog/logos', $disk);

        return [
            'service_logo_path' => $path,
            'service_logo_name' => $logo->getClientOriginalName(),
            'service_logo_size' => (int) $logo->getSize(),
            'service_logo_disk' => $disk,
        ];
    }

    protected function deleteInfographicIfExists(ServiceCatalogItem $item): void
    {
        $path = (string) $item->infographic_path;

        if ($path === '') {
            return;
        }

        $disk = $item->infographic_disk ?? 'public';

        Storage::disk($disk)->delete($path);
    }

    protected function deleteServiceLogoIfExists(ServiceCatalogItem $item): void
    {
        $path = (string) $item->service_logo_path;

        if ($path === '') {
            return;
        }

        $disk = $item->service_logo_disk ?? 'public';

        Storage::disk($disk)->delete($path);
    }

    protected function generateSlug(string $title, ?ServiceCatalogItem $ignore = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        while ($this->slugExists($slug, $ignore)) {
            $counter++;
            $slug = "{$baseSlug}-{$counter}";
        }

        return $slug;
    }

    protected function slugExists(string $slug, ?ServiceCatalogItem $ignore = null): bool
    {
        $query = ServiceCatalogItem::query()->where('slug', $slug);

        if ($ignore) {
            $query->where('id', '!=', $ignore->id);
        }

        return $query->exists();
    }

    protected function formatRichText(?string $value): string
    {
        $value = (string) $value;

        if ($value === '') {
            return '';
        }

        if (strip_tags($value) !== $value) {
            return $value;
        }

        $escaped = e($value);
        $escaped = nl2br($escaped, false);

        return "<p>{$escaped}</p>";
    }
}

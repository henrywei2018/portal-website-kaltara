<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ServiceCatalogFaq;
use App\Models\ServiceCatalogItem;
use App\Models\ServiceSector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceCatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $searchQuery = trim((string) $request->query('q', ''));
        $sectorQuery = $request->query('sector');
        $sectorId = is_numeric($sectorQuery) ? (int) $sectorQuery : null;

        $itemsQuery = ServiceCatalogItem::query()
            ->with('sector')
            ->where('is_active', true)
            ->whereHas('sector', fn ($query) => $query->where('is_active', true));

        if ($sectorId) {
            $itemsQuery->where('service_sector_id', $sectorId);
        }

        if ($searchQuery !== '') {
            $needle = Str::lower($searchQuery);

            $itemsQuery->where(function ($query) use ($needle) {
                $query->whereRaw('lower(title) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(slug) like ?', ["%{$needle}%"])
                    ->orWhereRaw('lower(media_information) like ?', ["%{$needle}%"]);
            });
        }

        $items = $itemsQuery
            ->orderBy('title')
            ->get()
            ->map(fn (ServiceCatalogItem $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'sector' => [
                    'id' => $item->sector?->id,
                    'name' => $item->sector?->name,
                    'color' => $item->sector?->color,
                ],
                'excerpt' => Str::limit(strip_tags($item->media_information ?? ''), 160, '...'),
                'infographic_url' => $item->infographic_path
                    ? Storage::disk($item->infographic_disk)->url($item->infographic_path)
                    : null,
            ]);

        $sectors = ServiceSector::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->withCount([
                'catalogItems as service_count' => fn ($query) => $query->where('is_active', true),
            ])
            ->get()
            ->map(fn (ServiceSector $sector): array => [
                'id' => $sector->id,
                'name' => $sector->name,
                'slug' => $sector->slug,
                'color' => $sector->color,
                'icon_url' => $sector->icon_path
                    ? Storage::disk($sector->icon_disk)->url($sector->icon_path)
                    : null,
                'service_count' => (int) $sector->service_count,
            ]);

        return Inertia::render('portal/service-catalog/index', [
            'items' => $items,
            'sectors' => $sectors,
            'filters' => [
                'query' => $searchQuery,
                'sector' => $sectorId,
            ],
        ]);
    }

    public function show(ServiceCatalogItem $serviceCatalogItem): Response
    {
        $serviceCatalogItem->loadMissing(['sector', 'faqs']);

        if (! $serviceCatalogItem->is_active || ! $serviceCatalogItem->sector?->is_active) {
            abort(404);
        }

        return Inertia::render('portal/service-catalog/show', [
            'item' => [
                'title' => $serviceCatalogItem->title,
                'slug' => $serviceCatalogItem->slug,
                'sector' => [
                    'id' => $serviceCatalogItem->sector?->id,
                    'name' => $serviceCatalogItem->sector?->name,
                    'color' => $serviceCatalogItem->sector?->color,
                ],
                'media_information' => $this->formatRichText($serviceCatalogItem->media_information),
                'community_benefits' => $this->formatRichText($serviceCatalogItem->community_benefits),
                'sidatuk_features' => $this->formatRichText($serviceCatalogItem->sidatuk_features),
                'service_terms' => $this->formatRichText($serviceCatalogItem->service_terms),
                'service_flow' => $this->formatRichText($serviceCatalogItem->service_flow),
                'infographic_url' => $serviceCatalogItem->infographic_path
                    ? Storage::disk($serviceCatalogItem->infographic_disk)->url($serviceCatalogItem->infographic_path)
                    : null,
                'faqs' => $serviceCatalogItem->faqs
                    ->sortBy('sort_order')
                    ->values()
                    ->map(fn (ServiceCatalogFaq $faq): array => [
                        'question' => $faq->question,
                        'answer' => $faq->answer,
                    ]),
            ],
        ]);
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

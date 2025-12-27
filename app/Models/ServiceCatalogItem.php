<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceCatalogItem extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceCatalogItemFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'service_sector_id',
        'title',
        'slug',
        'provider_name',
        'summary',
        'service_logo_path',
        'service_logo_name',
        'service_logo_size',
        'service_logo_disk',
        'service_status',
        'service_cta_label',
        'service_cta_url',
        'hotline_phone',
        'service_website_url',
        'service_address',
        'service_phone',
        'service_email',
        'operational_hours',
        'social_links',
        'media_information',
        'community_benefits',
        'sidatuk_features',
        'service_terms',
        'service_flow',
        'infographic_path',
        'infographic_name',
        'infographic_size',
        'infographic_disk',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'service_sector_id' => 'integer',
            'infographic_size' => 'integer',
            'service_logo_size' => 'integer',
            'is_active' => 'boolean',
            'operational_hours' => 'array',
            'social_links' => 'array',
        ];
    }

    public function sector(): BelongsTo
    {
        return $this->belongsTo(ServiceSector::class, 'service_sector_id');
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(ServiceCatalogFaq::class);
    }
}

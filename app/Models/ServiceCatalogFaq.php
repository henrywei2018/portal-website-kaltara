<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceCatalogFaq extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceCatalogFaqFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'service_catalog_item_id',
        'question',
        'answer',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'service_catalog_item_id' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function catalogItem(): BelongsTo
    {
        return $this->belongsTo(ServiceCatalogItem::class, 'service_catalog_item_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceSector extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceSectorFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'color',
        'icon_path',
        'icon_name',
        'icon_size',
        'icon_disk',
        'sort_order',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'icon_size' => 'integer',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function catalogItems(): HasMany
    {
        return $this->hasMany(ServiceCatalogItem::class);
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceCatalogItem>
 */
class ServiceCatalogItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(3);

        return [
            'service_sector_id' => \App\Models\ServiceSector::factory(),
            'title' => $title,
            'slug' => Str::slug($title).'-'.$this->faker->unique()->numberBetween(100, 999),
            'media_information' => $this->faker->paragraph(3),
            'community_benefits' => $this->faker->paragraph(3),
            'sidatuk_features' => $this->faker->paragraph(3),
            'service_terms' => $this->faker->paragraph(3),
            'service_flow' => $this->faker->paragraph(3),
            'infographic_path' => null,
            'infographic_name' => null,
            'infographic_size' => null,
            'infographic_disk' => 'public',
            'is_active' => true,
        ];
    }
}

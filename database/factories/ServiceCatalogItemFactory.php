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
            'provider_name' => $this->faker->company(),
            'summary' => $this->faker->sentence(12),
            'service_logo_path' => null,
            'service_logo_name' => null,
            'service_logo_size' => null,
            'service_logo_disk' => 'public',
            'service_status' => 'online',
            'service_cta_label' => 'Akses Layanan',
            'service_cta_url' => $this->faker->url(),
            'hotline_phone' => $this->faker->phoneNumber(),
            'service_website_url' => $this->faker->url(),
            'service_address' => $this->faker->address(),
            'service_phone' => $this->faker->phoneNumber(),
            'service_email' => $this->faker->safeEmail(),
            'operational_hours' => [
                ['day' => 'Senin', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
                ['day' => 'Selasa', 'opens_at' => '08:00', 'closes_at' => '16:00', 'is_closed' => false],
            ],
            'social_links' => [
                ['platform' => 'instagram', 'url' => $this->faker->url()],
            ],
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

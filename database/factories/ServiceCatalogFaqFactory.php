<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceCatalogFaq>
 */
class ServiceCatalogFaqFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_catalog_item_id' => \App\Models\ServiceCatalogItem::factory(),
            'question' => $this->faker->sentence(),
            'answer' => $this->faker->paragraph(),
            'sort_order' => $this->faker->numberBetween(1, 20),
        ];
    }
}

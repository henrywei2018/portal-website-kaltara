<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NavigationItem>
 */
class NavigationItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'parent_id' => null,
            'label' => fake()->sentence(2),
            'slug' => fake()->slug(),
            'url' => fake()->url(),
            'is_external' => false,
            'is_visible' => true,
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }
}

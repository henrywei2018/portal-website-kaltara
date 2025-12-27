<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceSector>
 */
class ServiceSectorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence(10),
            'color' => $this->faker->hexColor(),
            'icon_path' => null,
            'icon_name' => null,
            'icon_size' => null,
            'icon_disk' => 'public',
            'sort_order' => $this->faker->numberBetween(1, 50),
            'is_active' => true,
        ];
    }
}

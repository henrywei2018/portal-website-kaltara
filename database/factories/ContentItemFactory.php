<?php

namespace Database\Factories;

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContentItem>
 */
class ContentItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(5),
            'slug' => fake()->unique()->slug(),
            'type' => fake()->randomElement(ContentType::cases()),
            'status' => fake()->randomElement(ContentStatus::cases()),
            'excerpt' => fake()->paragraph(),
            'body' => fake()->paragraphs(3, true),
            'published_at' => fake()->optional()->dateTimeThisYear(),
        ];
    }
}

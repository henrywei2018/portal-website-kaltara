<?php

namespace Database\Factories;

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentItem>
 */
class DocumentItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $issuedAt = fake()->dateTimeBetween('-1 year', 'now');

        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'type' => DocumentType::Announcement,
            'status' => DocumentStatus::Published,
            'file_path' => 'documents/'.fake()->uuid().'.pdf',
            'file_name' => fake()->slug(3).'.pdf',
            'file_size' => fake()->numberBetween(10000, 1000000),
            'file_disk' => 'public',
            'issued_at' => $issuedAt->format('Y-m-d'),
            'published_at' => $issuedAt->format('Y-m-d'),
        ];
    }
}

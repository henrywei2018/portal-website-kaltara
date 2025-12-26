<?php

namespace Database\Seeders;

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Models\DocumentItem;
use Illuminate\Database\Seeder;

class DocumentItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DocumentItem::factory()
            ->count(6)
            ->sequence(
                ['type' => DocumentType::Announcement, 'status' => DocumentStatus::Published],
                ['type' => DocumentType::Announcement, 'status' => DocumentStatus::Draft],
                ['type' => DocumentType::Ipkd, 'status' => DocumentStatus::Published],
                ['type' => DocumentType::Ipkd, 'status' => DocumentStatus::Draft],
                ['type' => DocumentType::Other, 'status' => DocumentStatus::Published],
                ['type' => DocumentType::Other, 'status' => DocumentStatus::Draft],
            )
            ->create();
    }
}

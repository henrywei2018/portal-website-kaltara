<?php

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Models\DocumentItem;
use Database\Seeders\DocumentItemSeeder;

test('document item seeder creates published announcements and ipkd documents', function () {
    $this->seed(DocumentItemSeeder::class);

    $announcementCount = DocumentItem::query()
        ->where('type', DocumentType::Announcement)
        ->where('status', DocumentStatus::Published)
        ->count();

    $ipkdCount = DocumentItem::query()
        ->where('type', DocumentType::Ipkd)
        ->where('status', DocumentStatus::Published)
        ->count();

    expect($announcementCount)->toBeGreaterThan(0)
        ->and($ipkdCount)->toBeGreaterThan(0);
});

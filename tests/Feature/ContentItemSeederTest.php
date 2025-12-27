<?php

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use App\Models\ContentItem;
use Database\Seeders\ContentItemSeeder;

test('content item seeder creates published news, articles, and announcements', function () {
    $this->seed(ContentItemSeeder::class);

    $newsCount = ContentItem::query()
        ->where('type', ContentType::News)
        ->where('status', ContentStatus::Published)
        ->count();

    $articleCount = ContentItem::query()
        ->where('type', ContentType::Article)
        ->where('status', ContentStatus::Published)
        ->count();

    $announcementCount = ContentItem::query()
        ->where('type', ContentType::Announcement)
        ->where('status', ContentStatus::Published)
        ->count();

    expect($newsCount)->toBeGreaterThan(0)
        ->and($articleCount)->toBeGreaterThan(0)
        ->and($announcementCount)->toBeGreaterThan(0);
});

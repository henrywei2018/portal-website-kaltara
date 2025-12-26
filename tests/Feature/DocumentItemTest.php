<?php

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Models\DocumentItem;
use Illuminate\Support\Carbon;

it('casts document metadata and dates', function () {
    $issuedAt = now()->subDay()->toDateString();
    $publishedAt = now()->toDateString();

    $item = DocumentItem::factory()->create([
        'type' => DocumentType::Announcement,
        'status' => DocumentStatus::Published,
        'issued_at' => $issuedAt,
        'published_at' => $publishedAt,
    ]);

    $item->refresh();

    expect($item->type)->toBe(DocumentType::Announcement)
        ->and($item->status)->toBe(DocumentStatus::Published)
        ->and($item->issued_at)->toBeInstanceOf(Carbon::class)
        ->and($item->issued_at->toDateString())->toBe($issuedAt)
        ->and($item->published_at)->toBeInstanceOf(Carbon::class)
        ->and($item->published_at->toDateString())->toBe($publishedAt);
});

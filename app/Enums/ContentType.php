<?php

namespace App\Enums;

enum ContentType: string
{
    case News = 'news';
    case Article = 'article';
    case Announcement = 'announcement';

    public function label(): string
    {
        return match ($this) {
            self::News => 'Berita',
            self::Article => 'Artikel',
            self::Announcement => 'Pengumuman',
        };
    }

    /**
     * @return array<int, array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $type): array => [
                'value' => $type->value,
                'label' => $type->label(),
            ],
            self::cases(),
        );
    }
}

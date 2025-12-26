<?php

namespace App\Enums;

enum DocumentType: string
{
    case Announcement = 'announcement';
    case Ipkd = 'ipkd';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Announcement => 'Pengumuman',
            self::Ipkd => 'IPKD',
            self::Other => 'Dokumen Lain',
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

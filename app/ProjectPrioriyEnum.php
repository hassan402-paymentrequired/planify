<?php

namespace App;

enum ProjectPrioriyEnum: string
{
    case LOW = 'low';
    case MEDIUM = 'medium';
    case HIGH = 'high';
    case CRITICAL = 'critical';

    function getName($id)
    {
        return match ($id) {
            self::LOW => 'low',
            self::MEDIUM => 'medium',
            self::HIGH => 'high',
            self::CRITICAL => 'critical',
        };
    }

    public static function toArray(): array
    {
        return array_map(fn($case) => [
            'id' => $case->value,
            'name' => strtolower($case->name),
        ], self::cases());
    }
}

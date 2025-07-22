<?php

namespace App;

enum ProjectStatusEnum: string
{
    case NOT_STARTED = 'not_started';
    case IN_PROGRESS = 'in_progress';
    case ON_HOLD = 'on_hold';
    case IN_REVIEW = 'in_review';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
    case DEACTIVATE = 'deactivate';

    function getName($id)
    {
        return match ($id) {
            self::NOT_STARTED => 'not_started',
            self::IN_PROGRESS => 'in_progress',
            self::ON_HOLD => 'on_hold',
            self::IN_REVIEW => 'in_review',
            self::COMPLETED => 'completed',
            self::CANCELLED => 'cancelled',
            self::DEACTIVATE => 'deactivate',
            default => 'unknown',
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

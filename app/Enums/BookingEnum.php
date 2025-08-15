<?php

namespace App\Enums;

final class BookingEnum
{
    public const PENDING = 'pending';

    public const CONFIRMED = 'confirmed';

    public const COMPLETED = 'completed';

    public const CANCELLED = 'cancelled';

    public static function all(): array
    {
        return [
            self::PENDING,
            self::CONFIRMED,
            self::COMPLETED,
            self::CANCELLED,
        ];
    }
}

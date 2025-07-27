<?php

namespace App\Enums;

final class UserEnum
{
    public const ADMIN = 'admin';

    public const GUIDE = 'guide';

    public const USER = 'user';

    public const STATUS_PENDING = 'pending';

    public const STATUS_ACTIVE = 'active';

    public const STATUS_BLOCKED = 'blocked';

    /**
     * Get all roles.
     */
    public static function allRoles(): array
    {
        return [
            self::ADMIN,
            self::GUIDE,
            self::USER,
        ];
    }

    public static function allStatus(): array
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_ACTIVE,
            self::STATUS_BLOCKED,
        ];
    }
}

<?php

namespace Database\Seeders;

use App\Enums\UserEnum;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Mahfuz',
            'email' => 'mahafujer@gmail.com',
            'role' => UserEnum::ADMIN,
            'status' => UserEnum::STATUS_ACTIVE,
            'phone' => '01762625154',
            'password' => Hash::make('12345678'),
        ]);

        User::factory()->user()->create([
            'name' => 'User A',
            'email' => 'user@gmail.com',
            'status' => UserEnum::STATUS_ACTIVE,
            'phone' => '01762625154',
            'password' => Hash::make('12345678'),
        ]);

        $this->call([GuideSeeder::class, UserBookingSeeder::class]);
    }
}

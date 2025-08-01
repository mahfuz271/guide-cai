<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'role' => 'admin',
            'phone' => "01762625154",
            'password' => Hash::make("12345678"),
        ]);
    }
}

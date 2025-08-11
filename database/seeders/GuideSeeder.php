<?php

namespace Database\Seeders;

use App\Models\GuideProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class GuideSeeder extends Seeder
{
    public function run(): void
    {
        Storage::disk('public')->makeDirectory('guide_photos');

        User::factory()
            ->count(15)
            ->create()
            ->each(function ($user) {
                $guideProfile = $user->guideProfile()->create(
                    GuideProfile::factory()->make()->toArray()
                );

                // Optional: Attach fake images
                $imageCount = rand(0, 4);
                for ($i = 0; $i < $imageCount; $i++) {
                    $path = 'guide_photos/' . uniqid() . '.jpg';
                    Storage::disk('public')->put(
                        $path,
                        file_get_contents('https://picsum.photos/800/600')
                    );
                    $guideProfile->photos()->create(['path' => $path]);
                }
            });
    }
}

<?php

namespace Database\Seeders;

use App\Enums\UserEnum;
use App\Models\GuideAvailability;
use App\Models\GuideProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class GuideSeeder extends Seeder
{
    public function run(): void
    {
        // Copy images once to public storage
        $sourcePath = database_path('seeders/images');
        $destinationPath = Storage::disk('public')->path('guide_photos');

        if (File::exists($destinationPath)) {
            File::deleteDirectory($destinationPath);
        }

        File::ensureDirectoryExists($destinationPath);
        File::copyDirectory($sourcePath, $destinationPath);

        $allImages = collect(File::files($destinationPath))
            ->map(fn($file) => 'guide_photos/' . $file->getFilename())
            ->values();

        // Helper to assign random 3–5 photos
        $assignPhotos = function ($guideProfile) use ($allImages) {
            collect($allImages)
                ->shuffle()
                ->take(rand(3, 5))
                ->each(fn($image) => $guideProfile->photos()->create(['path' => $image]));
        };

        // Helper to assign default availability (Mon–Fri, 09:00–17:00)
        $assignAvailability = function ($guideId) {
            $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
            foreach ($days as $day) {
                GuideAvailability::create([
                    'guide_id' => $guideId,
                    'day_of_week' => $day,
                    'start_time' => '09:00',
                    'end_time' => '17:00',
                    'is_active' => true,
                ]);
            }
        };

        // Create fixed guide
        $fixedUser = User::factory()->create([
            'name' => 'Guide A',
            'email' => 'guide@gmail.com',
            'role' => UserEnum::GUIDE,
            'status' => UserEnum::STATUS_ACTIVE,
            'phone' => '01762625154',
            'password' => Hash::make('12345678'),
        ]);

        $fixedProfile = $fixedUser->guideProfile()->create(
            GuideProfile::factory()->make()->toArray()
        );

        $assignPhotos($fixedProfile);
        $assignAvailability($fixedUser->id);

        User::factory()
            ->count(100)
            ->create()
            ->each(function ($user) use ($assignPhotos, $assignAvailability) {
                $profile = $user->guideProfile()->create(
                    GuideProfile::factory()->make()->toArray()
                );
                $assignPhotos($profile);
                $assignAvailability($user->id);
            });
    }
}

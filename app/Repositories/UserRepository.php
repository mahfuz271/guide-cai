<?php

namespace App\Repositories;

use App\Enums\UserEnum;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserRepository
{
    public function createUser(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => Hash::make($data['password']),
        ]);
    }

    public function createGuideUser(array $data): User
    {
        $user = User::create([
            'name' => $data['name'],
            'role' => UserEnum::GUIDE,
            'status' => UserEnum::STATUS_PENDING,
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phone' => $data['phone'] ?? null,
            'location' => $data['location'] ?? null,
        ]);

        $guideProfile = $user->guideProfile()->create([
            'hourly_rate' => $data['hourlyRate'],
            'experience' => $data['experience'],
            'bio' => $data['bio'],
            'languages' => json_encode($data['languages']),
            'specialties' => json_encode($data['specialties']),
        ]);

        if (!empty($data['photos'])) {
            foreach ($data['photos'] as $photo) {
                $path = $photo->store('guide_photos', 'public');
                $guideProfile->photos()->create(['path' => $path]);
            }
        }

        return $user;
    }

    /**
     * Update user profile with optional avatar.
     */
    public function updateProfile(User $user, array $data, $avatar = null): void
    {
        $user->fill($data);

        if (isset($data['email']) && $user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($avatar) {
            if ($user->avatar) {
                Storage::disk('public')->delete('avatars/' . $user->avatar);
            }

            $filename = uniqid() . '.' . $avatar->getClientOriginalExtension();
            $avatar->storeAs('avatars', $filename, 'public');
            $user->avatar = $filename;
        }

        $user->save();
    }

    /**
     * Delete user account and clean up related resources.
     */
    public function deleteUser(User $user): void
    {
        if ($user->avatar) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
        }

        $user->delete();
    }
}

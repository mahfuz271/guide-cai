<?php

namespace App\Repositories;

use App\Enums\UserEnum;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserRepository
{
    private const PAGINATION_LIMIT = 10;

    public function searchGuides($request)
    {
        $query = User::with('guideProfile')
            ->where('role', UserEnum::GUIDE)
            ->where('status', UserEnum::STATUS_ACTIVE)
            ->withCount(['reviews as total_reviews'])
            ->withAvg('reviews as avg_rating', 'rating');

        // Keyword search
        if ($request->filled('search')) {
            $search = $request->search;

            if (str_starts_with($search, '#')) {
                // Search by exact user ID
                $searchId = (int) ltrim($search, '#');
                $query->where('id', $searchId);
            } else {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('email', $search)
                        ->orWhere('phone', $search)
                        ->orWhereHas('guideProfile', function ($q2) use ($search) {
                            $q2->where('bio', 'LIKE', "%{$search}%");
                        });
                });
            }
        }

        // Location filter
        if ($request->filled('location')) {
            $query->where('location', $request->location);
        }

        // Language filter (JSON)
        if ($request->filled('language')) {
            $language = $request->language;
            $query->whereHas('guideProfile', fn($q) => $q->whereJsonContains('languages', $language)
            );
        }

        // Specialty filter (JSON)
        if ($request->filled('specialty')) {
            $specialty = $request->specialty;
            $query->whereHas('guideProfile', fn($q) => $q->whereJsonContains('specialties', $specialty)
            );
        }

        // Hourly rate range
        if ($request->filled('min_rate') || $request->filled('max_rate')) {
            $query->whereHas('guideProfile', function ($q) use ($request) {
                if ($request->filled('min_rate')) {
                    $q->where('hourly_rate', '>=', $request->min_rate);
                }
                if ($request->filled('max_rate')) {
                    $q->where('hourly_rate', '<=', $request->max_rate);
                }
            });
        }

        // Experience filter
        if ($request->filled('experience')) {
            $experience = $request->experience;
            $query->whereHas('guideProfile', fn($q) => $q->where('experience', $experience)
            );
        }

        return $query->paginate(12)->appends($request->except([]));
    }

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
            'languages' => $data['languages'],
            'specialties' => $data['specialties'],
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

    public function updateStatus(User $user, string $status): bool
    {
        if ($user->status == $status) {
            return false;
        }
        $oldStatus = $user->status;
        $user->status = $status;
        $user->save();

        return true;
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Show the registration page.
     */
    public function createGuide(): Response
    {
        return Inertia::render('auth/guide-register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'nullable|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function storeGuide(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],

            // Additional validations for guide-specific fields
            'phone' => 'nullable|string|max:20',
            'location' => 'nullable|string|max:255',
            'hourlyRate' => 'required|numeric|min:0',
            'experience' => 'required|string|max:50',
            'bio' => 'required|string|max:1000',
            'languages' => 'required|array|min:1',
            'languages.*' => 'string|max:50',
            'specialties' => 'required|array|min:1',
            'specialties.*' => 'string|max:100',
            'photos' => 'nullable|array|max:4',
            'photos.*' => 'nullable|image|max:2048', // max 2MB per photo
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'role' => UserEnum::GUIDE,
            'status' => UserEnum::STATUS_PENDING,
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
            'location' => $validated['location'] ?? null,
        ]);

        $user->guideProfile()->create([
            'hourly_rate' => $validated['hourlyRate'],
            'experience' => $validated['experience'],
            'bio' => $validated['bio'],
            'languages' => json_encode($validated['languages']),
            'specialties' => json_encode($validated['specialties']),
        ]);

        // Handle photo uploads if present
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('guide_photos', 'public');
                $user->guideProfile->photos()->create(['path' => $path]);
            }
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard'));
    }
}

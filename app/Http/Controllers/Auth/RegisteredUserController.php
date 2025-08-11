<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(protected UserRepository $userRepository)
    {}

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

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'nullable|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = $this->userRepository->createUser($request->all());

        event(new Registered($user));
        Auth::login($user);

        return redirect()->intended(route('dashboard'))->with('success', 'Registration success.');
    }

    public function storeGuide(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
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
            'photos.*' => 'nullable|image|max:2048',
        ]);

        // Attach uploaded photo files to $validated
        $validated['photos'] = $request->file('photos');

        $user = $this->userRepository->createGuideUser($validated);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->intended(route('dashboard'))->with('success', 'Registration success.');
    }
}

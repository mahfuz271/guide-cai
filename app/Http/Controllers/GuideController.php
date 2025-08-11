<?php

namespace App\Http\Controllers;

use App\Enums\UserEnum;
use App\Models\GuideAvailability;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuideController extends Controller
{
    public function __construct(protected UserRepository $userRepository)
    {}

    public function index(Request $request): Response
    {
        $guides = $this->userRepository->searchGuides($request);

        return Inertia::render('guide/index', [
            'guides' => $guides,
            'locations' => User::whereNotNull('location')
                ->where('status', UserEnum::STATUS_ACTIVE)
                ->orderBy('location')
                ->distinct()
                ->pluck('location'),
            'filters' => $request->only([
                'search',
                'location',
                'language',
                'specialty',
                'min_rate',
                'max_rate',
                'experience',
            ]),
        ]);
    }

    public function show(User $user): Response
    {
        $user->load('guideProfile.photos');
        $availabilities = GuideAvailability::where('guide_id', $user->id)->get();

        return Inertia::render('guide/single', [
            'guide' => $user,
            'availabilities' => $availabilities,
        ]);
    }
}

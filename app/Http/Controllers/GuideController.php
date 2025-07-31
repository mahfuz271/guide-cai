<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class GuideController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('guide/index');
    }

    public function show(User $user): Response
    {
        $user->load('guideProfile.photos');
        return Inertia::render('guide/single', ['guide' => $user]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct(protected UserRepository $userRepository)
    {}

    public function showAdminUser()
    {
        return inertia(
            'admin/users',
            [
                'title' => 'Manage Admin Users',
                'users' => User::where('role', UserEnum::ADMIN)->latest()->paginate(12),
            ]
        );
    }

    public function showGuides()
    {
        return inertia(
            'admin/users',
            [
                'title' => 'Manage Guides',
                'users' => User::where('role', UserEnum::GUIDE)->latest()->paginate(12),
            ]
        );
    }

    public function showPendingUsers()
    {
        return inertia(
            'admin/users',
            [
                'title' => 'Manage Guides',
                'users' => User::where('role', UserEnum::GUIDE)->where('status', UserEnum::STATUS_PENDING)->latest()->paginate(12),
            ]
        );
    }

    public function showVisitorUsers()
    {
        return inertia(
            'admin/users',
            [
                'title' => 'Manage Visitor User',
                'users' => User::where('role', UserEnum::USER)->latest()->paginate(12),
            ]
        );
    }

    public function updateStatus(Request $request, User $user)
    {
        $request->validate([
            'status' => [
                'required',
                'string',
                Rule::in(\App\Enums\UserEnum::allStatus()),
            ],
        ]);

        $authUser = auth()->user();

        $newStatus = $request->query('status');

        if ($user->id === $authUser->id) {
            return redirect()->back()->with('error', 'You cannot change status of yourself.');
        }

        $this->userRepository->updateStatus($user, $newStatus, $request->input('verified'));

        return redirect()->back()->with('success', 'User status updated successfully.');
    }

    public function deleteUser(User $user)
    {
        $authUser = auth()->user();

        if ($user->id === $authUser->id) {
            return redirect()->back()->with('error', 'You cannot delete yourself.');
        }

        $this->userRepository->deleteUser($user);

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}

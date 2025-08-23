<?php

namespace App\Http\Controllers;

use App\Enums\BookingEnum;
use App\Enums\UserEnum;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->role === UserEnum::USER) {
            return redirect()->route('bookings.index');
        }

        // Booking stats
        if ($user->role === UserEnum::GUIDE) {
            // only this guide's bookings
            $totalBookings = $user->bookings()->count();
            $pendingBookings = $user->bookings()->where("status", BookingEnum::PENDING)->count();
            $completedBookings = $user->bookings()->where("status", BookingEnum::COMPLETED)->count();
            $cancelledBookings = $user->bookings()->where("status", BookingEnum::CANCELLED)->count();

            return Inertia::render('dashboard', [
                'role' => UserEnum::GUIDE,
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'completed_bookings' => $completedBookings,
                'cancelled_bookings' => $cancelledBookings,
            ]);
        }

        // if admin -> all stats
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where("status", BookingEnum::PENDING)->count();
        $completedBookings = Booking::where("status", BookingEnum::COMPLETED)->count();
        $cancelledBookings = Booking::where("status", BookingEnum::CANCELLED)->count();

        $totalUsers = User::where("role", UserEnum::USER)->count();
        $allGuides = User::where("role", UserEnum::GUIDE)->count();
        $pendingGuides = User::where("role", UserEnum::GUIDE)
            ->where("status", UserEnum::STATUS_PENDING)
            ->count();

        return Inertia::render('dashboard', [
            'role' => UserEnum::ADMIN,
            'total_bookings' => $totalBookings,
            'pending_bookings' => $pendingBookings,
            'completed_bookings' => $completedBookings,
            'cancelled_bookings' => $cancelledBookings,
            'total_users' => $totalUsers,
            'all_guides' => $allGuides,
            'pending_guides' => $pendingGuides,
        ]);
    }
}

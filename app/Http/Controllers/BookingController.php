<?php

namespace App\Http\Controllers;

use App\Enums\BookingEnum;
use App\Enums\UserEnum;
use App\Models\Booking;
use App\Models\GuideAvailability;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class BookingController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $query = Booking::with(['guide', 'user']);

        if ($user->role === UserEnum::GUIDE) {
            $query->where('guide_id', $user->id);
        } elseif ($user->role === UserEnum::USER) {
            $query->where('user_id', $user->id);
        }

        $bookings = $query->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc')->paginate(12);

        return inertia('bookings/index', [
            'bookings' => $bookings,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'guide_id' => 'required|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'hours' => 'required|integer|min:1|max:8',
            'special_requests' => 'nullable|string|max:500',
        ]);

        // Check guide availability
        $dayOfWeek = strtolower(Carbon::parse($request->date)->format('l'));
        $availability = GuideAvailability::where('guide_id', $request->guide_id)
            ->where('day_of_week', $dayOfWeek)
            ->first();

        if (! $availability) {
            return back()->withErrors(['date' => 'Guide is not available on this day']);
        }

        $startTime = Carbon::parse($request->start_time);
        $endTime = $startTime->copy()->addHours($request->hours);

        $availabilityStart = Carbon::parse($availability->start_time);
        $availabilityEnd = Carbon::parse($availability->end_time);

        if ($startTime->lt($availabilityStart) || $endTime->gt($availabilityEnd)) {
            return back()->withErrors(['start_time' => 'Selected time is outside guide availability']);
        }

        // Check for existing bookings
        $conflictingBooking = Booking::where('guide_id', $request->guide_id)
            ->where('date', $request->date)
            ->where(function ($query) use ($startTime, $endTime) {
                $query->whereBetween('start_time', [$startTime->format('H:i'), $endTime->subMinute()->format('H:i')])
                    ->orWhereBetween('end_time', [$startTime->addMinute()->format('H:i'), $endTime->format('H:i')]);
            })
            ->exists();

        if ($conflictingBooking) {
            return back()->withErrors(['start_time' => 'Guide is already booked for this time']);
        }

        // Create booking
        $guide = User::find($request->guide_id);
        $hourlyRate = $guide->guideProfile->hourly_rate;

        Booking::create([
            'user_id' => Auth::id(),
            'guide_id' => $request->guide_id,
            'date' => Carbon::parse($request->date)->format('Y-m-d'),
            'start_time' => $startTime->format('H:i'),
            'end_time' => $endTime->format('H:i'),
            'hours' => $request->hours,
            'total_amount' => $hourlyRate * $request->hours,
            'status' => BookingEnum::PENDING,
            'special_requests' => $request->special_requests,
        ]);

        return redirect()->route('bookings.index')->with('success', 'Booking created successfully');
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => [
                'required',
                'string',
                Rule::in(BookingEnum::all()),
            ],
            'is_paid' => 'sometimes|boolean',
        ]);

        $user = Auth::user();

        // Only guide or admin can update status
        if (! in_array($user->role, [UserEnum::ADMIN, UserEnum::GUIDE])) {
            abort(403);
        }

        // Only guide can mark as completed
        if ($request->status === BookingEnum::COMPLETED && $user->role !== UserEnum::GUIDE) {
            abort(403);
        }

        $booking->update([
            'status' => $request->status,
            'is_paid' => $request->has('is_paid') ? $request->is_paid : $booking->is_paid,
        ]);

        return redirect()->back()->with('success', 'Booking status updated');
    }
}

<?php
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Booking $booking)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        // make sure only the booking user can leave a review
        if ($booking->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // prevent duplicate review
        if ($booking->review) {
            return back()->withErrors(['review' => 'You already left a review for this booking.']);
        }

        Review::create([
            'booking_id' => $booking->id,
            'guide_id' => $booking->guide_id,
            'user_id' => auth()->id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return redirect()->back()->with('success', 'Review submitted successfully!');
    }
}

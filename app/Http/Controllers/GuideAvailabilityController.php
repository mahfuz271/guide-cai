<?php

namespace App\Http\Controllers;

use App\Models\GuideAvailability;
use Illuminate\Http\Request;

class GuideAvailabilityController extends Controller
{
    public function index()
    {
        $guideId = auth()->id();

        $availabilities = GuideAvailability::where('guide_id', $guideId)
            ->orderByRaw("FIELD(day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')")
            ->orderBy('start_time')
            ->get();

        return inertia('guide/availability', [
            'availabilities' => $availabilities,
        ]);
    }

    public function store(Request $request)
    {
        $guideId = auth()->id();

        $request->validate([
            'day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        GuideAvailability::updateOrCreate(
            [
                'guide_id' => $guideId,
                'day_of_week' => $request->day_of_week,
            ],
            [
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'is_active' => true,
            ]
        );

        return redirect()->back()->with('success', 'Availability updated successfully');
    }

    public function destroy(GuideAvailability $availability)
    {
        if ($availability->guide_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $availability->delete();

        return redirect()->back()->with('success', 'Availability removed successfully');
    }
}

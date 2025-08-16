<?php

namespace Database\Seeders;

use App\Enums\BookingEnum;
use App\Enums\UserEnum;
use App\Models\Booking;
use App\Models\Review;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class UserBookingSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // 1. Create dummy users (role = user)
        $users = User::factory()->count(50)->user()->create();

        // 2. Get all guides
        $guides = User::where('role', UserEnum::GUIDE)->get();

        // 3. Create bookings for each user
        foreach ($users as $user) {
            // Each user books 1–5 guides randomly
            $numBookings = rand(1, 5);
            $selectedGuides = $guides->shuffle()->take($numBookings);

            foreach ($selectedGuides as $guide) {
                $status = BookingEnum::all()[rand(0, 3)];

                $booking = Booking::create([
                    'user_id' => $user->id,
                    'guide_id' => $guide->id,
                    'date' => $faker->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d'),
                    'start_time' => $faker->time('H:i'),
                    'end_time' => $faker->time('H:i'),
                    'hours' => rand(1, 8),
                    'total_amount' => rand(50, 500),
                    'status' => $status,
                    'is_paid' => $faker->boolean(),
                    'special_requests' => rand(0, 1) ? $faker->sentence(5) : null,
                ]);
            }
        }

        // 4. Add 1–12 reviews per guide (only on completed bookings)
        foreach ($guides as $guide) {
            $completedBookings = Booking::where('guide_id', $guide->id)
                ->where('status', 'completed')
                ->get();

            $numReviews = min(count($completedBookings), rand(1, 12));

            $completedBookings->shuffle()->take($numReviews)->each(function ($booking) use ($faker) {
                Review::create([
                    'booking_id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'guide_id' => $booking->guide_id,
                    'rating' => rand(1, 5),
                    'comment' => $faker->sentence(rand(5, 15)),
                ]);
            });
        }
    }
}

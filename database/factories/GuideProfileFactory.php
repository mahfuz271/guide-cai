<?php

namespace Database\Factories;

use App\Models\GuideProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class GuideProfileFactory extends Factory
{
    protected $model = GuideProfile::class;

    public function definition(): array
    {
        return [
            'hourly_rate' => $this->faker->randomFloat(2, 10, 200),
            'experience' => $this->faker->numberBetween(1, 30).' years',
            'bio' => $this->faker->paragraphs(3, true),
            'languages' => $this->faker->randomElements(
                [
                    'English',
                    'Spanish',
                    'French',
                    'German',
                    'Italian',
                    'Portuguese',
                    'Japanese',
                    'Korean',
                    'Mandarin',
                    'Arabic',
                    'Russian',
                    'Hindi',
                    'Bengali',
                ],
                $this->faker->numberBetween(1, 3)
            ),
            'specialties' => $this->faker->randomElements(
                [
                    'Cultural Heritage',
                    'Food & Dining',
                    'Adventure Tourism',
                    'Historical Sites',
                    'Art & Museums',
                    'Shopping',
                    'Nightlife',
                    'Nature & Parks',
                    'Religious Sites',
                    'Architecture',
                    'Local Markets',
                    'Photography',
                    'Transportation',
                ],
                $this->faker->numberBetween(1, 3)
            ),
        ];
    }
}

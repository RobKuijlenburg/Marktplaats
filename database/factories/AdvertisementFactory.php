<?php

namespace Database\Factories;

use App\Models\Advertisement;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdvertisementFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Advertisement::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => rand(1, 15),
            'img' => 'https://source.unsplash.com/random/800x600',
            'title' => $this->faker->realText($maxNbChars = 20, $indexSize = 2),
            'body' => $this->faker->realText($maxNbChars = 1800, $indexSize = 2),
            'priority' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
    }
}

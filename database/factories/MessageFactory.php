<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Message::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'sender_id' => rand(1, 20),
            'receiver_id' => rand(1, 20),
            'subject' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
            'body' => $this->faker->realText($maxNbChars = 900, $indexSize = 2),
        ];
    }
}

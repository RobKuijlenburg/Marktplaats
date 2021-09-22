<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            RubricSeeder::class,
            MessageSeeder::class,
            AdvertisementSeeder::class,
            BidSeeder::class,
            ChatRoomSeeder::class
        ]);
    }
}

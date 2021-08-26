<?php

namespace Database\Seeders;

use App\Models\Advertisement;
use App\Models\Bid;
use Illuminate\Database\Seeder;

class BidSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $advertisementsCount = Advertisement::count();

        $bids = Bid::factory(50)->create();

        $bids->each(function (Bid $bid) use ($advertisementsCount){
            for ($i=0; $i < rand(1, $advertisementsCount); $i++) {
                $bid->user()->syncWithoutDetaching(rand(1, $advertisementsCount));
            }
        });
    }
}

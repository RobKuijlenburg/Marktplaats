<?php

namespace Database\Seeders;

use App\Models\Advertisement;
use App\Models\Rubric;
use Illuminate\Database\Seeder;

class AdvertisementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rubricsCount = Rubric::count();

        $advertisements = Advertisement::factory(15)->create();

        $advertisements->each(function (Advertisement $advertisement) use ($rubricsCount) {
            for ($i=0; $i < rand(1, $rubricsCount); $i++) {
                $advertisement->rubrics()->syncWithoutDetaching(rand(1, $rubricsCount));
            }
        });
    }
}

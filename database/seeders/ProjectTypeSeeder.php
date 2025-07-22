<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => 'web'],
            ['name' => 'mobile'],
            ['name' => 'api']
        ];

        foreach ($types as $type) {
            \App\Models\ProjectType::create($type);
        }
    }
}

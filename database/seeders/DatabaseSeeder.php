<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles and project types first
        $this->call([RoleTableSeeder::class, ProjectTypeSeeder::class]);

        // Create a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'hassanlateef@initshq.com',
            'password' => '1234567890'
        ]);

        // Create dummy users for each role
        $roles = [
            'super_admin',
            'cto',
            'hr',
            'project_manager',
            'frontend',
            'backend',
            'designer',
            'user',
            'action_officer'
        ];
        foreach ($roles as $role) {
            $user = User::factory()->create([
                'name' => ucfirst(str_replace('_', ' ', $role)) . ' User',
                'email' => $role . '@example.com',
                'password' => '1234567890'
            ]);
            $user->assignRole(Role::where('name', $role)->first());
        }
    }
}

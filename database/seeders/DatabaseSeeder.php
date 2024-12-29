<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        // Create super-admin user
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@marcom.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'invitation_accepted_at' => now(),
        ]);

        $superAdmin->assignRole('super-admin');

        // Create Rob's account
        $rob = User::create([
            'name' => 'Rob Thomas',
            'email' => 'rob.thomas@empuls3.com',
            'password' => Hash::make('G00dBoySpot!!1013'),
            'email_verified_at' => now(),
            'invitation_accepted_at' => now(),
        ]);

        $rob->assignRole('super-admin');
    }
}

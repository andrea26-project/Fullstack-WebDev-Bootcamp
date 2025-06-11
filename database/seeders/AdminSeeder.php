<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'andreaghea@gmail.com',
            'password' => Hash::make('rahasia'),
            'role' => 'ADMIN'
        ]);
    }
}

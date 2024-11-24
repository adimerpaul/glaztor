<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Zona;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);
        User::create(['name' => 'Administrador','username' => 'admin','password' => bcrypt('admin'),'role' => 'Administrador']);

        Zona::create(['nombre_zona' => 'SUD','descripcion_zona' => 'Zona Sud','estado' => 'ACTIVO']);
        Zona::create(['nombre_zona' => 'ESTE','descripcion_zona' => 'Zona Este','estado' => 'ACTIVO']);
        Zona::create(['nombre_zona' => 'NORTE','descripcion_zona' => 'Zona Norte','estado' => 'ACTIVO']);
        Zona::create(['nombre_zona' => 'CENTRO','descripcion_zona' => 'Zona Centro','estado' => 'ACTIVO']);

        $sqlFIle = base_path('database/seeders/clientes_202411240814.sql');
        $sqlContent = file_get_contents($sqlFIle);

        DB::unprepared($sqlContent);

    }
}

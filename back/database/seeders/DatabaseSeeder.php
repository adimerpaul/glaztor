<?php

namespace Database\Seeders;

use App\Models\Cargo;
use App\Models\Newservicio;
use App\Models\Ejecutivo;
use App\Models\Producto;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Zona;
use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
        User::create(['name' => 'Admin','username' => 'admin','password' => bcrypt('admin'),'role' => 'Admin']);


        DB::table('users')->insert([
            [
                'id' => 2,
                'name' => 'Maria Miranda',
                'username' => 'maria',
                'role' => 'Ventas',
                'cargo' => null,
                'email' => 'maria@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Susana',
                'username' => 'susana',
                'role' => 'Administrador',
                'cargo' => null,
                'email' => 'susana@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'name' => 'valeria',
                'username' => 'valeria',
                'role' => 'Cobranza',
                'cargo' => null,
                'email' => 'valeria@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'name' => 'gerardo',
                'username' => 'gerardo',
                'role' => 'Director',
                'cargo' => null,
                'email' => 'gerardo@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'name' => 'zenaida',
                'username' => 'zenaida',
                'role' => 'Director',
                'cargo' => null,
                'email' => 'zenaida@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'name' => 'adriana',
                'username' => 'adriana',
                'role' => 'Ventas',
                'cargo' => null,
                'email' => 'adriana@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'name' => 'jose',
                'username' => 'jose',
                'role' => 'Cobranza',
                'cargo' => null,
                'email' => 'jose@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'name' => 'Maria Laredo',
                'username' => 'mlaredo',
                'role' => 'Cobranza',
                'cargo' => null,
                'email' => '',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'name' => 'Yuri',
                'username' => 'yuri',
                'role' => 'Administrador',
                'cargo' => null,
                'email' => '',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'name' => 'Marlene',
                'username' => 'marlene',
                'role' => 'Ventas',
                'cargo' => null,
                'email' => '',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        Zona::create(['nombre_zona' => 'SUD','descripcion_zona' => 'Zona Sud','estado' => 'Activo']);
        Zona::create(['nombre_zona' => 'ESTE','descripcion_zona' => 'Zona Este','estado' => 'Activo']);
        Zona::create(['nombre_zona' => 'NORTE','descripcion_zona' => 'Zona Norte','estado' => 'Activo']);
        Zona::create(['nombre_zona' => 'CENTRO','descripcion_zona' => 'Zona Centro','estado' => 'Activo']);

        Region::create(['nombre_region' => 'ORURO','descripcion_region' => 'Ciudad Oruro','estado' => 'Activo']);
        Region::create(['nombre_region' => 'CHALLAPATA','descripcion_region' => 'Provincia Huari ','estado' => 'Activo']);
        Region::create(['nombre_region' => 'COLQUIRI','descripcion_region' => 'al ir a la paz ','estado' => 'Activo']);


        $sqlFIle = base_path('database/seeders/clientes_202411240814.sql');
        $sqlContent = file_get_contents($sqlFIle);
        DB::unprepared($sqlContent);

        Cargo::create(['nombre_cargo' => 'Director Comercial','descripcion_cargo' => 'Director Comercial','estado' => 'Activo']);
        Cargo::create(['nombre_cargo' => 'Director Administrativo','descripcion_cargo' => 'Director Administrativo','estado' => 'Activo']);
        Cargo::create(['nombre_cargo' => 'Supervisor Zona Este','descripcion_cargo' => 'Supervisor Zona Este','estado' => 'Activo']);
        Cargo::create(['nombre_cargo' => 'Supervisor Zona Norte','descripcion_cargo' => 'Supervisor Zona Norte','estado' => 'Activo']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Ventas','descripcion_cargo' => 'Ejecutivo de Ventas','estado' => 'Activo']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Obra','descripcion_cargo' => 'Ejecutivo de Obra','estado' => 'Activo']);
        Cargo::create(['nombre_cargo' => 'Administrativo','descripcion_cargo' => 'Administracion','estado' => 'Activo']);



        newservicio::create(['nombre' => 'Luz', 'descripcion' => 'pago de luz a la mitad con cemento', 'estado' => 'Activo']);
        newservicio::create(['nombre' => 'Agua', 'descripcion' => 'Servicio de agua potable', 'estado' => 'Activo']);
        newservicio::create(['nombre' => 'Alquiler', 'descripcion' => 'Pago mensual por espacio alquilado', 'estado' => 'Activo']);
        newservicio::create(['nombre' => 'Internet', 'descripcion' => 'Servicio de conexión a internet', 'estado' => 'Activo']);
        newservicio::create(['nombre' => 'Telefonía', 'descripcion' => 'Pago de servicio de telefonía', 'estado' => 'Activo']);
        newservicio::create(['nombre' => 'Impuestos', 'descripcion' => 'Pago de impuestos fiscales', 'estado' => 'Activo']);
        newservicio::create(['nombre' => 'Caja Chica', 'descripcion' => 'Fondo para gastos menores', 'estado' => 'Activo']);

        Ejecutivo::create(['nombre_eje' => 'Zenaida Torrez Escobar','ci' => '3062291 Or','cargo' => 'Director Adminstrativo','apodo' => 'ZTORREZ','estado' => 'Activo']);
        Ejecutivo::create(['nombre_eje' => 'Jiklid Gerardo Laredo Muriel','ci' => '3062291 Or','cargo' => 'Director Comercial','apodo' => 'JLAREDO','estado' => 'Activo']);
        Ejecutivo::create(['nombre_eje' => 'Maria Rosa Miranda Enrriquez','ci' => '3544080 Or','cargo' => 'Ejecutivo de venta','apodo' => 'MMIRANDA','estado' => 'Activo']);
        Ejecutivo::create(['nombre_eje' => 'Mayte Adriana teran Bautista','ci' => '7407409 Or.','cargo' => 'Ejecutivo de venta','apodo' => 'ATERAN','estado' => 'Activo']);
        Ejecutivo::create(['nombre_eje' => 'Maria del Rosario Laredo Muriel','ci' => '4050796 Or','cargo' => 'Supervisor','apodo' => 'MLAREDO','estado' => 'Activo']);
        Ejecutivo::create(['nombre_eje' => 'Valeria Isabel Lopez Torrez','ci' => '7344234-1 Or','cargo' => 'Supervisor','apodo' => 'VLOPEZ','estado' => 'Activo']);
        Ejecutivo::create(['nombre_eje' => 'Susana','ci' => '0','cargo' => 'Administrativo','apodo' => 'SCONDORI','estado' => 'Activo']);
        Ejecutivo::create(['nombre_eje' => 'Jose','ci' => '0','cargo' => 'Administrativo','apodo' => 'JOQUENDO','estado' => 'Activo']);


        $productos = [
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 1/4"',
                'descripcion_pro' => 'Tubo de medida 1/4" (6 mm)',
                'precio_pro' => 33.5,
                'precio_compra' => 29.8,
                'cantidad_pro' => 1151,
                'foto_pro' => '/storage/fotos/6765ed5b2d405.png',
                'tonelada' => 375,
            ],
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 5/16"',
                'descripcion_pro' => 'Tubo de medida 5/16" (8 mm)',
                'precio_pro' => 47.47,
                'precio_compra' => 44.9,
                'cantidad_pro' => 0,
                'foto_pro' => '/storage/fotos/6765ed8d3dfbc.png',
                'tonelada' => 217,
            ],
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 3/8"',
                'descripcion_pro' => 'Tubo de medida 3/8" (9.5 mm)',
                'precio_pro' => 72.5,
                'precio_compra' => 63.27,
                'cantidad_pro' => 1232,
                'foto_pro' => '/storage/fotos/6765ed9aca6ed.png',
                'tonelada' => 154,
            ],
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 1/2"',
                'descripcion_pro' => 'Tubo de medida 1/2" (12 mm)',
                'precio_pro' => 114,
                'precio_compra' => 100.45,
                'cantidad_pro' => 1552,
                'foto_pro' => '/storage/fotos/6765eda3dd407.png',
                'tonelada' => 97,
            ],
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 5/8"',
                'descripcion_pro' => 'Tubo de medida 5/8" (16 mm)',
                'precio_pro' => 187.27,
                'precio_compra' => 170.16,
                'cantidad_pro' => 0,
                'foto_pro' => '/storage/fotos/6765edaa779bf.png',
                'tonelada' => 55,
            ],
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 3/4"',
                'descripcion_pro' => 'Tubo de medida 3/4" (20 mm)',
                'precio_pro' => 294,
                'precio_compra' => 278.4,
                'cantidad_pro' => 0,
                'foto_pro' => '/storage/fotos/6765edb2b8ed5.png',
                'tonelada' => 35,
            ],
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 1"',
                'descripcion_pro' => 'Tubo de medida 1" (25 mm)',
                'precio_pro' => 468,
                'precio_compra' => 442.90,
                'cantidad_pro' => 0,
                'foto_pro' => '/storage/fotos/6765edb8e8dfd.png',
                'tonelada' => 22,
            ],
        ];
        DB::table('productos')->insert($productos);


        DB::table('producto_cementos')->insert([
            [
                'marca' => 'SOBOCE',
                'nombre' => 'Viacha Eco Plus',
                'descripcion' => 'Cemento Viacha Eco Plus',
                'precio' => 47.00,
                'cantidad' => 1000,
                'foto' => '/storage/fotos/VIACHAECOPLUS.jpeg',
            ],
            [
                'marca' => 'SOBOCE',
                'nombre' => 'Viacha IP-40',
                'descripcion' => 'Cemento Viacha IP-40',
                'precio' => 50.00,
                'cantidad' => 1000,
                'foto' => '/storage/fotos/VIACHA-40.jpeg',
            ],
            [
                'marca' => 'SOBOCE',
                'nombre' => 'Viacha IP-30',
                'descripcion' => 'Cemento Viacha IP-30',
                'precio' => 47.00,
                'cantidad' => 1000,
                'foto' => '/storage/fotos/VIACHA-30.png',
            ],
            [
                'marca' => 'EMISA',
                'nombre' => 'EMISA IP-40',
                'descripcion' => 'Cemento EMISA IP-40',
                'precio' => 50.00,
                'cantidad' => 1000,
                'foto' => '/storage/fotos/EMISA-40.jpeg',
            ],
            [
                'marca' => 'EMISA',
                'nombre' => 'EMISA IP-30',
                'descripcion' => 'Cemento EMISA IP-30',
                'precio' => 47.00,
                'cantidad' => 0,
                'foto' => '/storage/fotos/EMISA-30.jpeg',
            ],
        ]);
    }
}

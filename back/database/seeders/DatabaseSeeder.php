<?php

namespace Database\Seeders;

use App\Models\Cargo;
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
        User::create(['name' => 'Administrador','username' => 'admin','password' => bcrypt('admin'),'role' => 'Administrador']);


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
        ]);
        Zona::create(['nombre_zona' => 'SUD','descripcion_zona' => 'Zona Sud','estado' => 'ACTIVO']);
        Zona::create(['nombre_zona' => 'ESTE','descripcion_zona' => 'Zona Este','estado' => 'ACTIVO']);
        Zona::create(['nombre_zona' => 'NORTE','descripcion_zona' => 'Zona Norte','estado' => 'ACTIVO']);
        Zona::create(['nombre_zona' => 'CENTRO','descripcion_zona' => 'Zona Centro','estado' => 'ACTIVO']);

        Region::create(['nombre_region' => 'ORURO','descripcion_region' => 'Ciudad Oruro','estado' => 'ACTIVO']);
        Region::create(['nombre_region' => 'CHALLAPATA','descripcion_region' => 'Provincia Huari ','estado' => 'ACTIVO']);
        Region::create(['nombre_region' => 'COLQUIRI','descripcion_region' => 'al ir a la paz ','estado' => 'ACTIVO']);


        $sqlFIle = base_path('database/seeders/clientes_202411240814.sql');
        $sqlContent = file_get_contents($sqlFIle);
        DB::unprepared($sqlContent);

        Cargo::create(['nombre_cargo' => 'Director Comercial','descripcion_cargo' => 'Director Comercial','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Director Administrativo','descripcion_cargo' => 'Director Administrativo','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Supervisor Zona Este','descripcion_cargo' => 'Supervisor Zona Este','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Supervisor Zona Norte','descripcion_cargo' => 'Supervisor Zona Norte','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Ventas','descripcion_cargo' => 'Ejecutivo de Ventas','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Obra','descripcion_cargo' => 'Ejecutivo de Obra','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Administrativo','descripcion_cargo' => 'Administracion','estado' => 'ACTIVO']);


        Ejecutivo::create(['nombre_eje' => 'Jose','apellido_eje' => 'Oquendo','cargo' => 'Administrativo','apodo' => 'JOQUENDO','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Maria','apellido_eje' => 'Miranda','cargo' => 'Ejecutivo de venta','apodo' => 'MMIRANDA','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Adriana','apellido_eje' => 'Teran','cargo' => 'Ejecutivo de venta','apodo' => 'ATERAN','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Victor','apellido_eje' => 'Ramirez','cargo' => 'Administrativo','apodo' => 'VRAMIREZ','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Susana','apellido_eje' => 'Condori','cargo' => 'Administrativo','apodo' => 'SCONDORI','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Marcela','apellido_eje' => 'Balcazar','cargo' => 'Administrativo','apodo' => 'MBALCAZAR','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Maria','apellido_eje' => 'Laredo','cargo' => 'Supervisor Norte','apodo' => 'MLAREDO','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Valeria','apellido_eje' => 'Lopez','cargo' => 'Supervisor Este','apodo' => 'VLOPEZ','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Zenaida','apellido_eje' => 'Torrez','cargo' => 'Director Adminstrativo','apodo' => 'ZTORREZ','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Gerardo','apellido_eje' => 'LAredo','cargo' => 'Director Comercial','apodo' => 'JLAREDO','estado' => 'ACTIVO']);


//        Schema::create('productos', function (Blueprint $table) {
//            $table->id();
//            $table->string('categoria_pro')->nullable();
//            $table->string('marca_pro')->nullable();
//            $table->string('nombre_pro')->nullable();
//            $table->string('descripcion_pro')->nullable();
//            $table->integer('precio_pro')->nullable();
//            $table->text('foto_pro')->nullable();
//            $table->string('estado_pro')->nullable();
//            $table->unsignedBigInteger('user_id')->nullable();
//            $table->foreign('user_id')->references('id')->on('users');
//            $table->softDeletes();
//            $table->timestamps();
//        });

        // cemento soboce emisa-IP40 cemento soboce 44
//        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'EMISA-IP40','descripcion_pro' => 'Cemento soboce emisa-IP40','precio_pro' => 44]);
//        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'VIACHA-IP40','descripcion_pro' => 'Cemento soboce viacha-IP40','precio_pro' => 44]);
//
//        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'EMISA-IP30','descripcion_pro' => 'Cemento soboce emisa-IP30','precio_pro' => 42]);
//        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'VIACHA-IP30','descripcion_pro' => 'Cemento soboce viacha-IP30','precio_pro' => 42]);

        $productos = [
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 1/4"',
                'descripcion_pro' => 'Tubo de medida 1/4" (6 mm)',
                'precio_pro' => 33.5,
                'precio_compra' => 29.8,
                'cantidad_pro' => 1151,
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
                'tonelada' => 154,
            ],
            [
                'categoria_pro' => 'FIERRO',
                'marca_pro' => 'LAS LOMAS',
                'nombre_pro' => 'Tubo 1/2"',
                'descripcion_pro' => 'Tubo de medida 1/2" (12 mm)',
                'precio_pro' => 114,
                'precio_compra' => 0.45,
                'cantidad_pro' => 1552,
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
                'tonelada' => 22,
            ],
        ];
        DB::table('productos')->insert($productos);
    }
}

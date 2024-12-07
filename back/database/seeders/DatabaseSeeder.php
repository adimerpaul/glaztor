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

        Region::create(['nombre_region' => 'ORURO','descripcion_region' => 'Ciudad Oruro','estado' => 'ACTIVO']);
        Region::create(['nombre_region' => 'CHALLAPATA','descripcion_region' => 'Provincia Huari ','estado' => 'ACTIVO']);
        Region::create(['nombre_region' => 'COLQUIRI','descripcion_region' => 'al ir a la paz ','estado' => 'ACTIVO']);
     
  
        $sqlFIle = base_path('database/seeders/clientes_202411240814.sql');
        $sqlContent = file_get_contents($sqlFIle);
        DB::unprepared($sqlContent);

        Cargo::create(['nombre_cargo' => 'Gerente Comercial','descripcion_cargo' => 'Gerente Comercial','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Gerente Administrativo','descripcion_cargo' => 'Gerente Administrativo','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Encargado Zona Este','descripcion_cargo' => 'Encargado Zona Este','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Encargado Zona Norte','descripcion_cargo' => 'Encargado Zona Norte','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Ventas','descripcion_cargo' => 'Ejecutivo de Ventas','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Obra','descripcion_cargo' => 'Ejecutivo de Obra','estado' => 'ACTIVO']);

        Ejecutivo::create(['nombre_eje' => 'Jose','apellido_eje' => 'Oquendo','cargo' => 'Administrativo','apodo' => 'JOQUENDO','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Maria','apellido_eje' => 'Miranda','cargo' => 'Ejecutivo de venta','apodo' => 'MMIRANDA','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Adriana','apellido_eje' => 'Teran','cargo' => 'Ejecutivo de venta','apodo' => 'ATERAN','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Victor','apellido_eje' => 'Ramirez','cargo' => 'Administrativo','apodo' => 'VRAMIREZ','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Susana','apellido_eje' => 'Condori','cargo' => 'Administrativo','apodo' => 'SCONDORI','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Marcela','apellido_eje' => 'Balcazar','cargo' => 'Administrativo','apodo' => 'MBALCAZAR','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Maria','apellido_eje' => 'Laredo','cargo' => 'Encargado Norte','apodo' => 'MLAREDO','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Valeria','apellido_eje' => 'Lopez','cargo' => 'Encargado Este','apodo' => 'VLOPEZ','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Zenaida','apellido_eje' => 'Torrez','cargo' => 'Gerente Comercial','apodo' => 'ZTORREZ','estado' => 'ACTIVO']);
        Ejecutivo::create(['nombre_eje' => 'Gerardo','apellido_eje' => 'LAredo','cargo' => 'Gerente Adminstrativo','apodo' => 'JLAREDO','estado' => 'ACTIVO']);


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
        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'EMISA-IP40','descripcion_pro' => 'Cemento soboce emisa-IP40','precio_pro' => 44]);
        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'VIACHA-IP40','descripcion_pro' => 'Cemento soboce viacha-IP40','precio_pro' => 44]);

        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'EMISA-IP30','descripcion_pro' => 'Cemento soboce emisa-IP30','precio_pro' => 42]);
        Producto::create(['categoria_pro' => 'Cemento','marca_pro' => 'Soboce','nombre_pro' => 'VIACHA-IP30','descripcion_pro' => 'Cemento soboce viacha-IP30','precio_pro' => 42]);


    }
}

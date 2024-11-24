<?php

namespace Database\Seeders;

use App\Models\Cargo;
use App\Models\Ejecutivo;
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

        Cargo::create(['nombre_cargo' => 'Gerente Comercial','descripcion_cargo' => 'Gerente Comercial','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Gerente Administrativo','descripcion_cargo' => 'Gerente Administrativo','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Encargado Zona Este','descripcion_cargo' => 'Encargado Zona Este','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Encargado Zona Norte','descripcion_cargo' => 'Encargado Zona Norte','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Ventas','descripcion_cargo' => 'Ejecutivo de Ventas','estado' => 'ACTIVO']);
        Cargo::create(['nombre_cargo' => 'Ejecutivo de Obra','descripcion_cargo' => 'Ejecutivo de Obra','estado' => 'ACTIVO']);


//        APODO	NOMBRE	APELLIDO	CARGO
//JOQUENDO	Jose	Oquendo	Administrativo
//MMIRANDA	Maria	Miranda	Ejecutivo de venta
//ATERAN	Adriana	Teran	Ejecutivo de venta
//VRAMIREZ	Victor	Ramirez	Administrativo
//SCONDORI	Susana	Condori	Administrativo
//MBALCAZAR	Marcela	Balcazar	Administrativo
//MLAREDO	Maria	Laredo	Encargado Norte
//VLOPEZ	Valeria	Lopez	Encargado Este
//ZTORREZ	Zenaida	Torrez	Gerente Comercial
//JLAREDO	Gerardo	LAredo	Gerente Adminstrativo
//        Schema::create('ejecutivos', function (Blueprint $table) {
//            $table->id();
//            $table->string('nombre_eje')->nullable();
//            $table->string('apellido_eje')->nullable();
//            $table->integer('telefono_1')->nullable();
//            $table->integer('telefono_2')->nullable();
//            $table->string('cargo')->nullable();
//            $table->string('apodo')->nullable();
//            $table->string('correo')->nullable();
//            $table->string('direccion')->nullable();
//            $table->string('ubicacion')->nullable();
//            $table->string('zona')->nullable();
//            $table->date('cumple')->nullable();
//            $table->string('estado')->nullable()->default('ACTIVO');
//            $table->unsignedBigInteger('user_id')->nullable();
//            $table->foreign('user_id')->references('id')->on('users');
//            $table->softDeletes();
//            $table->timestamps();
//        });
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


    }
}

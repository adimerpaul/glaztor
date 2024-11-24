<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('tipo_cliente')->nullable();
            $table->string('nombre_cliente')->nullable();
            $table->string('telefono_1')->nullable();
            $table->string('telefono_2')->nullable();
            $table->string('direccion')->nullable();
            $table->string('complemento')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->string('zona')->nullable();
            $table->string('region')->nullable();
            $table->date('cumple')->nullable();
            $table->string('estado')->nullable()->default('Activo');
            $table->string('ejecutivo')->nullable();
            $table->string('sap')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};

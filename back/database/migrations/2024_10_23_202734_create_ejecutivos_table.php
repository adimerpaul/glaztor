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
        Schema::create('ejecutivos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_eje')->nullable();
            $table->string('apellido_eje')->nullable();
            $table->integer('telefono_1')->nullable();
            $table->integer('telefono_2')->nullable();
            $table->string('cargo')->nullable();
            $table->string('apodo')->nullable();
            $table->text('foto')->nullable();
            $table->string('correo')->nullable();
            $table->string('direccion')->nullable();
            $table->string('ubicacion')->nullable()->default('-17.969753,-67.114749');
//            $table->string('lat')->nullable()->default('-17.969753');
//            $table->string('lng')->nullable()->default('-67.114749');
            $table->string('zona')->nullable();
            $table->date('cumple')->nullable();
            $table->string('estado')->nullable()->default('ACTIVO');
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
        Schema::dropIfExists('ejecutivos');
    }
};

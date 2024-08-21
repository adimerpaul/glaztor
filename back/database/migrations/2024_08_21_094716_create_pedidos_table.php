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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_encargado')->nullable();
            $table->integer('telefono')->nullable();
            $table->string('contratista')->nullable();
            $table->integer('telefono_contratista')->nullable();
            $table->string('ubicacion')->nullable();
            $table->string('tipo_construccion')->nullable();
            $table->string('volumen')->nullable();
            $table->string('observaciones')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};

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
        Schema::create('preventas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('propietario')->nullable();
            $table->string('contratista')->nullable();
            $table->integer('telefono_propietario')->nullable();
            $table->integer('telefono_contratista')->nullable();
            $table->string('ubicacion')->nullable();
            $table->string('zona')->nullable();
            $table->string('observacion')->nullable();
            $table->string('tipo_construccion')->nullable();
            $table->string('volumen')->nullable();
            $table->string('medida')->nullable();
            $table->string('marca')->nullable();
            $table->string('producto')->nullable();
            $table->string('direccion')->nullable();
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
        Schema::dropIfExists('preventas');
    }
};

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
        Schema::create('productoladrillos', function (Blueprint $table) {
            $table->id();
            $table->string('categoria_pro');
            $table->string('marca_pro');
            $table->string('nombre_pro');
            $table->string('descripcion_pro')->nullable();
            $table->integer('precio_pro')->nullable();
            $table->string('foto_pro')->nullable();
            $table->string('estado_pro');
//            $table->integer('user_id');
            $table->integer('precio_compra')->nullable();
            $table->integer('cantidad_pro')->nullable();
            $table->string('tonelada')->nullable();
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
        Schema::dropIfExists('productoladrillos');
    }
};

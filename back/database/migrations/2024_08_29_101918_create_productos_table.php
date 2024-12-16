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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('categoria_pro')->nullable();
            $table->string('marca_pro')->nullable();
            $table->string('nombre_pro')->nullable();
            $table->string('descripcion_pro')->nullable();
            $table->decimal('precio_pro', 10, 2)->nullable();
            $table->decimal('precio_compra', 10, 2)->nullable();
            $table->string('cantidad_pro')->nullable();
            $table->text('foto_pro')->nullable();
            $table->string('estado_pro')->nullable()->default('ACTIVO');
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
        Schema::dropIfExists('productos');
    }
};

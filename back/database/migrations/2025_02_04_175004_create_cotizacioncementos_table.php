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
        Schema::create('cotizacioncementos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('cliente')->nullable();
            $table->string('marca')->nullable();
            $table->string('producto')->nullable();
            $table->string('cantidad')->nullable();
            $table->string('medida')->nullable();
            $table->string('zona')->nullable();
            $table->decimal('precio_compra_cf', 10, 2)->nullable();
            $table->decimal('precio_compra_sf', 10, 2)->nullable();
            $table->decimal('precio_venta_cf', 10, 2)->nullable();
            $table->decimal('precio_venta_sf', 10, 2)->nullable();
            $table->string('observacion')->nullable();
           
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
        Schema::dropIfExists('cotizacioncementos');
    }
};

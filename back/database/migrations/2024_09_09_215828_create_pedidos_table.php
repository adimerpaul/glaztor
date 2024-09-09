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
            $table->dateTime('fecha_hora')->nullable();
            $table->string('tipo')->nullable();
            $table->string('cliente')->nullable();
            $table->string('producto')->nullable();
            $table->integer('cantidad')->nullable();
            $table->decimal('precio', 8, 2)->nullable();
            $table->string('factura')->nullable();
            $table->string('nombre_factura')->nullable();
            $table->string('nit_factura')->nullable();
            $table->string('direccion')->nullable();
            $table->string('contacto')->nullable();
            $table->string('telefono')->nullable();
            $table->string('telefono2')->nullable();
            $table->string('observacion')->nullable();
            $table->string('chofer')->nullable();
            $table->date('fecha_pago')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->softDeletes();
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


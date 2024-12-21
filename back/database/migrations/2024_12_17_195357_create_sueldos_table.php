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
        Schema::create('sueldos', function (Blueprint $table) {
            $table->id(); // ID único para cada registro
            $table->date('sueldo_correspondiente')->nullable(); // Fecha de ingreso
            $table->string('tipo')->nullable(); 
            $table->string('nombre_completo')->nullable(); // Nombre completo del empleado
            $table->string('ci')->nullable(); // Carnet de Identidad
            $table->string('cargo')->nullable(); // Cargo del empleado
            $table->date('fecha_ingreso')->nullable(); // Fecha de ingreso
            $table->decimal('haber_basico', 10, 2)->nullable(); // Haber básico
            $table->decimal('bono_antiguedad', 10, 2)->nullable(); // Haber básico
            $table->decimal('monto_acumulado', 10, 2)->nullable(); // Monto acumulado
            $table->decimal('descuento_afp', 10, 2)->nullable(); // AFP 0.5%
            $table->decimal('descuento_seguro', 10, 2)->nullable(); // Seguro 10%
            $table->decimal('descuento_solidario', 10, 2)->nullable(); // Aporte solidario 1.75%
            $table->decimal('descuento_otros', 10, 2)->nullable(); // Otros descuentos 0.5%
            $table->decimal('total_descuentos_lab', 10, 2)->nullable(); // Total descuentos laborales
            $table->decimal('total_liquido', 10, 2)->nullable(); // Total líquido
            $table->decimal('descuento_rc_iva', 10, 2)->nullable(); // RC IVA
            $table->decimal('descuento_anticipo', 10, 2)->nullable(); // Anticipo
            $table->decimal('total_descuentos', 10, 2)->nullable(); // Total descuentos
            $table->decimal('liquido_pagable', 10, 2)->nullable(); // Líquido pagable
            $table->text('foto')->nullable();
            $table->unsignedBigInteger('user_id')->nullable(); // Relación con tabla usuarios
            $table->foreign('user_id')->references('id')->on('users'); // Llave foránea
            $table->timestamps(); // Timestamps para created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sueldos');
    }
};

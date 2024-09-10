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
        Schema::create('pedidotrailers', function (Blueprint $table) {
            $table->id();
            $table->dateTime('fecha_hora_tra')->nullable();
            $table->string('n_tra')->nullable();
            $table->string('asesor_tra')->nullable();
            $table->string('zona_tra')->nullable();
            $table->string('cliente1_tra')->nullable();
            $table->string('producto1_tra')->nullable();
            $table->integer('cantidad1_tra')->nullable();
            $table->decimal('precio1_tra', 8, 2)->nullable();

            $table->string('cliente2_tra')->nullable();
            $table->string('producto2_tra')->nullable();
            $table->integer('cantidad2_tra')->nullable();
            $table->decimal('precio2_tra', 8, 2)->nullable();

            $table->string('cliente3_tra')->nullable();
            $table->string('producto3_tra')->nullable();
            $table->integer('cantidad3_tra')->nullable();
            $table->decimal('precio3_tra', 8, 2)->nullable();

            $table->string('cliente4_tra')->nullable();
            $table->string('producto4_tra')->nullable();
            $table->integer('cantidad4_tra')->nullable();
            $table->decimal('precio4_tra', 8, 2)->nullable();

            $table->string('factura_tra')->nullable();
            $table->string('nombre_factura_tra')->nullable();
            $table->string('nit_factura_tra')->nullable();
            $table->string('direccion_tra')->nullable();
            $table->string('contacto_tra')->nullable();
            $table->string('telefono_tra')->nullable();
            $table->string('telefono2_tra')->nullable();
            $table->string('observacion_tra')->nullable();
            $table->string('chofer_tra')->nullable();
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
        Schema::dropIfExists('pedidotrailers');
    }
};

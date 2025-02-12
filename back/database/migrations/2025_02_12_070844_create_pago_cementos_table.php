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
        Schema::create('pago_cementos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pedido_id')->nullable();
            $table->foreign('pedido_id')->references('id')->on('pedido_cementos');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->decimal('monto', 8, 2)->nullable();
            $table->string('forma_pago')->nullable();
            $table->string('numero_recibo')->nullable();
            $table->date('fecha_pago')->nullable();
            $table->time('hora_pago')->nullable();
            $table->string('banco')->nullable();
            $table->string('observacion')->nullable();
            $table->string('estado')->nullable()->default('Activo');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pago_cementos');
    }
};

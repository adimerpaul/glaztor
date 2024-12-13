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
        Schema::create('cajachicas', function (Blueprint $table) {
            $table->id();
            $table->string(column: 'recibo')->nullable();
            $table->string('concepto')->nullable(); 
            $table->decimal('monto', 10, 2); 
            $table->date('fecha'); 
            $table->string('tipo_movimiento')->nullable(); 
            $table->text('descripcion')->nullable();
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
        Schema::dropIfExists('cajachicas');
    }
};

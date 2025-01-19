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
        Schema::create('producto_cementos', function (Blueprint $table) {
            $table->id();
            $table->string('categoria')->nullable()->default('Cemento');
            $table->string('marca')->nullable();
            $table->string('nombre')->nullable();
            $table->string('descripcion')->nullable();
            $table->decimal('precio', 10, 2)->nullable();
            $table->integer('cantidad')->nullable();
            $table->text('foto')->nullable();
            $table->text('numeroPedido')->nullable();
            $table->text('numeroFactura')->nullable();
            $table->string('estado')->nullable()->default('ACTIVO');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_cementos');
    }
};

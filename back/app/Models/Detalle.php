<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Detalle extends Model{
    use HasFactory, SoftDeletes;
//$table->unsignedBigInteger('pedido_id')->nullable();
//$table->foreign('pedido_id')->references('id')->on('pedidos');
//$table->unsignedBigInteger('user_id')->nullable();
//$table->foreign('user_id')->references('id')->on('users');
//$table->string('producto')->nullable();
//$table->integer('cantidad')->nullable();
//$table->decimal('precio', 8, 2)->nullable();
//$table->softDeletes();
//$table->timestamps();
    protected $fillable = [
        'pedido_id',
        'user_id',
        'producto_id',
        'producto',
        'cantidad',
        'precio',
        'precio_compra'
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function pedido(){
        return $this->belongsTo(Pedido::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function producto(){
        return $this->belongsTo(Producto::class);
    }
}

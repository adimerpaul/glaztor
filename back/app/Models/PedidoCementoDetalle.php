<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PedidoCementoDetalle extends Model{
    use HasFactory, SoftDeletes;

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
        return $this->belongsTo(PedidoCemento::class, 'pedido_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function producto(){
        return $this->belongsTo(Producto::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'fecha_hora',
        'tipo',
        'cliente',
        'producto',
        'cantidad',
        'precio',
        'factura',
        'nombre_factura',
        'nit_factura',
        'direccion',
        'contacto',
        'telefono',
        'telefono2',
        'observacion',
        'chofer',
        'fecha_pago',
        'user_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PagoCemento extends Model{
    use HasFactory,SoftDeletes;
    protected $fillable=[
        'pedido_id',
        'user_id',
        'monto',
        'forma_pago',
        'numero_recibo',
        'fecha_pago',
        'hora_pago',
        'banco',
        'observacion',
        'estado'
    ];
    protected $hidden=[
        'created_at',
        'updated_at',
        'deleted_at'
    ];
    function user(){
        return $this->belongsTo(User::class);
    }
}

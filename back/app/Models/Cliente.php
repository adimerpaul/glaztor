<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'tipo_cliente',
        'nombre_cliente',
        'telefono_1',
        'telefono_2',
        'direccion',
        'complemento',
        'ubicacion',
        'zona',
        'region',
        'cumple',
        'estado',
        'ejecutivo',
        'user_id'
    ];
    protected $hidden = ['created_at','updated_at','deleted_at'];
}
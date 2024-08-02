<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        
    ];
    protected $hidden = ['created_at','updated_at','deleted_at'];
}
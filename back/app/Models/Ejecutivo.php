<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ejecutivo extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'nombre_eje',
        'apellido_eje',
        'telefono_1',
        'telefono_2',
        'cargo',
        'apodo',
        'correo',
        'direccion',
        'ubicacion',
        'zona',
        'cumple',
        'estado',
        'user_id'
    ];
    protected $hidden = ['created_at','updated_at','deleted_at'];
}


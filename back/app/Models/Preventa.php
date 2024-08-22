<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Preventa extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'fecha',
        'propietario',
        'contratista',
        'telefono_propietario',
        'telefono_contratista',
        'ubicacion',
        'zona',
        'observacion',
        'tipo_construccion',
        'volumen',
        'marca',
        'user_id',
        'direccion'
    ];
    protected $hidden = ['created_at','updated_at','deleted_at'];
}

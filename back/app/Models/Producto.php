<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'categoria_pro',
        'marca_pro',
        'nombre_pro',
        'descripcion_pro',
        'precio_pro',
        'foto_pro',
        'estado_pro',
        'user_id'
    ];
    protected $hidden = ['created_at','updated_at','deleted_at'];
}

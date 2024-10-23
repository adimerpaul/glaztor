<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Zona extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'nombre_zona',
        'descripcion_zona',
        'estado',
        'user_id'
    ];
    protected $hidden = ['created_at','updated_at','deleted_at'];
}
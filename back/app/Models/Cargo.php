<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cargo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nombre_cargo',
        'descripcion_cargo',
        'estado',
        'user_id'
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    // Mutador para convertir nombre_cargo a mayúsculas
    public function setNombreCargoAttribute($value)
    {
        $this->attributes['nombre_cargo'] = strtoupper($value);
    }

    // Mutador para convertir descripcion_cargo a mayúsculas
    public function setDescripcionCargoAttribute($value)
    {
        $this->attributes['descripcion_cargo'] = strtoupper($value);
    }
}

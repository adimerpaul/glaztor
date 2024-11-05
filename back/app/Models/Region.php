<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Region extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre_region',
        'descripcion_region',
        'estado',
        'user_id'
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function setNombreZonaAttribute($value)
    {
        $this->attributes['nombre_region'] = strtoupper($value);
    }

    // Mutador para convertir descripcion_zona a mayúsculas
    public function setDescripcionZonaAttribute($value)
    {
        $this->attributes['descripcion_region'] = strtoupper($value);
    }
}

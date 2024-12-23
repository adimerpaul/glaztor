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

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function setNombreZonaAttribute($value)
    {
        $this->attributes['nombre_zona'] = strtoupper($value);
    }

    // Mutador para convertir descripcion_zona a mayúsculas
    public function setDescripcionZonaAttribute($value)
    {
        $this->attributes['descripcion_zona'] = strtoupper($value);
    }
 
}

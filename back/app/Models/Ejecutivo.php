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
        'foto',
        'correo',
        'direccion',
        'ubicacion',
        'zona',
        'cumple',
        'estado',
        'user_id'
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    // Mutador para convertir nombre_eje a mayúsculas
    public function setNombreEjeAttribute($value)
    {
        $this->attributes['nombre_eje'] = strtoupper($value);
    }

    // Mutador para convertir apellido_eje a mayúsculas
    public function setApellidoEjeAttribute($value)
    {
        $this->attributes['apellido_eje'] = strtoupper($value);
    }

    // Mutador para convertir cargo a mayúsculas
    public function setCargoAttribute($value)
    {
        $this->attributes['cargo'] = strtoupper($value);
    }

    // Mutador para convertir apodo a mayúsculas
    public function setApodoAttribute($value)
    {
        $this->attributes['apodo'] = strtoupper($value);
    }

    // Mutador para convertir direccion a mayúsculas
    public function setDireccionAttribute($value)
    {
        $this->attributes['direccion'] = strtoupper($value);
    }

    // Mutador para convertir zona a mayúsculas
    public function setZonaAttribute($value)
    {
        $this->attributes['zona'] = strtoupper($value);
    }
    public function zona()
    {
        return $this->belongsTo(Zona::class);
    }
}

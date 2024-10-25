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

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    // Mutador para convertir tipo_cliente a mayúsculas
    public function setTipoClienteAttribute($value)
    {
        $this->attributes['tipo_cliente'] = strtoupper($value);
    }

    // Mutador para convertir nombre_cliente a mayúsculas
    public function setNombreClienteAttribute($value)
    {
        $this->attributes['nombre_cliente'] = strtoupper($value);
    }

    // Mutador para convertir direccion a mayúsculas
    public function setDireccionAttribute($value)
    {
        $this->attributes['direccion'] = strtoupper($value);
    }

    // Mutador para convertir complemento a mayúsculas
    public function setComplementoAttribute($value)
    {
        $this->attributes['complemento'] = strtoupper($value);
    }

    // Mutador para convertir zona a mayúsculas
    public function setZonaAttribute($value)
    {
        $this->attributes['zona'] = strtoupper($value);
    }

    // Mutador para convertir region a mayúsculas
    public function setRegionAttribute($value)
    {
        $this->attributes['region'] = strtoupper($value);
    }
}

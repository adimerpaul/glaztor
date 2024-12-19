<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sueldo extends Model
{
    use HasFactory;
    protected $fillable = [
        'tipo',
        'nombre_completo',
        'ci',
        'cargo',
        'fecha_ingreso',
        'haber_basico',
        'monto_acumulado',
        'descuento_afp',
        'descuento_seguro',
        'descuento_solidario',
        'descuento_otros',
        'total_descuentos_lab',
        'total_liquido',
        'descuento_rc_iva',
        'descuento_anticipo',
        'total_descuentos',
        'liquido_pagable',
        'foto',
        'user_id',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    // Relación con el modelo de usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Mutadores para convertir campos de texto a mayúsculas
    public function setNombreCompletoAttribute($value)
    {
        $this->attributes['nombre_completo'] = strtoupper($value);
    }

    public function setCargoAttribute($value)
    {
        $this->attributes['cargo'] = strtoupper($value);
    }

    // Ejemplo de accesor para formatear `haber_basico`
    public function getHaberBasicoAttribute($value)
    {
        return number_format($value, 2, '.', ',');
    }


}

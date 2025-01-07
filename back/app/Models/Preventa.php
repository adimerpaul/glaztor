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
        'producto',
        'user_id',
        'direccion'
    ];

    protected $hidden = ['created_at','updated_at','deleted_at'];
    function user(){
        return $this->belongsTo(User::class);
    }

    // Mutadores para convertir campos a mayúsculas
    public function setPropietarioAttribute($value)
    {
        $this->attributes['propietario'] = strtoupper($value);
    }

    public function setContratistaAttribute($value)
    {
        $this->attributes['contratista'] = strtoupper($value);
    }

    public function setUbicacionAttribute($value)
    {
        $this->attributes['ubicacion'] = strtoupper($value);
    }

    public function setZonaAttribute($value)
    {
        $this->attributes['zona'] = strtoupper($value);
    }

    public function setObservacionAttribute($value)
    {
        $this->attributes['observacion'] = strtoupper($value);
    }

    public function setTipoConstruccionAttribute($value)
    {
        $this->attributes['tipo_construccion'] = strtoupper($value);
    }

    public function setMarcaAttribute($value)
    {
        $this->attributes['marca'] = strtoupper($value);
    }

    public function setDireccionAttribute($value)
    {
        $this->attributes['direccion'] = strtoupper($value);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cotizacioncemento extends Model
{
    use HasFactory, SoftDeletes; 

    protected $fillable = [
        'fecha',
        'cliente',
        'marca',
        'producto',
        'cantidad',
        'medida',
        'zona',
        'precio_compra_cf',
        'precio_compra_sf',
        'precio_venta_cf',
        'precio_venta_sf',
        'observacion',
    ];

    protected $hidden = ['created_at','updated_at','deleted_at'];
    function user(){
        return $this->belongsTo(User::class);
    }

    // Mutadores para convertir campos a mayúsculas
    public function setClienteAttribute($value)
    {
        $this->attributes['cliente'] = strtoupper($value);
    }
    public function setZonaAttribute($value)
    {
        $this->attributes['zona'] = strtoupper($value);
    }

    public function setObservacionAttribute($value)
    {
        $this->attributes['observacion'] = strtoupper($value);
    }
}

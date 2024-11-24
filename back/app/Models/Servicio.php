<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Servicio extends Model
{
    use HasFactory, SoftDeletes;

    // Campos que se pueden asignar en masa
    protected $fillable = [
        'nombre_servicio',
        'fecha_pago',
        'monto',
        'monto_cancelado',
        'numero_recibo',
        'observacion',    
        'estado',
        'ejecutivo_id'
    ];

    // Campos ocultos en respuestas JSON
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Relación con el modelo Ejecutivo (opcional)
     */
    public function ejecutivo()
    {
        return $this->belongsTo(Ejecutivo::class);
    }

    /**
     * Mutador para establecer el nombre del servicio en mayúsculas
     */
    public function setNombreServicioAttribute($value)
    {
        $this->attributes['nombre_servicio'] = strtoupper($value);
    }

    /**
     * Accesor para formatear el costo con dos decimales
     */
    public function getCostoAttribute($value)
    {
        return number_format($value, 2, '.', ',');
    }

    /**
     * Accesor para mostrar el estado del servicio con la primera letra en mayúscula
     */
    public function getEstadoAttribute($value)
    {
        return ucfirst($value);
    }
}

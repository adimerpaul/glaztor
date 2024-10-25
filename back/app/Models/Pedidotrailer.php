<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedidotrailer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'fecha_hora_tra',
        'n_tra',
        'asesor_tra',
        'zona_tra',
        'cliente1_tra',
        'producto1_tra',
        'cantidad1_tra',
        'precio1_tra',
        'cliente2_tra',
        'producto2_tra',
        'cantidad2_tra',
        'precio2_tra',
        'cliente3_tra',
        'producto3_tra',
        'cantidad3_tra',
        'precio3_tra',
        'cliente4_tra',
        'producto4_tra',
        'cantidad4_tra',
        'precio4_tra',
        'factura_tra',
        'nombre_factura_tra',
        'nit_factura_tra',
        'direccion_tra',
        'contacto_tra',
        'telefono_tra',
        'telefono2_tra',
        'observacion_tra',
        'chofer_tra',
        'user_id',
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    // Mutador para convertir asesor_tra a mayúsculas
    public function setAsesorTraAttribute($value)
    {
        $this->attributes['asesor_tra'] = strtoupper($value);
    }

    // Mutador para convertir zona_tra a mayúsculas
    public function setZonaTraAttribute($value)
    {
        $this->attributes['zona_tra'] = strtoupper($value);
    }

    // Mutadores para clientes y productos
    public function setCliente1TraAttribute($value)
    {
        $this->attributes['cliente1_tra'] = strtoupper($value);
    }

    public function setProducto1TraAttribute($value)
    {
        $this->attributes['producto1_tra'] = strtoupper($value);
    }

    public function setCliente2TraAttribute($value)
    {
        $this->attributes['cliente2_tra'] = strtoupper($value);
    }

    public function setProducto2TraAttribute($value)
    {
        $this->attributes['producto2_tra'] = strtoupper($value);
    }

    public function setCliente3TraAttribute($value)
    {
        $this->attributes['cliente3_tra'] = strtoupper($value);
    }

    public function setProducto3TraAttribute($value)
    {
        $this->attributes['producto3_tra'] = strtoupper($value);
    }

    public function setCliente4TraAttribute($value)
    {
        $this->attributes['cliente4_tra'] = strtoupper($value);
    }

    public function setProducto4TraAttribute($value)
    {
        $this->attributes['producto4_tra'] = strtoupper($value);
    }

    // Mutador para convertir nombre_factura_tra a mayúsculas
    public function setNombreFacturaTraAttribute($value)
    {
        $this->attributes['nombre_factura_tra'] = strtoupper($value);
    }

    // Mutador para convertir direccion_tra a mayúsculas
    public function setDireccionTraAttribute($value)
    {
        $this->attributes['direccion_tra'] = strtoupper($value);
    }

    // Mutador para convertir contacto_tra a mayúsculas
    public function setContactoTraAttribute($value)
    {
        $this->attributes['contacto_tra'] = strtoupper($value);
    }

    // Mutador para convertir chofer_tra a mayúsculas
    public function setChoferTraAttribute($value)
    {
        $this->attributes['chofer_tra'] = strtoupper($value);
    }
}

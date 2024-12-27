<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'fecha',
        'tipo',
        'cliente',
        'producto',
        'cantidad',
        'precio',
        'factura',
        'nombre_factura',
        'nit_factura',
        'direccion',
        'contacto',
        'telefono',
        'telefono2',
        'observacion',
        'chofer',
        'fecha_pago',
        'user_id',
        'estado',
        'cliente_id',
        'zona'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
    function detalles(){
        return $this->hasMany(Detalle::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    // Mutador para convertir tipo a mayúsculas
    public function setTipoAttribute($value)
    {
        $this->attributes['tipo'] = strtoupper($value);
    }

    // Mutador para convertir cliente a mayúsculas
    public function setClienteAttribute($value)
    {
        $this->attributes['cliente'] = strtoupper($value);
    }

    // Mutador para convertir producto a mayúsculas
    public function setProductoAttribute($value)
    {
        $this->attributes['producto'] = strtoupper($value);
    }

    // Mutador para convertir nombre_factura a mayúsculas
    public function setNombreFacturaAttribute($value)
    {
        $this->attributes['nombre_factura'] = strtoupper($value);
    }

    // Mutador para convertir direccion a mayúsculas
    public function setDireccionAttribute($value)
    {
        $this->attributes['direccion'] = strtoupper($value);
    }

    // Mutador para convertir contacto a mayúsculas
    public function setContactoAttribute($value)
    {
        $this->attributes['contacto'] = strtoupper($value);
    }

    // Mutador para convertir chofer a mayúsculas
    public function setChoferAttribute($value)
    {
        $this->attributes['chofer'] = strtoupper($value);
    }
    public function pagos(){
        return $this->hasMany(Pago::class)->with('user');
    }
    protected $appends = ['estadoCredito', 'totalPagado','pagosRealizados'];

    public function getEstadoCreditoAttribute(){
        $pagos = $this->pagos;
        $totalPagos = 0;
        foreach ($pagos as $pago){
            $totalPagos += $pago->monto;
        }
        return $totalPagos >= $this->total;
    }
    public function getTotalPagadoAttribute(){
        $pagos = $this->pagos;
        $totalPagos = 0;
        foreach ($pagos as $pago){
            $totalPagos += $pago->monto;
        }
        return $totalPagos;
    }
    public function getPagosRealizadosAttribute(){
        $pagos = $this->pagos;
        $textPagos = '';
        foreach ($pagos as $pago){
            $textPagos .= $pago->monto.' '.$pago->fecha_pago;
        }
        return substr($textPagos, 0, -1);
    }
}

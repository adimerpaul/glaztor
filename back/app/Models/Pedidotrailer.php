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
    protected $hidden = ['created_at','updated_at','deleted_at'];
}

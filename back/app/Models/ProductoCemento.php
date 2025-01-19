<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductoCemento extends Model{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'categoria',
        'marca',
        'nombre',
        'descripcion',
        'precio',
        'cantidad',
        'foto',
        'numeroPedido',
        'numeroFactura',
        'estado'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];
}

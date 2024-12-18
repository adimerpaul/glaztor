<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'categoria_pro',
        'marca_pro',
        'nombre_pro',
        'descripcion_pro',
        'precio_pro',
        'foto_pro',
        'estado_pro',
        'user_id',
        'precio_compra',
        'cantidad_pro',
        'tonelada',
    ];

    protected $hidden = ['created_at','updated_at','deleted_at'];

    // Mutadores para convertir los campos a mayúsculas
    public function setCategoriaProAttribute($value)
    {
        $this->attributes['categoria_pro'] = strtoupper($value);
    }

    public function setMarcaProAttribute($value)
    {
        $this->attributes['marca_pro'] = strtoupper($value);
    }

    public function setNombreProAttribute($value)
    {
        $this->attributes['nombre_pro'] = strtoupper($value);
    }

    public function setDescripcionProAttribute($value)
    {
        $this->attributes['descripcion_pro'] = strtoupper($value);
    }


}

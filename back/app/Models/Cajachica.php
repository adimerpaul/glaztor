<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cajachica extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'cajachica';

    protected $fillable = [
        'concepto',
        'monto',
        'fecha',
        'tipo_movimiento',
        'descripcion',
        'user_id',
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}

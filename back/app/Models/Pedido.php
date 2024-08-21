<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model
{
    use HasFactory,SoftDeletes;
    // $table->string('nombre_encargado')->nullable();
    //         $table->integer('telefono')->nullable();
    //         $table->string('contratista')->nullable();
    //         $table->integer('telefono_contratista')->nullable();
    //         $table->string('ubicacion')->nullable();
    //         $table->string('tipo_construccion')->nullable();
    //         $table->string('volumen')->nullable();
    //         $table->string('observaciones')->nullable();
    //         $table->unsignedBigInteger('user_id')->nullable();
    //         $table->foreign('user_id')->references('id')->on('users');
    //         $table->softDeletes();
    protected $fillable = ['nombre_encargado','telefono','contratista','telefono_contratista','ubicacion','tipo_construccion','volumen','observaciones','user_id'];
}

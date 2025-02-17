<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MetasCemento extends Model{
    use HasFactory, SoftDeletes;
    protected $fillable = ['mes', 'anio', 'meta'];
    public function users(){
        return $this->belongsToMany(User::class, 'meta_users')->withPivot('meta');
    }
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MetaUser extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['meta_id', 'user_id', 'meta'];
    public function meta(){
        return $this->belongsTo(Meta::class);
    }
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}

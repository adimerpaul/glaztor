<?php

namespace App\Http\Controllers;

use App\Models\Meta;
use App\Models\MetaUser;
use Illuminate\Http\Request;

class MetaController extends Controller{
    function index(){
        return Meta::with('users')->get();
    }
    function store(Request $request){
        $mes = $request->mes;
        $anio = $request->anio;
        $user_id = $request->user_id;

        $meta = $this->getMeta($mes, $anio);

        $metaUser = New MetaUser();
        $metaUser->user_id = $user_id;
        $metaUser->meta_id = $meta->id;
        $metaUser->meta = 0;

        $search = MetaUser::where('user_id', $user_id)->where('meta_id', $meta->id)->first();
        if($search != null){
            return response()->json(['message' => 'Ya existe la meta para este usuario'], 400);
        }


        $metaUser->save();
    }
    function getMeta($mes, $anio){
        $meta = Meta::where('mes', $mes)->where('anio', $anio)->first();
        if($meta == null){
            $meta = new Meta();
            $meta->mes = $mes;
            $meta->anio = $anio;
            $meta->meta = 0;
            $meta->save();
        }
        return $meta;
    }
}

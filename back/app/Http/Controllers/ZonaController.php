<?php

namespace App\Http\Controllers;
use App\Models\Zona;

use Illuminate\Http\Request;

class ZonaController extends Controller
{
    function index(){
        return Zona::all();
    }
    function store(Request $request){
        return Zona::create($request->all());
    }
    function show($id){
        return Zona::find($id);
    }
    function update(Request $request, $id){
        $cargc = Zona::find($id);
        $cargc->update($request->all());
        return $cargc;
    }
    function destroy($id){
        $cargc = Zona::findOrFail($id);
        $cargc->delete();
        return $cargc;
    }
}
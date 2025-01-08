<?php

namespace App\Http\Controllers;

use App\Models\Cotizacion;
use Illuminate\Http\Request;

class CotizacionController extends Controller
{
    function index(){
        return Cotizacion::with('user')->orderBy('id', 'desc')->get();
    }
    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        $cotizacion= Cotizacion::create($request->all());
        return Cotizacion::with('user')->findOrFail($cotizacion->id);
    }
    function show($id){
        return Cotizacion::findOrFail($id);
    }
    function update(Request $request, $id){
        $cotizacion = Cotizacion::findOrFail($id);
        $cotizacion->update($request->all());
        return Cotizacion::with('user')->findOrFail($id);
    }
    function destroy($id){
        $cotizacion = Cotizacion::findOrFail($id);
        $cotizacion->delete();
        return $cotizacion;
    }

}

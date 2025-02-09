<?php

namespace App\Http\Controllers;

use App\Models\Cotizacioncemento;
use Illuminate\Http\Request;

class CotizacioncementoController extends Controller
{
    function index(){
        return Cotizacioncemento::with('user')->orderBy('id', 'desc')->get();
    }
    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        $cotizacioncemento= Cotizacioncemento::create($request->all());
        return Cotizacioncemento::with('user')->findOrFail($cotizacioncemento->id);
    }
    function show($id){
        return Cotizacioncemento::findOrFail($id);
    }
    function update(Request $request, $id){
        $cotizacioncemento = Cotizacioncemento::findOrFail($id);
        $cotizacioncemento->update($request->all());
        return Cotizacioncemento::with('user')->findOrFail($id);
    }
    function destroy($id){
        $cotizacioncemento = Cotizacioncemento::findOrFail($id);
        $cotizacioncemento->delete();
        return $cotizacioncemento;
    }

}

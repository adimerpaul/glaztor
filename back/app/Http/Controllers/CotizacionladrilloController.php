<?php

namespace App\Http\Controllers;

use App\Models\Cotizacionladrillo;
use Illuminate\Http\Request;

class CotizacionladrilloController extends Controller
{
    function index(){
        return Cotizacionladrillo::with('user')->orderBy('id', 'desc')->get();
    }
    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        $cotizacionladrillo= Cotizacionladrillo::create($request->all());
        return Cotizacionladrillo::with('user')->findOrFail($cotizacionladrillo->id);
    }
    function show($id){
        return Cotizacionladrillo::findOrFail($id);
    }
    function update(Request $request, $id){
        $cotizacionladrillo = Cotizacionladrillo::findOrFail($id);
        $cotizacionladrillo->update($request->all());
        return Cotizacionladrillo::with('user')->findOrFail($id);
    }
    function destroy($id){
        $cotizacionladrillo = Cotizacionladrillo::findOrFail($id);
        $cotizacionladrillo->delete();
        return $cotizacionladrillo;
    }
}

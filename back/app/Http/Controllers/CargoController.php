<?php

namespace App\Http\Controllers;
use App\Models\Cargo;

use Illuminate\Http\Request;

class CargoController extends Controller
{
    function index(){
        return Cargo::all();
    }
    function store(Request $request){
        return Cargo::create($request->all());
    }
    function show($id){
        return Cargo::find($id);
    }
    function update(Request $request, $id){
        $cargc = Cargo::find($id);
        $cargc->update($request->all());
        return $cargc;
    }
    function destroy($id){
        $cargc = Cargo::findOrFail($id);
        $cargc->delete();
        return $cargc;
    }
}

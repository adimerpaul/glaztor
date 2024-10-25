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
        $cargo = Cargo::find($id);
        $cargo->update($request->all());
        return $cargo;
    }
    function destroy($id){
        $cargo = Cargo::findOrFail($id);
        $cargo->delete();
        return $cargo;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Preventa;
use Illuminate\Http\Request;

class PreventaController extends Controller{
    function index(){
        return Preventa::all();
    }
    function store(Request $request){
        return Preventa::create($request->all());
    }
    function show($id){
        return Preventa::findOrFail($id);
    }
    function update(Request $request, $id){
        $preventa = Preventa::findOrFail($id);
        $preventa->update($request->all());
        return $preventa;
    }
    function destroy($id){
        $preventa = Preventa::findOrFail($id);
        $preventa->delete();
        return $preventa;
    }
}

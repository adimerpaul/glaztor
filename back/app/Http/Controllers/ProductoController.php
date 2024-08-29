<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    function index(){
        return Producto::all();
    }
    function store(Request $request){
        return Producto::create($request->all());
    }
    function show($id){
        return Producto::findOrFail($id);
    }
    function update(Request $request, $id){
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());
        return $producto;
    }
    function destroy($id){
        $producto = Producto::findOrFail($id);
        $producto->delete();
        return $producto;
    }
}

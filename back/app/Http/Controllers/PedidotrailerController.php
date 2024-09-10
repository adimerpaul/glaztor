<?php

namespace App\Http\Controllers;

use App\Models\Pedidotrailer;
use Illuminate\Http\Request;

class PedidotrailerController extends Controller
{
    function index(){
        return Pedidotrailer::all();
    }
    function store(Request $request){
        return Pedidotrailer::create($request->all());
    }
    function show($id){
        return Pedidotrailer::findOrFail($id);
    }
    function update(Request $request, $id){
        $pedidotrailer = Pedidotrailer::findOrFail($id);
        $pedidotrailer->update($request->all());
        return $pedidotrailer;
    }
    function destroy($id){
        $pedidotrailer = Pedidotrailer::findOrFail($id);
        $pedidotrailer->delete();
        return $pedidotrailer;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller{
    function index(){
        return Pedido::all();
    }
    function store(Request $request){
        return Pedido::create($request->all());
    }
    function show($id){
        return Pedido::find($id);
    }
    function update(Request $request, $id){
        $pedido = Pedido::find($id);
        $pedido->update($request->all());
        return $pedido;
    }
    function destroy($id){
        $pedido = pedido::findOrFail($id);
        $pedido->delete();
        return $pedido;
    }
}

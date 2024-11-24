<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    function index(){
        return Cliente::orderBy('id', 'desc')->get();
    }
    function store(Request $request){
        return Cliente::create($request->all());
    }
    function show($id){
        return Cliente::findOrFail($id);
    }
    function update(Request $request, $id){
        $cliente = Cliente::findOrFail($id);
        $cliente->update($request->all());
        return $cliente;
    }
    function destroy($id){
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();
        return $cliente;
    }
}

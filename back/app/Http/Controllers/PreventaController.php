<?php

namespace App\Http\Controllers;

use App\Models\Preventa;
use Illuminate\Http\Request;

class PreventaController extends Controller{
    function index(){
        return Preventa::with('user')->orderBy('id', 'desc')->get();
    }
    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        $preventa= Preventa::create($request->all());
        return Preventa::with('user')->findOrFail($preventa->id);
    }
    function show($id){
        return Preventa::findOrFail($id);
    }
    function update(Request $request, $id){
        $preventa = Preventa::findOrFail($id);
        $preventa->update($request->all());
        return Preventa::with('user')->findOrFail($id);
    }
    function destroy($id){
        $preventa = Preventa::findOrFail($id);
        $preventa->delete();
        return $preventa;
    }
}

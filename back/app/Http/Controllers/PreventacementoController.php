<?php

namespace App\Http\Controllers;

use App\Models\Preventacemento;
use Illuminate\Http\Request;

class PreventacementoController extends Controller
{
    function index(){
        return Preventacemento::with('user')->orderBy('id', 'desc')->get();
    }
    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        $preventacemento= Preventacemento::create($request->all());
        return Preventacemento::with('user')->findOrFail($preventacemento->id);
    }
    function show($id){
        return Preventacemento::findOrFail($id);
    }
    function update(Request $request, $id){
        $preventacemento = Preventacemento::findOrFail($id);
        $preventacemento->update($request->all());
        return Preventacemento::with('user')->findOrFail($id);
    }
    function destroy($id){
        $preventacemento = Preventacemento::findOrFail($id);
        $preventacemento->delete();
        return $preventacemento;
    }
} 

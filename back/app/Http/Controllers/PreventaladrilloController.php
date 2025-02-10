<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Preventaladrillo;

class PreventaladrilloController extends Controller
{
    function index(){
        return Preventaladrillo::with('user')->orderBy('id', 'desc')->get();
    }
    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        $preventaladrillo= Preventaladrillo::create($request->all());
        return Preventaladrillo::with('user')->findOrFail($preventaladrillo->id);
    }
    function show($id){
        return Preventaladrillo::findOrFail($id);
    }
    function update(Request $request, $id){
        $preventaladrillo = Preventaladrillo::findOrFail($id);
        $preventaladrillo->update($request->all());
        return Preventaladrillo::with('user')->findOrFail($id);
    }
    function destroy($id){
        $preventaladrillo = Preventaladrillo::findOrFail($id);
        $preventaladrillo->delete();
        return $preventaladrillo;
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\Newservicio;

use Illuminate\Http\Request;

class NewservicioController extends Controller
{
    function index(){
        return Newservicio::all();
    }
    function store(Request $request){
        return Newservicio::create($request->all());
    }
    function show($id){
        return Newservicio::find($id);
    }
    function update(Request $request, $id){
        $newservicio = Newservicio::find($id);
        $newservicio->update($request->all());
        return $newservicio;
    }
    function destroy($id){
        $newservicio = Newservicio::findOrFail($id);
        $newservicio->delete();
        return $newservicio;
    }
}

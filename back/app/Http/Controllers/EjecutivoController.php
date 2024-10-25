<?php


namespace App\Http\Controllers;
use App\Models\Ejecutivo;
use App\Models\Zona;

use Illuminate\Http\Request;

class EjecutivoController extends Controller
{
    function index(){
        return Ejecutivo::all();
    }
    function store(Request $request){
        return Ejecutivo::create($request->all());
    }
    function show($id){
        return Ejecutivo::find($id);
    }
    function update(Request $request, $id){
        $ejecutivo = Ejecutivo::find($id);
        $ejecutivo->update($request->all());
        return $ejecutivo;
    }
    function destroy($id){
        $ejecutivo = Ejecutivo::findOrFail($id);
        $ejecutivo->delete();
        return $ejecutivo;
    }
    public function create()
    {
        $zonas = Zona::all(); // Obtener todas las zonas desde la base de datos
        return view('ejecutivos.create', compact('zonas')); // Pasar las zonas a la vista
    }
}

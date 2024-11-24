<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use App\Models\Ejecutivo;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    // Listar todos los servicios
    public function index()
    {
        return Servicio::all();
    }

    // Crear un nuevo servicio
    public function store(Request $request)
    {
        return Servicio::create($request->all());
    }

    // Mostrar un servicio específico
    public function show($id)
    {
        return Servicio::find($id);
    }

    // Actualizar un servicio
    public function update(Request $request, $id)
    {
        $servicio = Servicio::find($id);
        $servicio->update($request->all());
        return $servicio;
    }

    // Eliminar un servicio
    public function destroy($id)
    {
        $servicio = Servicio::findOrFail($id);
        $servicio->delete();
        return response()->json(['message' => 'Servicio eliminado correctamente']);
    }

    // Crear un nuevo servicio (Vista si usas Blade)
    public function create()
    {
        $ejecutivos = Ejecutivo::all(); // Obtener todos los ejecutivos para asociar
        return view('servicios.create', compact('ejecutivos')); // Pasar ejecutivos a la vista
    }
}

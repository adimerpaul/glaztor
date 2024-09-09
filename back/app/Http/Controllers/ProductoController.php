<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    function index(){
        return Producto::all();
    }
    public function store(Request $request)
            {
                $validatedData = $request->validate([
                    'categoria_pro' => 'required|string',
                    'marca_pro' => 'required|string',
                    'nombre_pro' => 'required|string',
                    'descripcion_pro' => 'nullable|string',
                    'precio_pro' => 'nullable|integer',
                    'foto_pro' => 'nullable|string', // Espera una cadena base64
                    'estado_pro' => 'required|string',
                ]);

                $producto = new Producto($validatedData);

                if (isset($validatedData['foto_pro'])) {
                    $fotoData = explode(',', $validatedData['foto_pro']);
                    $fotoBase64 = $fotoData[1]; // La parte base64
                    $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0]; // Obtener la extensión

                    $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
                    Storage::put($fotoPath, base64_decode($fotoBase64));
                    $producto->foto_pro = Storage::url($fotoPath);
                }

                $producto->save();
                return response()->json($producto, 201);
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

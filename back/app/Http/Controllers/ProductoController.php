<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    function index(){
        $productos= Producto::all();
        $productos->map(function ($producto) {
            if ($producto->foto_pro === null) {
                $producto->foto_pro = '/storage/fotos/default.png';
            }
            return $producto;
        });
        return $productos;
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
        $fotoPro = $request->foto_pro;
        unset($request['foto_pro']);
        if (strpos($fotoPro, 'fotos') === false) {
            error_log('No es fotos');
            $fotoData = explode(',', $fotoPro);
            $fotoBase64 = $fotoData[1]; // La parte base64
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0]; // Obtener la extensión

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
            error_log($fotoPath);
            $request['foto_pro'] = Storage::url($fotoPath);
        }
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());
        if ($producto->foto_pro === null) {
            $producto->foto_pro = '/storage/fotos/default.png';
        }
        return $producto;
    }
    function destroy($id){
        $producto = Producto::findOrFail($id);
        $producto->delete();
        return $producto;
    }
}

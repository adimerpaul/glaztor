<?php

namespace App\Http\Controllers;

use App\Models\ProductoCemento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoCementoController extends Controller{
    function index(){
        return ProductoCemento::all();
    }
    function update(Request $request, $id)
    {
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
        $producto = ProductoCemento::findOrFail($id);
        $producto->update($request->all());
        if ($producto->foto_pro === null) {
            $producto->foto_pro = '/storage/fotos/default.png';
        }
        return $producto;
    }
    function productosCementoActivo(){
        return ProductoCemento::where('estado', 'Activo')->get();
    }
    function store(Request $request){
        $validatedData = $request->validate([
            'foto' => 'required|string',
            // Add other validation rules as needed
        ]);

        $producto = new ProductoCemento($request->all());

        if (isset($validatedData['foto'])) {
            $fotoData = explode(',', $validatedData['foto']);
            $fotoBase64 = $fotoData[1]; // La parte base64
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0]; // Obtener la extensión

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
            $producto->foto = Storage::url($fotoPath);
        }

        $producto->save();
        return $producto;
    }
    function destroy($id)
    {
        $producto = ProductoCemento::findOrFail($id);
        $producto->delete();
        return $producto;
    }
}

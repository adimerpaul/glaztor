<?php

namespace App\Http\Controllers;

use App\Models\ProductoCemento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductoCementoController extends Controller{
    function index(){
        return ProductoCemento::all();
    }
    function productosCementoActivo(){
        return ProductoCemento::where('estado', 'ACTIVO')->get();
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
            $producto->foto_pro = Storage::url($fotoPath);
        }

        $producto->save();
    }
}

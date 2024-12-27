<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClienteController extends Controller
{
    function index(){
        return Cliente::orderBy('id', 'desc')->get();
    }

    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        if (isset($request->foto)) {
            $fotoData = explode(',', $request->foto);
            $fotoBase64 = $fotoData[1]; // La parte base64
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0]; // Obtener la extensión

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
//            $producto->foto_pro = Storage::url($fotoPath);
            $request->merge(['foto' => Storage::url($fotoPath)]);
        }
        return Cliente::create($request->all());
    }


    function show($id){
        return Cliente::findOrFail($id);
    }
    function update(Request $request, $id){
        $cliente = Cliente::findOrFail($id);
        $cliente->update($request->all());
        return $cliente;
    }
    function destroy($id){
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();
        return $cliente;
    }
}

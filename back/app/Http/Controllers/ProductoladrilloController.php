<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Productoladrillo;
use Illuminate\Support\Facades\Storage;

class ProductoladrilloController extends Controller
{
    function index()
    {
        $productoladrillos = Productoladrillo::all();
        $productoladrillos->map(function ($productoladrillo) {
            if ($productoladrillo->foto_pro === null) {
                $productoladrillo->foto_pro = '/storage/fotos/default.png';
            }
            return $productoladrillo;
        });
        return $productoladrillos;
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
            'precio_compra' => 'nullable|integer',
            'cantidad_pro' => 'nullable|integer',
            'tonelada' => 'nullable|string',
        ]);

        $productoladrillo = new Productoladrillo($validatedData);

        if (isset($validatedData['foto_pro'])) {
            $fotoData = explode(',', $validatedData['foto_pro']);
            $fotoBase64 = $fotoData[1]; // La parte base64
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0]; // Obtener la extensión

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
            $productoladrillo->foto_pro = Storage::url($fotoPath);
        }

        $productoladrillo->save();
        return response()->json($productoladrillo, 201);
    }

    function show($id)
    {
        return Productoladrillo::findOrFail($id);
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
        $productoladrillo = Productoladrillo::findOrFail($id);
        $productoladrillo->update($request->all());
        if ($productoladrillo->foto_pro === null) {
            $productoladrillo->foto_pro = '/storage/fotos/default.png';
        }
        return $productoladrillo;
    }

    function destroy($id)
    {
        $productoladrillo = Productoladrillo::findOrFail($id);
        $productoladrillo->delete();
        return $productoladrillo;
    }


}

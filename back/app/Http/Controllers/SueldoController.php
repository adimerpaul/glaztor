<?php

namespace App\Http\Controllers;

use App\Models\Sueldo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SueldoController extends Controller
{
    // Obtener todos los registros de sueldos
    public function index()
    {
        $sueldos = Sueldo::all();

        // Si un sueldo no tiene foto, asignar una foto por defecto
        $sueldos->map(function ($sueldo) {
            if ($sueldo->foto === null) {
                $sueldo->foto = '/storage/fotos/default.png';
            }
            return $sueldo;
        });

        return response()->json($sueldos, 200);
    }

    // Crear un nuevo registro de sueldo
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tipo' => 'required|string',
            'nombre_completo' => 'required|string',
            'ci' => 'required|string|unique:sueldos',
            'cargo' => 'required|string',
            'fecha_ingreso' => 'required|date',
            'haber_basico' => 'required|numeric',
            'monto_acumulado' => 'nullable|numeric',
            'descuento_afp' => 'nullable|numeric',
            'descuento_seguro' => 'nullable|numeric',
            'descuento_solidario' => 'nullable|numeric',
            'descuento_otros' => 'nullable|numeric',
            'total_descuentos_lab' => 'nullable|numeric',
            'total_liquido' => 'nullable|numeric',
            'descuento_rc_iva' => 'nullable|numeric',
            'descuento_anticipo' => 'nullable|numeric',
            'total_descuentos' => 'nullable|numeric',
            'liquido_pagable' => 'nullable|numeric',
            'foto' => 'nullable|string', // Imagen en formato base64
            'user_id' => 'nullable|exists:users,id',
        ]);

        $sueldo = new Sueldo($validatedData);

        // Guardar la foto si está presente
        if (isset($validatedData['foto'])) {
            $fotoData = explode(',', $validatedData['foto']);
            $fotoBase64 = $fotoData[1];
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0];

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
            $sueldo->foto = Storage::url($fotoPath);
        }

        $sueldo->save();

        return response()->json($sueldo, 201);
    }

    // Mostrar un sueldo específico
    public function show($id)
    {
        $sueldo = Sueldo::findOrFail($id);

        if ($sueldo->foto === null) {
            $sueldo->foto = '/storage/fotos/default.png';
        }

        return response()->json($sueldo, 200);
    }

    // Actualizar un registro de sueldo existente
    public function update(Request $request, $id)
    {
        $sueldo = Sueldo::findOrFail($id);

        $validatedData = $request->validate([
            'nombre_completo' => 'nullable|string',
            'ci' => 'nullable|string|unique:sueldos,ci,' . $id,
            'cargo' => 'nullable|string',
            'fecha_ingreso' => 'nullable|date',
            'haber_basico' => 'nullable|numeric',
            'monto_acumulado' => 'nullable|numeric',
            'descuento_afp' => 'nullable|numeric',
            'descuento_seguro' => 'nullable|numeric',
            'descuento_solidario' => 'nullable|numeric',
            'descuento_otros' => 'nullable|numeric',
            'total_descuentos_lab' => 'nullable|numeric',
            'total_liquido' => 'nullable|numeric',
            'descuento_rc_iva' => 'nullable|numeric',
            'descuento_anticipo' => 'nullable|numeric',
            'total_descuentos' => 'nullable|numeric',
            'liquido_pagable' => 'nullable|numeric',
            'foto' => 'nullable|string', // Imagen en formato base64
            'user_id' => 'nullable|exists:users,id',
        ]);

        // Si se actualiza la foto
        if (isset($validatedData['foto']) && strpos($validatedData['foto'], 'fotos') === false) {
            $fotoData = explode(',', $validatedData['foto']);
            $fotoBase64 = $fotoData[1];
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0];

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
            $validatedData['foto'] = Storage::url($fotoPath);
        }

        $sueldo->update($validatedData);

        return response()->json($sueldo, 200);
    }

    // Eliminar un registro de sueldo
    public function destroy($id)
    {
        $sueldo = Sueldo::findOrFail($id);
        $sueldo->delete();

        return response()->json(['message' => 'Sueldo eliminado con éxito'], 200);
    }
}

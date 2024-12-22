<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class ReporteController extends Controller{
    function reporteVentas(Request $request){
        $fechaInicio = $request->fechaInicioVentas;
        $fechaFin = $request->fechaFinVentas;

        $ventas = Pedido::selectRaw('user_id, SUM(total) as total_ventas')
            ->where('estado', 'ENTREGADO')
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->groupBy('user_id')
            ->with('user')
            ->get();

        return response()->json($ventas);
    }
}

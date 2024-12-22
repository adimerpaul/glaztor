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
    function reporteDeudas(Request $request)
    {
        $fechaInicio = $request->fechaInicioDeudas;
        $fechaFin = $request->fechaFinDeudas;

        $deudas = Pedido::selectRaw('cliente_id, SUM(total - COALESCE((SELECT SUM(monto) FROM pagos WHERE pagos.pedido_id = pedidos.id), 0)) as total_deuda')
            ->where('estado', 'ENTREGADO')
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->havingRaw('SUM(total - COALESCE((SELECT SUM(monto) FROM pagos WHERE pagos.pedido_id = pedidos.id), 0)) > 0') // Solo incluir si hay deudas
            ->groupBy('cliente_id')
            ->with('cliente')
            ->get();
//         del cleinte solo el primero string y en minusculas
        $deudas->map(function($deuda){
            $deuda->cliente->nombre = strtolower(explode(' ', $deuda->cliente->nombre_cliente)[0]);
            return $deuda;
        });

        return response()->json($deudas);
    }
}

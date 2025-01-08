<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\Request;

class ResumenController extends Controller{
    function ingresoVentas(Request $request){
        $validar = $request->validate([
            'fechaInicio' => 'required',
            'fechaFin' => 'required'
        ]);
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        $pedidos = Pedido::where('estado', 'ENTREGADO')
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->with('detalles')
            ->get();
        $productos = [];
        foreach ($pedidos as $pedido) {
            $detalle = $pedido->detalles;
            foreach ($detalle as $item) {
//                $find = array_search($item->producto, array_column($productos, 'producto'));
//                if ($find !== false) {
//                    $productos[$find]['cantidad'] += $item->cantidad;
//                } else {
//                    $productoFind = Producto::find($item->producto_id);
//                    $productos[] = [
//                        'producto' => $item->producto,
//                        'cantidad' => $item->cantidad,
//                        'precio' => $productoFind->precio_pro
//                    ];
//                }
                $productos[] = [
                    'producto' => $item->producto,
                    'cantidad' => $item->cantidad,
                    'precio' => $item->precio
                ];
            }
        }

        $productosCosto = [];
//        foreach ($pedidos as $pedido) {
//            $detalle = $pedido->detalle;
//            foreach ($detalle as $item) {
//                $producto = $item->producto;
//                $precio = $item->precio_compra;
//                $cantidad = $item->cantidad;
//                if (array_key_exists($producto->nombre, $productosCosto)) {
//                    $productosCosto[$producto->nombre]['cantidad'] += $cantidad;
//                } else {
//                    $productosCosto[$producto->nombre] = [
//                        'cantidad' => $cantidad,
//                        'precio' => $precio
//                    ];
//                }
//            }
//        }
        return [
            'resumenVentas' => $productos,
            'resumenCostos' => $productosCosto
        ];
    }
}

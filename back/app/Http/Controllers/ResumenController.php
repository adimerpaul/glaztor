<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Producto;
use App\Models\Servicio;
use App\Models\Sueldo;
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
                $productos[] = [
                    'producto' => $item->producto,
                    'cantidad' => $item->cantidad,
                    'precio' => $item->precio
                ];
            }
        }
        $productosCosto = [];
        foreach ($pedidos as $pedido) {
            $detalle = $pedido->detalles;
            foreach ($detalle as $item) {
                $productosCosto[] = [
                    'producto' => $item->producto,
                    'cantidad' => $item->cantidad,
                    'precio' => $item->precio_compra
                ];
            }
        }

        $servicios = Servicio::whereBetween('fecha_pago', [$fechaInicio, $fechaFin])->get();
        $sueldos = Sueldo::whereBetween('sueldo_correspondiente', [$fechaInicio, $fechaFin])->get();

        $servicosSueldos = [];
        for ($i=0; $i < count($servicios); $i++) {
            $servicosSueldos[] = [
                'servicio' => $servicios[$i]->nombre_servicio,
                'monto' => $servicios[$i]->monto_cancelado
            ];
        }
        for ($i=0; $i < count($sueldos); $i++) {
            $servicosSueldos[] = [
                'servicio' => $sueldos[$i]->nombre_completo,
                'monto' => $sueldos[$i]->liquido_pagable
            ];
        }

        return [
            'resumenVentas' => $productos,
            'resumenCostos' => $productosCosto,
            'resumenServicios' => $servicosSueldos
        ];
    }
}

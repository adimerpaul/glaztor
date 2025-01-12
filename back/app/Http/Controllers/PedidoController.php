<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Detalle;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\Request;

class PedidoController extends Controller{
    function pedidosEntregados(Request $request){
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        return Pedido::with('detalles.producto')
            ->with('pagos.user')
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->where('estado', 'ENTREGADO')
            ->orderBy('id', 'desc')
            ->get();
    }
    function index(Request $request){
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        return Pedido::with('detalles.producto','user')
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->orderBy('id', 'desc')
            ->get();
    }
    function store(Request $request){

        foreach ($request->detalles as $detalle){
            $producto = Producto::find($detalle['id']);
            if ($detalle['tipo_pro'] == 'BA'){
                if($producto->cantidad_pro < $detalle['cantidadVenta']){
                    return response()->json(['message' => 'No hay suficiente cantidad de '.$producto->nombre_pro], 400);
                }
            }
            if ($detalle['tipo_pro'] == 'TN'){
                $cantidad = $detalle['cantidadVenta'] * $producto->tonelada;
                if($producto->cantidad_pro < $cantidad){
                    return response()->json(['message' => 'No hay suficiente cantidad de '.$producto->nombre_pro], 400);
                }
            }
        }

        $cliente = Cliente::find($request->cliente_id);
        $user = $request->user();
        $pedido = new Pedido();
        $pedido->fecha = $request->fecha_hora;
        $pedido->tipo = $cliente->tipo_cliente;
        $pedido->cliente = $cliente->nombre_cliente;
        $pedido->producto = null;
        $pedido->cantidad = null;
        $pedido->precio = null;
        $pedido->factura = '';
        $pedido->nombre_factura = $request->nombre_factura;
        $pedido->nit_factura = $request->nit_factura;
        $pedido->direccion = $request->direccion;
        $pedido->contacto = $request->contacto;
        $pedido->telefono = $request->telefono;
        $pedido->telefono2 = $request->telefono2;
        $pedido->observacion = $request->observacion;
        $pedido->chofer = '';
        $pedido->fecha_pago = $request->fecha_pago;
        $pedido->user_id = $user->id;
        $pedido->cliente_id = $request->cliente_id;
        $pedido->zona = $request->zona_id;
        $pedido->save();
        $tol = 0;
        $textProducto = '';
        foreach ($request->detalles as $detalle){
            $producto = Producto::find($detalle['id']);
            $detalleSave = new Detalle();
            $detalleSave['pedido_id'] = $pedido->id;
            $detalleSave['user_id'] = $user->id;
            $detalleSave['producto'] = $producto->nombre_pro;
            $detalleSave['producto_id'] = $producto->id;
//            $detalleSave['cantidad'] = $detalle['cantidadVenta'];
            $detalleSave['precio'] = $detalle['precioVenta'];
            $detalleSave['precio_compra'] = $producto->precio_compra;


            if ($detalle['tipo_pro'] == 'BA'){
                $producto->cantidad_pro -= $detalle['cantidadVenta'];
                $tol += $detalle['cantidadVenta'] * $detalle['precioVenta'];
                $detalleSave['cantidad'] = $detalle['cantidadVenta'];
            }
            if ($detalle['tipo_pro'] == 'TN'){
                $cantidad = $detalle['cantidadVenta'] * $producto->tonelada;
                $producto->cantidad_pro -= $cantidad;
                $tol += $cantidad * $detalle['precioVenta'];
                $detalleSave['cantidad'] = $cantidad;
            }
            $detalleSave->save();
            $producto->save();
            $textProducto .= $detalle['cantidadVenta'].' '.$producto->nombre_pro.' '.$producto->unidad.' ,';
        }
        $textProducto = substr($textProducto, 0, -1);
        $pedido->total = $tol;
        $pedido->producto = $textProducto;
        $pedido->save();
        return Pedido::with('detalles')->find($pedido->id);
    }
    function show($id){
        return Pedido::find($id);
    }
    function update(Request $request, $id){
        $pedido = Pedido::find($id);
        $estado = $request->estado;
        error_log($estado);
        $pedido->update($request->all());
        return $pedido;
    }
    function destroy($id){
        $pedido = pedido::findOrFail($id);
        $pedido->delete();
        return $pedido;
    }
}

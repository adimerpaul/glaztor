<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\PagoCemento;
use App\Models\PedidoCemento;
use App\Models\PedidoCementoDetalle;
use App\Models\ProductoCemento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoCementoController extends Controller{
    function updatePagoCemento(Request $request, $id){
        $pago = PagoCemento::find($id);
        $pago->monto = $request->monto;
        $pago->forma_pago = $request->forma_pago;
        $pago->numero_recibo = $request->numero_recibo;
        $pago->fecha_pago = $request->fecha_pago;
        $pago->hora_pago = now();
        $pago->banco = $request->banco;
        $pago->observacion = $request->observacion;
        $pago->save();
        return PagoCemento::with('user')->find($pago->id);
    }
    function pagosCemento(Request $request){
        $user = $request->user();
        $pago = new PagoCemento();
        $pago->pedido_id = $request->pedido_id;
        $pago->user_id = $user->id;
        $pago->monto = $request->monto;
        $pago->forma_pago = $request->forma_pago;
        $pago->numero_recibo = $request->numero_recibo;
        $pago->fecha_pago = $request->fecha_pago;
        $pago->hora_pago = now();
        $pago->banco = $request->banco;
        $pago->observacion = $request->observacion;
        $pago->save();
        return PagoCemento::with('user')->find($pago->id);
    }
    function pedidosEntregados(Request $request){
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        $search = $request->filter;
        return PedidoCemento::with('detalles.producto','user')
            ->with('pagos.user')
            ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->where('cliente', 'like', '%'.$search.'%')
            ->whereRaw('(estado = "ENTREGADO" OR estado = "REZAGO")')
            ->orderBy('id', 'desc')
            ->get();
    }
    function index(Request $request){
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        return PedidoCemento::with('detalles.producto','user')
        ->whereBetween('fecha', [$fechaInicio, $fechaFin])
            ->orderBy('id', 'desc')
            ->get();
    }
    function store(Request $request){

        foreach ($request->detalles as $detalle){
            $producto = ProductoCemento::find($detalle['id']);
            if ($detalle['tipo_pro'] == 'BA'){
                if($producto->cantidad < $detalle['cantidadVenta']){
                    return response()->json(['message' => 'No hay suficiente cantidad de '.$producto->nombre], 400);
                }
            }
            if ($detalle['tipo_pro'] == 'TN'){
                $cantidad = $detalle['cantidadVenta'] * $producto->tonelada;
                if($producto->cantidad < $cantidad){
                    return response()->json(['message' => 'No hay suficiente cantidad de '.$producto->nombre], 400);
                }
            }
        }
        $cliente = Cliente::find($request->cliente_id);
        $user = $request->user();
        $pedido = new PedidoCemento();
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
        $pedido->trailer = $request->trailer;
        $pedido->save();
        $tol = 0;
        $textProducto = '';
        foreach ($request->detalles as $detalle){
            $producto = ProductoCemento::find($detalle['id']);
            $detalleSave = new PedidoCementoDetalle();
            $detalleSave['pedido_id'] = $pedido->id;
            $detalleSave['user_id'] = $user->id;
            $detalleSave['producto'] = $producto->nombre_pro;
            $detalleSave['producto_id'] = $producto->id;
//            $detalleSave['cantidad'] = $detalle['cantidadVenta'];
            $detalleSave['precio'] = $detalle['precioVenta'];
            $detalleSave['precio_compra'] = $producto->precio_compra;

            if ($detalle['tipo_pro'] == 'BA'){
                $producto->cantidad -= $detalle['cantidadVenta'];
                $tol += $detalle['cantidadVenta'] * $detalle['precioVenta'];
                $detalleSave['cantidad'] = $detalle['cantidadVenta'];
            }
            if ($detalle['tipo_pro'] == 'TN'){
                $cantidad = $detalle['cantidadVenta'] * $producto->tonelada;
                $producto->cantidad -= $cantidad;
                $tol += $cantidad * $detalle['precioVenta'];
                $detalleSave['cantidad'] = $cantidad;
            }
            $detalleSave->save();
            $trailer = $request->trailer;
            if ($trailer == 'LOCAL' || $trailer == 'OTRO'){
                $producto->save();
            }
            $textProducto .= $detalle['cantidadVenta'].' '.$producto->nombre_pro.' '.$producto->unidad.' ,';
        }
        $textProducto = substr($textProducto, 0, -1);
        $pedido->total = $tol;
        $pedido->producto = $textProducto;
        $pedido->save();
        return PedidoCemento::with('detalles')->find($pedido->id);
    }
    function show($id){
        return PedidoCemento::find($id);
    }
    function updateOld(Request $request, $id){
        $pedido = PedidoCemento::find($id);
        $estado = $request->estado;
        if ($estado == 'ENTREGADO' || $estado == 'REZAGO'){
            $detalles = PedidoCementoDetalle::where('pedido_id', $pedido->id)->get();
            foreach ($detalles as $detalle){
                $producto = ProductoCemento::find($detalle->producto_id);
                $producto->cantidad = $producto->cantidad - $detalle->cantidad;
                $producto->save();
            }
        }

        $pedido->update($request->all());
        return $pedido;
    }
    function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $pedido = PedidoCemento::findOrFail($id);
            $estadoAnterior = $pedido->estado;
            $nuevoEstado = $request->estado;

            $pedido->update($request->only([
                'cliente', 'direccion', 'estado', 'fecha', 'total', // y los campos que correspondan
            ]));

            // ⚠️ Solo si el estado cambia a ENTREGADO o REZAGO y no estaba antes así
            if (in_array($nuevoEstado, ['ENTREGADO', 'REZAGO']) && $estadoAnterior !== $nuevoEstado) {
                $detalles = PedidoCementoDetalle::where('pedido_id', $pedido->id)->get();
                foreach ($detalles as $detalle) {
                    $producto = ProductoCemento::find($detalle->producto_id);
                    if ($producto) {
                        $producto->cantidad -= $detalle->cantidad;
                        $producto->save();
                    }
                }
            }

            // Si deseas permitir actualizar los detalles (opcional):
            if ($request->has('detalles')) {
                PedidoCementoDetalle::where('pedido_id', $pedido->id)->delete();

                foreach ($request->detalles as $detalle) {
                    PedidoCementoDetalle::create([
                        'pedido_id' => $pedido->id,
                        'producto_id' => $detalle['producto_id'],
                        'cantidad' => $detalle['cantidad'],
                        'precio' => $detalle['precio'],
                        // otros campos si tienes
                    ]);
                }
            }

            DB::commit();
            return response()->json($pedido->load('detalles'));

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al actualizar el pedido', 'message' => $e->getMessage()], 500);
        }
    }
    function destroy($id){
        $pedido = PedidoCemento::findOrFail($id);
        $pedido->delete();
        return $pedido;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Detalle;
use App\Models\Pedido;
use App\Models\Producto;
use Illuminate\Http\Request;

class PedidoController extends Controller{
    function index(){
        return Pedido::all();
    }
    function store(Request $request){
        $cliente = Cliente::find($request->cliente_id);
        $user = $request->user();

        $pedido = new Pedido();
        $pedido->fecha_hora = $request->fecha_hora;
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
        $pedido->zona = $request->zona;
        $pedido->save();
        foreach ($request->detalles as $detalle){
            $producto = Producto::find($detalle['id']);
            $detalle = new Detalle();
            $detalle['pedido_id'] = $pedido->id;
            $detalle['user_id'] = $user->id;
            $detalle['producto'] = $producto->nombre;
            $detalle['cantidad'] = $detalle['cantidadVenta'];
            $detalle['precio'] = $detalle['precioVenta'];
            $detalle->save();
        }
        return Pedido::with('detalles')->find($pedido->id);
    }
    function show($id){
        return Pedido::find($id);
    }
    function update(Request $request, $id){
        $pedido = Pedido::find($id);
        $pedido->update($request->all());
        return $pedido;
    }
    function destroy($id){
        $pedido = pedido::findOrFail($id);
        $pedido->delete();
        return $pedido;
    }
}

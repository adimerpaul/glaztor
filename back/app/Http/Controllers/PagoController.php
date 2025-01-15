<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller{
    function store(Request $request){
        $user = $request->user();
        $pago = new Pago();
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
        return Pago::with('user')->find($pago->id);
    }
    function update(Request $request, $id){
        $pago = Pago::find($id);
        $pago->monto = $request->monto;
        $pago->forma_pago = $request->forma_pago;
        $pago->numero_recibo = $request->numero_recibo;
        $pago->fecha_pago = $request->fecha_pago;
        $pago->hora_pago = now();
        $pago->banco = $request->banco;
        $pago->observacion = $request->observacion;
        $pago->save();
        return Pago::with('user')->find($pago->id);
    }
}

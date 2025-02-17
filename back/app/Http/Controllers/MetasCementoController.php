<?php

namespace App\Http\Controllers;

use App\Models\MetasCemento;
use App\Models\MetasUserCemento;
use App\Models\MetaUser;
use App\Models\PedidoCementoDetalle;
use App\Models\ProductoCemento;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MetasCementoController extends Controller{
    function index(){
        return MetasCemento::with('users')->get();
    }
    function store(Request $request){
        $mes = $request->mes;
        $anio = $request->anio;
        $user_id = $request->user_id;

        $meta = $this->getMeta($mes, $anio);
        error_log($meta);

        $metaUser = New MetasUserCemento();
        $metaUser->user_id = $user_id;
        $metaUser->meta_id = $meta->id;
        $metaUser->meta = 0;

        $search = MetasUserCemento::where('user_id', $user_id)->where('meta_id', $meta->id)->first();
        if($search != null){
            return response()->json(['message' => 'Ya existe la meta para este usuario'], 400);
        }


        $metaUser->save();
    }
    function getMeta($mes, $anio){
        $meta = MetasCemento::where('mes', $mes)->where('anio', $anio)->first();
        if($meta == null){
            $meta = new MetasCemento();
            $meta->mes = $mes;
            $meta->anio = $anio;
            $meta->meta = 0;
            $meta->save();
        }
        return $meta;
    }
    function show($id){
        $user = MetasUserCemento::with('users')->find($id);
        $mes = $user->mes;
        $anio = $user->anio;
        $mesNumber = $this->getMesNumber($mes);
        $fechaInicio = Carbon::createFromDate($anio, $mesNumber, 1)->toDateString();
        $fechaFin = Carbon::createFromDate($anio, $mesNumber, 1)->endOfMonth()->toDateString();
        $productosAll = ProductoCemento::all();
        foreach ($user->users as $metaUser) {
            error_log($metaUser->id);
            $detalles = PedidoCementoDetalle::where('user_id', $metaUser->id)
                ->whereBetween('created_at', [$fechaInicio, $fechaFin])
                ->select('producto_id', DB::raw('SUM(cantidad) as total_cantidad'))
                ->groupBy('producto_id')
                ->get();
            error_log($detalles);
            $sumaToneladas = 0;
            foreach ($detalles as $detalle) {
                $producto = $productosAll->where('id', $detalle->producto_id)->first();
                $totalCantidad = $detalle->total_cantidad;
                $tonelada = $producto->tonelada;

                $sumaToneladas += $totalCantidad / $tonelada;
            }
            $metaUser->sumaToneladas = number_format($sumaToneladas, 2, '.', '');
        }
        return $user;
    }
    function getMesNumber($mes){
        $meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return array_search($mes, $meses)+1;
    }
    function update(Request $request, $id){
        $userMeta = MetasUserCemento::where('user_id', $request->user_id)->where('meta_id', $id)->first();
        $userMeta->meta = $request->meta;
        $userMeta->save();

        $sumaMetas= MetasUserCemento::where('meta_id', $id)->sum('meta');

        $meta = MetaUser::find($id);
        $meta->meta = $sumaMetas;
        $meta->save();

        return $userMeta;
    }
}

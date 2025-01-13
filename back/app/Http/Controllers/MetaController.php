<?php

namespace App\Http\Controllers;

use App\Models\Detalle;
use App\Models\Meta;
use App\Models\MetaUser;
use App\Models\Pedido;
use App\Models\Producto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MetaController extends Controller{
    function index(){
        return Meta::with('users')->get();
    }
    function store(Request $request){
        $mes = $request->mes;
        $anio = $request->anio;
        $user_id = $request->user_id;

        $meta = $this->getMeta($mes, $anio);

        $metaUser = New MetaUser();
        $metaUser->user_id = $user_id;
        $metaUser->meta_id = $meta->id;
        $metaUser->meta = 0;

        $search = MetaUser::where('user_id', $user_id)->where('meta_id', $meta->id)->first();
        if($search != null){
            return response()->json(['message' => 'Ya existe la meta para este usuario'], 400);
        }


        $metaUser->save();
    }
    function getMeta($mes, $anio){
        $meta = Meta::where('mes', $mes)->where('anio', $anio)->first();
        if($meta == null){
            $meta = new Meta();
            $meta->mes = $mes;
            $meta->anio = $anio;
            $meta->meta = 0;
            $meta->save();
        }
        return $meta;
    }
    function show($id){
        $user = Meta::with('users')->find($id);
        $mes = $user->mes;
        $anio = $user->anio;
        $mesNumber = $this->getMesNumber($mes);
        $fechaInicio = Carbon::createFromDate($anio, $mesNumber, 1)->toDateString();
        $fechaFin = Carbon::createFromDate($anio, $mesNumber, 1)->endOfMonth()->toDateString();
        $productosAll = Producto::all();
        foreach ($user->users as $metaUser) {
            error_log($metaUser->id);
            $detalles = Detalle::where('user_id', $metaUser->id)
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
            $metaUser->sumaToneladas = $sumaToneladas;
        }
        return $user;
    }
    function getMesNumber($mes){
        $meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return array_search($mes, $meses)+1;
    }
}

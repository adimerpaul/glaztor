<?php

use App\Http\Controllers\PagoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PreventaController;
use App\Http\Controllers\PreventacementoController;
use App\Http\Controllers\PreventaladrilloController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\CotizacioncementoController;
use App\Http\Controllers\CotizacionladrilloController;

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EjecutivoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProductoladrilloController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\ZonaController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\CajaChicaController;
use App\Http\Controllers\SueldoController;
use App\Http\Controllers\NewservicioController;




use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [App\Http\Controllers\UserController::class, 'logout']);
    Route::get('/me', [App\Http\Controllers\UserController::class, 'me']);

    Route::get('users', [App\Http\Controllers\UserController::class, 'index']);
    Route::post('users', [App\Http\Controllers\UserController::class, 'store']);
    Route::get('users/{id}', [App\Http\Controllers\UserController::class, 'show']);
    Route::put('users/{id}', [App\Http\Controllers\UserController::class, 'update']);
    Route::delete('users/{id}', [App\Http\Controllers\UserController::class, 'destroy']);
    Route::put('/updatePassword/{user}', [App\Http\Controllers\UserController::class, 'updatePassword']);

    Route::get('pedidos', [PedidoController::class, 'index']);
    Route::get('pedidosEntregados', [PedidoController::class, 'pedidosEntregados']);
    Route::post('pedidos', [PedidoController::class, 'store']);
    Route::get('pedidos/{id}', [PedidoController::class, 'show']);
    Route::put('pedidos/{id}', [PedidoController::class, 'update']);
    Route::delete('pedidos/{id}', [PedidoController::class, 'destroy']);

    Route::post('pagos', [PagoController::class, 'store']);
    Route::put('pagos/{id}', [PagoController::class, 'update']);

    Route::get('pedidotrailers', [PedidoController::class, 'index']);
    Route::post('pedidotrailers', [PedidoController::class, 'store']);
    Route::get('pedidotrailers/{id}', [PedidoController::class, 'show']);
    Route::put('pedidotrailers/{id}', [PedidoController::class, 'update']);
    Route::delete('pedidotrailers/{id}', [PedidoController::class, 'destroy']);

    Route::get('clientes', [ClienteController::class, 'index']);
    Route::post('clientes', [ClienteController::class, 'store']);
    Route::get('clientes/{id}', [ClienteController::class, 'show']);
    Route::put('clientes/{id}', [ClienteController::class, 'update']);
    Route::delete('clientes/{id}', [ClienteController::class, 'destroy']);

    Route::get('ejecutivos', [EjecutivoController::class, 'index']);
    Route::post('ejecutivos', [EjecutivoController::class, 'store']);
    Route::get('ejecutivos/{id}', [EjecutivoController::class, 'show']);
    Route::put('ejecutivos/{id}', [EjecutivoController::class, 'update']);
    Route::delete('ejecutivos/{id}', [EjecutivoController::class, 'destroy']);

    Route::get('preventas', [PreventaController::class, 'index']);
    Route::post('preventas', [PreventaController::class, 'store']);
    Route::get('preventas/{id}', [PreventaController::class, 'show']);
    Route::put('preventas/{id}', [PreventaController::class, 'update']);
    Route::delete('preventas/{id}', [PreventaController::class, 'destroy']);



    Route::get('cotizacions', [CotizacionController::class, 'index']);
    Route::post('cotizacions', [CotizacionController::class, 'store']);
    Route::get('cotizacions/{id}', [CotizacionController::class, 'show']);
    Route::put('cotizacions/{id}', [CotizacionController::class, 'update']);
    Route::delete('cotizacions/{id}', [CotizacionController::class, 'destroy']);



    Route::get('productos', [ProductoController::class, 'index']);
    Route::post('productos', [ProductoController::class, 'store']);
    Route::get('productos/{id}', [ProductoController::class, 'show']);
    Route::put('productos/{id}', [ProductoController::class, 'update']);
    Route::delete('productos/{id}', [ProductoController::class, 'destroy']);

    Route::get('cargos', [CargoController::class, 'index']);
    Route::post('cargos', [CargoController::class, 'store']);
    Route::get('cargos/{id}', [CargoController::class, 'show']);
    Route::put('cargos/{id}', [CargoController::class, 'update']);
    Route::delete('cargos/{id}', [CargoController::class, 'destroy']);


    Route::get('zonas', [ZonaController::class, 'index']);
    Route::post('zonas', [ZonaController::class, 'store']);
    Route::get('zonas/{id}', [ZonaController::class, 'show']);
    Route::put('zonas/{id}', [ZonaController::class, 'update']);
    Route::delete('zonas/{id}', [ZonaController::class, 'destroy']);

    Route::get('regions', [RegionController::class, 'index']);
    Route::post('regions', [RegionController::class, 'store']);
    Route::get('regions/{id}', [RegionController::class, 'show']);
    Route::put('regions/{id}', [RegionController::class, 'update']);
    Route::delete('regions/{id}', [RegionController::class, 'destroy']);

    Route::get('servicios', [ServicioController::class, 'index']);
    Route::post('servicios', [ServicioController::class, 'store']);
    Route::get('servicios/{id}', [ServicioController::class, 'show']);
    Route::put('servicios/{id}', [ServicioController::class, 'update']);
    Route::delete('servicios/{id}', [ServicioController::class, 'destroy']);

    Route::get('newservicios', [NewservicioController::class, 'index']);
    Route::post('newservicios', [NewservicioController::class, 'store']);
    Route::get('newservicios/{id}', [NewservicioController::class, 'show']);
    Route::put('newservicios/{id}', [NewservicioController::class, 'update']);
    Route::delete('newservicios/{id}', [NewservicioController::class, 'destroy']);

    Route::get('cajachicas', [CajachicaController::class, 'index']);
    Route::post('cajachicas', [CajachicaController::class, 'store']);
    Route::put('cajachicas/{id}', [CajachicaController::class, 'update']);
    Route::delete('cajachicas/{id}', [CajachicaController::class, 'destroy']);


    Route::get('regions', [RegionController::class, 'index']);
    Route::post('regions', [RegionController::class, 'store']);
    Route::get('regions/{id}', [RegionController::class, 'show']);
    Route::put('regions/{id}', [RegionController::class, 'update']);
    Route::delete('regions/{id}', [RegionController::class, 'destroy']);


    Route::get('sueldos', [SueldoController::class, 'index']);
    Route::post('sueldos', [SueldoController::class, 'store']);
    Route::get('sueldos/{id}', [SueldoController::class, 'show']);
    Route::put('sueldos/{id}', [SueldoController::class, 'update']);
    Route::delete('sueldos/{id}', [SueldoController::class, 'destroy']);

    Route::post('reporteVentas', [\App\Http\Controllers\ReporteController::class, 'reporteVentas']);
    Route::post('reporteDeudas', [\App\Http\Controllers\ReporteController::class, 'reporteDeudas']);

    Route::post('ingresoVentas', [\App\Http\Controllers\ResumenController::class, 'ingresoVentas']);

    Route::get('metas', [\App\Http\Controllers\MetaController::class, 'index']);
    Route::get('metas/{id}', [\App\Http\Controllers\MetaController::class, 'show']);
    Route::post('metas', [\App\Http\Controllers\MetaController::class, 'store']);
    Route::put('metas/{id}', [\App\Http\Controllers\MetaController::class, 'update']);

    Route::get('metasCemento', [\App\Http\Controllers\MetasCementoController::class, 'index']);
    Route::get('metasCemento/{id}', [\App\Http\Controllers\MetasCementoController::class, 'show']);
    Route::post('metasCemento', [\App\Http\Controllers\MetasCementoController::class, 'store']);
    Route::put('metasCemento/{id}', [\App\Http\Controllers\MetasCementoController::class, 'update']);



    Route::get('preventacementos', [PreventacementoController::class, 'index']);
    Route::post('preventacementos', [PreventacementoController::class, 'store']);
    Route::get('preventacementos/{id}', [PreventacementoController::class, 'show']);
    Route::put('preventacementos/{id}', [PreventacementoController::class, 'update']);
    Route::delete('preventacementos/{id}', [PreventacementoController::class, 'destroy']);


    Route::get('cotizacioncementos', [CotizacioncementoController::class, 'index']);
    Route::post('cotizacioncementos', [CotizacioncementoController::class, 'store']);
    Route::get('cotizacioncementos/{id}', [CotizacioncementoController::class, 'show']);
    Route::put('cotizacioncementos/{id}', [CotizacioncementoController::class, 'update']);
    Route::delete('cotizacioncementos/{id}', [CotizacioncementoController::class, 'destroy']);


    Route::get('preventaladrillos', [PreventaladrilloController::class, 'index']);
    Route::post('preventaladrillos', [PreventaladrilloController::class, 'store']);
    Route::get('preventaladrillos/{id}', [PreventaladrilloController::class, 'show']);
    Route::put('preventaladrillos/{id}', [PreventaladrilloController::class, 'update']);
    Route::delete('preventaladrillos/{id}', [PreventaladrilloController::class, 'destroy']);


    Route::get('cotizacionladrillos', [CotizacionladrilloController::class, 'index']);
    Route::post('cotizacionladrillos', [CotizacionladrilloController::class, 'store']);
    Route::get('cotizacionladrillos/{id}', [CotizacionladrilloController::class, 'show']);
    Route::put('cotizacionladrillos/{id}', [CotizacionladrilloController::class, 'update']);
    Route::delete('cotizacionladrillos/{id}', [CotizacionladrilloController::class, 'destroy']);

    Route::get('productoladrillos', [ProductoladrilloController::class, 'index']);
    Route::post('productoladrillos', [ProductoladrilloController::class, 'store']);
    Route::get('productoladrillos/{id}', [ProductoladrilloController::class, 'show']);
    Route::put('productoladrillos/{id}', [ProductoladrilloController::class, 'update']);
    Route::delete('productoladrillos/{id}', [ProductoladrilloController::class, 'destroy']);




//    productosCementoActivo
    Route::get('productosCementoActivo', [\App\Http\Controllers\ProductoCementoController::class, 'productosCementoActivo']);



    Route::get('pedidosLadrillo', [\App\Http\Controllers\PedidoLadrilloController::class, 'index']);
    Route::get('pedidosLadrilloEntregados', [\App\Http\Controllers\PedidoLadrilloController::class, 'pedidosEntregados']);
    Route::post('pedidosLadrillo', [\App\Http\Controllers\PedidoLadrilloController::class, 'store']);
    Route::get('pedidosLadrillo/{id}', [\App\Http\Controllers\PedidoLadrilloController::class, 'show']);
    Route::put('pedidosLadrillo/{id}', [\App\Http\Controllers\PedidoLadrilloController::class, 'update']);
    Route::delete('pedidosLadrillo/{id}', [\App\Http\Controllers\PedidoLadrilloController::class, 'destroy']);



    Route::get('pedidosCemento', [\App\Http\Controllers\PedidoCementoController::class, 'index']);
    Route::get('pedidosCementoEntregados', [\App\Http\Controllers\PedidoCementoController::class, 'pedidosEntregados']);
    Route::post('pedidosCemento', [\App\Http\Controllers\PedidoCementoController::class, 'store']);
    Route::get('pedidosCemento/{id}', [\App\Http\Controllers\PedidoCementoController::class, 'show']);
    Route::put('pedidosCemento/{id}', [\App\Http\Controllers\PedidoCementoController::class, 'update']);
    Route::delete('pedidosCemento/{id}', [\App\Http\Controllers\PedidoCementoController::class, 'destroy']);

    Route::get('productocementos', [\App\Http\Controllers\ProductoCementoController::class, 'index']);
    Route::get('productosCementoEntregados', [\App\Http\Controllers\ProductoCementoController::class, 'pedidosEntregados']);
    Route::post('productoscemento', [\App\Http\Controllers\ProductoCementoController::class, 'store']);
    Route::get('productosCemento/{id}', [\App\Http\Controllers\ProductoCementoController::class, 'show']);
    Route::put('productosCemento/{id}', [\App\Http\Controllers\ProductoCementoController::class, 'update']);
    Route::delete('productosCemento/{id}', [\App\Http\Controllers\ProductoCementoController::class, 'destroy']);
    Route::get('pedidosCementoEntregados', [\App\Http\Controllers\PedidoCementoController::class, 'pedidosEntregados']);
    Route::post('pagosCemento', [\App\Http\Controllers\PedidoCementoController::class, 'pagosCemento']);
    Route::put('pagosCemento/{id}', [\App\Http\Controllers\PedidoCementoController::class, 'updatePagoCemento']);
});

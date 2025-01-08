<?php

use App\Http\Controllers\PagoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PreventaController;
use App\Http\Controllers\CotizacionController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EjecutivoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\ZonaController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\CajaChicaController;
use App\Http\Controllers\SueldoController;

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
});

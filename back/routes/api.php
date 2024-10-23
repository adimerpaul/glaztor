<?php

use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PreventaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EjecutivoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\ZonaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('pedidos', [PedidoController::class, 'index']);
Route::post('pedidos', [PedidoController::class, 'store']);
Route::get('pedidos/{id}', [PedidoController::class, 'show']);
Route::put('pedidos/{id}', [PedidoController::class, 'update']);
Route::delete('pedidos/{id}', [PedidoController::class, 'destroy']);

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
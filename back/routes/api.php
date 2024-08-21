<?php

use App\Http\Controllers\PedidoController;
use App\Http\Controllers\PreventaController;
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

Route::get('preventas', [PreventaController::class, 'index']);
Route::post('preventas', [PreventaController::class, 'store']);
Route::get('preventas/{id}', [PreventaController::class, 'show']);
Route::put('preventas/{id}', [PreventaController::class, 'update']);
Route::delete('preventas/{id}', [PreventaController::class, 'destroy']);

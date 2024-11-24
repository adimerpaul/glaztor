<?php

namespace App\Http\Controllers;
use App\Models\CajaChica;

use Illuminate\Http\Request;

class CajachicaController extends Controller
{
    public function index()
    {
        return CajaChica::all();
    }

    public function store(Request $request)
    {
        return CajaChica::create($request->all());
    }

    public function show($id)
    {
        return CajaChica::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $cajachica = CajaChica::findOrFail($id);
        $cajachica->update($request->all());
        return $cajachica;
    }

    public function destroy($id)
    {
        $cajachica = CajaChica::findOrFail($id);
        $cajachica->delete();
        return $cajachica;
    }
}

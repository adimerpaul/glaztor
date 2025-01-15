<?php
 

namespace App\Http\Controllers;
use App\Models\Ejecutivo;
use App\Models\Zona;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EjecutivoController extends Controller
{
    function index(){
        return Ejecutivo::all();
    }
    function store(Request $request){
        $user = $request->user();
        $request->merge(['user_id' => $user->id]);
        if (isset($request->foto)) {
            $fotoData = explode(',', $request->foto);
            $fotoBase64 = $fotoData[1]; // La parte base64
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0]; // Obtener la extensión

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
//            $producto->foto_pro = Storage::url($fotoPath);
            $request->merge(['foto' => Storage::url($fotoPath)]);
        }
        return Ejecutivo::create($request->all());
    }
    function show($id){
        return Ejecutivo::find($id);
    }
    function update(Request $request, $id){
        $ejecutivo = Ejecutivo::findOrFail($id);
        $fotoPro = $request->foto;
        unset($request['foto']);
        if ( $fotoPro!=null &&  strpos($fotoPro, 'fotos') === false) {
            $fotoData = explode(',', $fotoPro);
            $fotoBase64 = $fotoData[1]; // La parte base64
            $fotoExtension = explode(';', explode('/', $fotoData[0])[1])[0]; // Obtener la extensión

            $fotoPath = 'public/fotos/' . uniqid() . '.' . $fotoExtension;
            Storage::put($fotoPath, base64_decode($fotoBase64));
            $request->merge(['foto' => Storage::url($fotoPath)]);
        }
        $ejecutivo->update($request->all());
        return $ejecutivo;
    }
    function destroy($id){
        $ejecutivo = Ejecutivo::findOrFail($id);
        $ejecutivo->delete();
        return $ejecutivo;
    }
    public function create()
    {
        $zonas = Zona::all(); // Obtener todas las zonas desde la base de datos
        return view('ejecutivos.create', compact('zonas')); // Pasar las zonas a la vista
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\Region;

use Illuminate\Http\Request;


class RegionController extends Controller
{
    function index(){
        return Region::all();
    }
    function store(Request $request){
        return Region::create($request->all());
    }
    function show($id){
        return Region::find($id);
    }
    function update(Request $request, $id){
        $region = Region::find($id);
        $region->update($request->all());
        return $region;
    }
    function destroy($id){
        $region = Region::findOrFail($id);
        $region->delete();
        return $region;
    }
}

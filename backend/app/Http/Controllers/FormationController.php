<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Formation as FormationResource;
use App\Formation;

class FormationController extends Controller
{
    public function index($id){
        return Formation::find($id);
    }
    public function create(Request $request){
        $formation = new Formation();
        $formation->cv_id=$request->cv_id;
        $formation->degree=$request->degree;
        $formation->school=$request->school;
        $formation->description=$request->description;
        $formation->save();
    }
    public function update(Request $request, $id){
        $formation = Formation::find($id);
        $formation->cv_id=$request->cv_id;
        $formation->degree=$request->degree;
        $formation->school=$request->school;
        $formation->description=$request->description;
        $formation->save();
    }
    public function destroy(){
        $formation = Formation::find($id);
        $formation->delete();
    }
}

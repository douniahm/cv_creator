<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Competence;

class CompetenceController extends Controller
{
    public function index($id){
        return Competence::find($id);
    }
    public function create(Request $request){
        $competence = new Competence();
        $competence->cv_id=$request->cv_id;
        $competence->title=$request->phone;
        $competence->address=$request->address;
        $competence->email=$request->email;
        $competence->save();
    }
    public function update(Request $request, $id){
        $competence = Competence::find($id);
        $competence->cv_id=$request->cv_id;
        $competence->title=$request->phone;
        $competence->address=$request->address;
        $competence->email=$request->email;
        $competence->save();
    }
    public function destroy(){
        $competence = Competence::find($id);
        $competence->delete();
    }
}

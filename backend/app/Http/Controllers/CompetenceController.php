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
        $competence->title=$request->title;

        if($competence->save())
            $response = ['success'=>true];
        else  $response = ['success'=>false, 'data'=>'Couldnt register competence'];

        return response()->json($response, 201);
    }
    public function update(Request $request, $id){
        $competence = Competence::find($id);
        $competence->cv_id=$request->cv_id;
        $competence->title=$request->title;
        $competence->save();
    }
    public function destroy(){
        $competence = Competence::find($id);
        $competence->delete();
    }
}

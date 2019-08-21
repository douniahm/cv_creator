<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Experience;

class ExperienceController extends Controller
{
    public function index($id){
        return Experience::find($id);
    }
    public function create(Request $request){
        $experience = new Experience();
        $experience->cv_id=$request->cv_id;
        $experience->job_title=$request->job_title;
        $experience->company=$request->company;
        $experience->description=$request->description;

        if($experience->save())
            $response = ['success'=>true];
        else  $response = ['success'=>false, 'data'=>'Couldnt register experience'];

        return response()->json($response, 201);
    }
    public function update(Request $request, $id){
        $experience = Experience::find($id);
        $experience->cv_id=$request->cv_id;
        $experience->job_title=$request->job_title;
        $experience->company=$request->company;
        $experience->description=$request->description;
        $experience->save();
    }
    public function destroy(){
        $experience = Experience::find($id);
        $experience->delete();
    }
}

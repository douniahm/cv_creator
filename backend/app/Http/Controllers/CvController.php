<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cv;

class CvController extends Controller
{
    public function index($id){
        return Cv::find($id);
    }
    public function create(Request $request){
        $cv = new Cv();
        $cv->user_id=$request->user_id;
        $cv->title=$request->title;

        if($cv->save())
            $response = ['success'=>true, 'data'=>['id'=>$cv->id,'title'=>$cv->title]];
        else  $response = ['success'=>false, 'data'=>'Couldnt register cv'];

        return response()->json($response, 201);
    }
    public function update(Request $request, $id){
        $cv = Cv::find($id);
        $cv->user_id=$request->user_id;
        $cv->title=$request->title;
        $cv->save();
    }
    public function destroy(){
        $cv = Cv::find($id);
        $cv->delete();
    }
}

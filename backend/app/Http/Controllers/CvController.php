<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cv;
use Auth;

class CvController extends Controller
{
    public function index(Request $request){
        return Cv::find($request->id)->with('formations','contact','competences','experiences')->get();
    }
    public function indexAll(Request $request){
        return Cv::where('user_id',1)->with('formations','contact','competences','experiences')->get();
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
    public function destroy(Request $request){
        $cv = Cv::find($request->cv_id);
        $cv->delete();
    }
}

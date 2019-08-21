<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;

class ContactController extends Controller
{
    public function index($id){
        return Contact::find($id);
    }
    public function create(Request $request){
        $contact = new Contact();
        $contact->cv_id=$request->cv_id;
        $contact->phone=$request->phone;
        $contact->address=$request->address;
        $contact->email=$request->email;

        if($contact->save())
            $response = ['success'=>true];
        else  $response = ['success'=>false, 'data'=>'Couldnt register contact'];

        return response()->json($response, 201);
    }
    public function update(Request $request, $id){
        $contact = Contact::find($id);
        $contact->cv_id=$request->cv_id;
        $contact->phone=$request->phone;
        $contact->address=$request->address;
        $contact->email=$request->email;
        $contact->save();
    }
    public function destroy(){
        $contact = Contact::find($id);
        $contact->delete();
    }
}

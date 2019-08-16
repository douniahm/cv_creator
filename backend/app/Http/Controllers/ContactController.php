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
        $contact->title=$request->title;
        $contact->save();
    }
    public function update(Request $request, $id){
        $contact = Contact::find($id);
        $contact->cv_id=$request->cv_id;
        $contact->title=$request->title;
        $contact->save();
    }
    public function destroy(){
        $contact = Contact::find($id);
        $contact->delete();
    }
}

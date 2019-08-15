<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\User as UserResource;
use App\User;

class UserController extends Controller
{
    public function index(){
        $id = Auth::user()->id;
        return new UserResource(User::find($id));
    }
    public function create(Request $request){
        $user = new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=\Hash::make($request->password);
        $user->save();
    }
    public function update(Request $request, $id){
        $user = User::find($id);
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=$request->password;
        $user->save();
    }
    public function destroy(){
        $user = User::find($id);
        $user->delete();
    }
}

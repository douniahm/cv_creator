<?php

namespace App\Http\Controllers\Auth;

use App\User;
use JWTAuth;
use JWTAuthException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\GetToken;
use Illuminate\Foundation\Auth\AuthenticatesUsers;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    public function login(Request $request)
    {
        $user = \App\User::where('email', $request->email)->get()->first();
        if ($user && \Hash::check($request->password, $user->password)) // The passwords match...
        {
            $token = GetToken::getToken($request->email, $request->password);
            $user->api_token = $token;
            $user->save();
            $response = ['success'=>true, 'data'=>['id'=>$user->id,'api_token'=>$user->api_token,'name'=>$user->name, 'email'=>$user->email]];
        }
        else
          $response = ['success'=>false, 'data'=>'Record doesnt exists'];

        return response()->json($response, 201);
    }
}

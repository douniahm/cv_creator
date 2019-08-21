<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['jwt-auth','api-header']], function () {
    // all routes to protected resources are registered here
    Route::get('user', 'UserController@index');
    Route::post('formation', 'FormationController@create');
    Route::post('cv', 'CvController@create');
    Route::post('contact', 'ContactController@create');
    Route::post('competence', 'CompetenceController@create');
    Route::post('experience', 'ExperienceController@create');
});

Route::group(['middleware' => 'api-header'], function () {
    // The registration and login requests doesn't come with tokens
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('login', 'Auth\LoginController@login');
});

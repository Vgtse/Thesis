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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('yolos', 'announcementController@index');
Route::get('tags', 'tagController@index');
Route::get('events', 'eventController@index');
Route::get('buildings', 'buildingController@index');
Route::get('foods', 'buildingController@food');
Route::get('coffees', 'buildingController@coffee');
Route::get('schools', 'buildingController@schools');


Route::post('register','UserController@register');
Route::post('store','UserController@store');
Route::post('checkuser','UserController@checkuser');
Route::post('updatename','mainController@updatename');
Route::post('updatepassword','mainController@updatepassword');
Route::post('updatebuilding','mainController@updatebuilding');
Route::post('upload','mainController@upload');

Route::resource('fileupload', 'FileuploadController');

Route::middleware('auth:api')->get('/user',function(Request $request){
    return $request->user();
});

//Route::post('coins', 'CoinController@index');
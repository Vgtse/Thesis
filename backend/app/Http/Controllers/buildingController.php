<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\building;

class buildingController extends Controller
{
    public function index()
    {
        $coins = building::all();
        

        return response()->json(['buildings' => $coins]);
    }
    public function food()
    {
        $foods = building::where('tag_id','=','food_1')->get();
        

        return response()->json(['foods' => $foods]);
    }
    public function coffee()
    {
        $coffees = building::where('tag_id','=','food_2')->get();
        

        return response()->json(['coffees' => $coffees]);
    }
    public function schools()
    {
        $schools = building::where('building_scope','=','schools')->get();
        

        return response()->json(['schools' => $schools]);
    }
}
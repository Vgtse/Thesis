<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\YOLO;

class YoloController extends Controller
{
    public function index()
    {
        $coins = Yolo::all();
        

        return response()->json(['yolos' => $coins]);
    }
}
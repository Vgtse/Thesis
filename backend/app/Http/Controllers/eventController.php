<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\event;

class eventController extends Controller
{
    public function index()
    {
        $coins = event::all();
        

        return response()->json(['events' => $coins]);
    }
}
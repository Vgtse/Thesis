<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\tag;

class tagController extends Controller
{
    public function index()
    {
        $tags =tag::all();
        

        return response()->json(['tags' => $tags]);
    }
}
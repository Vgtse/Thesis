<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\announcement;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class announcementController extends Controller
{
    public function index()
    {
        
        $coins = announcement::all();
        

        return response()->json(['yolos' => $coins]);
    }
}
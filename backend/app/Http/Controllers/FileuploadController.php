<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use App\Fileupload;
use Intervention\Image\Facades\Image;
class FileuploadController extends Controller
{
    public function store(Request $request)
    {
        
       
        $image = $request->get('data');
        $name = 'Sup.bitch';
        Image::make($request->get('data'))->save(public_path('images/').$name);
        



        $fileupload = new Fileupload();
        $fileupload->filename=$name;
        $fileupload->save();
        return response()->json('Successfully added');

    }
}

<?php

namespace App\Http\Controllers;
use App\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
use DB;
use Intervention\Image\Facades\Image;
use App\Fileupload;
class mainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatename(Request $request)
    {
       
        $email = $request->email;
        $new = $request->newuser;
      
        $error_message="DENIED";
        $Success = "Success";
    
        if ($user = user::where('email','=' ,$email)->first()) {
            
            $user->name = $new;
            $user->save();
        
            return response()->json(['message' => $user->name]);
        } else {
           return response()->json(['message' => $error_message]);
        }
        
   }
   public function updatepassword(Request $request)
   {
      
       $email = $request->email;
       $new = $request->newuser;
     
       $error_message="DENIED";
       $Success = "Success";
       $hash = Hash::make($new);
       if ($user = user::where('email','=' ,$email)->first()) {
           
           $user->password= $hash;
           $user->save();
       
           return response()->json(['message' => $user->name]);
       } else {
          return response()->json(['message' => $error_message]);
       }
       
  }
  public function updatebuilding(Request $request)
   {
      
       $email = $request->email;
       $new = $request->newuser;
     
       $error_message="DENIED";
       $Success = "Success";
       
       if ($user = user::where('email','=' ,$email)->first()) {
           
           $user->buildingid= $new;
           $user->save();
       
           return response()->json(['message' => $user->name]);
       } else {
          return response()->json(['message' => $error_message]);
       }
       
  }
  public function upload(Request $request)
  {
   
    $files = $request->file('images');
    $fileText = '';
   

      
            $destinationPath = 'public/images/';
            $filename = $file->getClientOriginalName();
            $unique_name = md5($filename. time()).$filename;
            $upload_success = $file->move($destinationPath, $unique_name);
            $fileText .= url('public/images/' . $unique_name) . '|';
        
    
   
   $Success = "Success";
    return response()->json(['message' =>$Success ]);
      
 }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

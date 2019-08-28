<?php

namespace App\Http\Controllers;

use App\user;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
//use JWTAuth;




class UserController extends Controller {
   
    public function store(Request $request)
    {
        $data= user::all();
        $email = $request->email;
        $password=$request->password;
        

        $error_message="DENIED";
        $Success = "Success";
        
        if (user::where('email', '=',$email)->count() > 0) {
           $hashed_password= user::where('email', '=',$email)->first();
           
           if (Hash::check($password, $hashed_password->password)) {
            return response()->json(['message' => $Success]);
            // The passwords match...
        }else{
          return response()->json(['message' => $error_message]);
        }
            
         }else{
            return response()->json(['message' => $error_message]);
         }
        
   }public function checkuser(Request $request)
   {
       $data= user::all();
       $email = $request->email;
       
       

       $error_message="DENIED";
       $Success = "Success";
       
       if (user::where('email', '=',$email)->count() > 0) {
          $user= user::select('name','buildingid','email')->where('email', '=',$email)->get();
          
         
           return response()->json(['message' => $user]);
           
        }else{
           return response()->json(['message' => $error_message]);
        }
       
  }
 
   public function register(Request $request)
   {
       $data= user::all();
       $email = $request->email;
       $password=$request->password;
       $building=$request->building;
       $Success = "Success";
       $error_message="DENIED";
       $hash = Hash::make($password);

      
      if (user::where('email', '=', $email)->exists()) {
       return response()->json(['message' => $error_message]);
       }else{
            user::insert(['email'=>$email,'password'=>$hash,'buildingid'=>$building,'name'=>$email]);

           
          return response()->json(['message' => $Success]);
        }
      
  }
 
}
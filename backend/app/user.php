<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user extends Model
{   
    public $incrementing = false;
    protected $primaryKey = 'email';
    protected $table = "users"; 
    public $timestamps = false;
    protected $fillable = [
        'name',
        'image_name',
        'image_path',
        'password'
        
    ];
}

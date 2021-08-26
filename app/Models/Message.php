<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'subject',
        'body'
    ];

    public function user(){

        return $this->belongsTo(User::class);

    }

    public function users(){

        return $this->hasMany(User::class);

    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'img',
        'title',
        'body',
        'priority',
        'postcode_id'
    ];

    public function user() {

        return $this->belongsTo(User::class);

    }

    public function bids() {
        
        return $this->hasMany(Bid::class);

    }

    public function rubrics() {

        return $this->belongsToMany(Rubric::class);

    }
}

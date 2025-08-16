<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id', 'guide_id', 'date', 'start_time', 'end_time',
        'hours', 'total_amount', 'status', 'is_paid', 'special_requests',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function guide()
    {
        return $this->belongsTo(User::class, 'guide_id');
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }
}

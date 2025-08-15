<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuideAvailability extends Model
{
    protected $fillable = [
        'guide_id', 'day_of_week', 'start_time', 'end_time', 'is_active',
    ];

    public function guide()
    {
        return $this->belongsTo(User::class, 'guide_id');
    }
}

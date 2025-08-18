<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuideProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'hourly_rate',
        'experience',
        'bio',
        'languages',
        'specialties',
        'nid_front',
        'nid_back',
    ];

    protected $casts = [
        'languages' => 'array',
        'specialties' => 'array',
        'hourly_rate' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photos()
    {
        return $this->hasMany(GuidePhoto::class);
    }
}

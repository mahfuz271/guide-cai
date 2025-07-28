<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuidePhoto extends Model
{
    protected $fillable = [
        'guide_profile_id',
        'path',
    ];

    public function guideProfile()
    {
        return $this->belongsTo(GuideProfile::class);
    }
}

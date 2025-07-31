<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class GuidePhoto extends Model
{
    protected $fillable = [
        'guide_profile_id',
        'path',
    ];

    protected $appends = ['full_path'];

    public function guideProfile()
    {
        return $this->belongsTo(GuideProfile::class);
    }

    public function getFullPathAttribute(): string
    {
        return Storage::url($this->path);
    }
}

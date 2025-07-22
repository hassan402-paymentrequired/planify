<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\s;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{

    /**
     * Get the user that owns the Project
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assign_to');
    }

    public function types()
    {
        return $this->belongsToMany(ProjectType::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)
                ->withPivot('start_date', 'end_date', 'purpose')
                ->withTimestamps();
    }

    public function attachUser($userId)
    {
        $this->users()->attach($userId);
    }

     public function detachUser($userId)
    {
        $this->users()->detach($userId);
    //     $project->users()->updateExistingPivot($userId, [
    // 'start_date' => $request->start_date,
    // 'end_date' => $request->end_date,
    // 'purpose' => $request->purpose,
// ]);

    }

}

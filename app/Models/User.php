<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Observers\UserObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Concerns\s;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

#[ObservedBy(UserObserver::class)]
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,  HasRoles;
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function projectassigned(): HasMany
    {
        return $this->hasMany(Project::class, 'assign_to');
    }


    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class)
            ->withPivot('start_date', 'end_date', 'purpose')
            ->withTimestamps();
    }

    public function safeRoleNames()
    {
        $this->loadMissing('roles');
        return collect($this->roles)->pluck('name') ?? [];
    }

    public function firstRole()
    {
        $this->loadMissing('roles');
        return $this->roles->first();
        // $this->hasO
    }

}

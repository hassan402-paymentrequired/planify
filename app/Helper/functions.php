<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

function generatePassword(): string
{
    return \Str::random(10);
}

function getProjectManagers()
{
    return User::role('project_manager')->get();
}


function authorize(string $permission)
{
    $user = Auth::user();
    if (!$user->can($permission)) {
        abort(403, 'Unauthorized');
    }
}

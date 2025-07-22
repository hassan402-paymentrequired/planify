<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Project;
use Spatie\Permission\Models\Role;
use App\ProjectStatusEnum;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $totalProjects = Project::count();
        $totalRoles = Role::count();

        $managementRoles = ['super_admin', 'cto', 'hr'];

        // Get all users with their ongoing projects and roles
        $users = User::with(['project' => function ($q) {
            $q->where('status', ProjectStatusEnum::IN_PROGRESS->value);
        }, 'roles'])->get();

        $managementStaff = $users->filter(function ($user) use ($managementRoles) {
            return $user->roles->pluck('name')->intersect($managementRoles)->isNotEmpty();
        });

        $workingStaff = $users->filter(function ($user) use ($managementRoles) {
            // Not management and has at least one ongoing project
            return $user->roles->pluck('name')->intersect($managementRoles)->isEmpty()
                && $user->project->isNotEmpty();
        })->map(function ($user) {
            $user->project_count = $user->project->count();
            return $user;
        });

        $unoccupiedStaff = $users->filter(function ($user) use ($managementRoles) {
            // Not management and has no ongoing project
            return $user->roles->pluck('name')->intersect($managementRoles)->isEmpty()
                && $user->project->isEmpty();
        })->map(function ($user) {
            $user->project_count = 0;
            return $user;
        });

        return Inertia::render('admin/dashboard', [
            'totalUsers' => $totalUsers,
            'totalProjects' => $totalProjects,
            'totalRoles' => $totalRoles,
            'workingStaff' => $workingStaff->values(),
            'managementStaff' => $managementStaff->values(),
            'unoccupiedStaff' => $unoccupiedStaff->values(),
        ]);
    }
}

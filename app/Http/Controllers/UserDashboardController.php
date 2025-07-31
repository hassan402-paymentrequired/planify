<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectIssue;
use App\Models\ProjectUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\ProjectStatusEnum;

class UserDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // All projects assigned to the user
        $projects = $user->projects()->with(['assignTo', 'types', 'users.roles'])->get();

        // Analytics
        $totalProjects = $projects->count();
        $ongoingProjects = $projects->where('status', ProjectStatusEnum::IN_PROGRESS->value);
        $completedProjects = $projects->where('status', ProjectStatusEnum::COMPLETED->value);

        // tasks
        $tasks = ProjectUser::where('user_id', $user->id)
            ->with(['project', 'project.assignTo', 'project.types', 'project.users.roles'])
            ->get();

        // dd($tasks);

        return Inertia::render('user/dashboard', [
            'totalProjects' => $totalProjects,
            'ongoingProjectsCount' => $ongoingProjects->count(),
            'completedProjectsCount' => $completedProjects->count(),
            'projects' => $projects,
            'tasks' => $tasks,
        ]);
    }
} 
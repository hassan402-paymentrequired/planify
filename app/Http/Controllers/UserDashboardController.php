<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectIssue;
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
        $projects = $user->project()->with('users')->get();

        // Analytics
        $totalProjects = $projects->count();
        $ongoingProjects = $projects->where('status', ProjectStatusEnum::IN_PROGRESS->value);
        $completedProjects = $projects->where('status', ProjectStatusEnum::COMPLETED->value);

        // Ongoing projects with user's issues (tasks)
        $ongoingProjectsWithTasks = $ongoingProjects->map(function ($project) use ($user) {
            $tasks = ProjectIssue::where('project_id', $project->id)
                ->where('assignee_id', $user->id)
                ->get();
            $project->user_tasks = $tasks;
            return $project;
        });

        return Inertia::render('user/dashboard', [
            'totalProjects' => $totalProjects,
            'ongoingProjectsCount' => $ongoingProjects->count(),
            'completedProjectsCount' => $completedProjects->count(),
            'ongoingProjects' => $ongoingProjectsWithTasks,
        ]);
    }
} 
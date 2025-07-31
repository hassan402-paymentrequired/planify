<?php

namespace App\Http\Controllers\Pm;

use App\Http\Controllers\Controller;
use App\ProjectStatusEnum;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PmController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        // All projects assigned to the user
        $projects = $user->projectassigned()->with(['assignTo', 'types', 'users.roles'])->get();

        // Analytics
        $totalProjects = $projects->count();
        $ongoingProjects = $projects->where('status', ProjectStatusEnum::IN_PROGRESS->value);
        $completedProjects = $projects->where('status', ProjectStatusEnum::COMPLETED->value);

        // tasks
       

    return Inertia::render('project-manager/dashboard',  [
         'totalProjects' => $totalProjects,
            'ongoingProjectsCount' => $ongoingProjects->count(),
            'completedProjectsCount' => $completedProjects->count(),
            'projects' => $projects,
    ]);
    }
}

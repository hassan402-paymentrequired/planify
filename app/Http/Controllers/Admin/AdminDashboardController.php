<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Project;
use App\ProjectPrioriyEnum;
use Spatie\Permission\Models\Role;
use App\ProjectStatusEnum;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalProjects = Project::count();
        $ongoingProjects = Project::where('status', ProjectStatusEnum::IN_PROGRESS->value)->count();
        $completedProjects = Project::where('status', ProjectStatusEnum::COMPLETED->value)->count();
        $argentProjects = Project::where('priority', ProjectPrioriyEnum::CRITICAL->value)->count();
        $unoccupiedStaff = User::whereHas('roles', function($query) {
            $query->where('is_administrative_role', '=', false);
        })->doesntHave('projects')->count();
        $cancelledProjects = Project::where('status', ProjectStatusEnum::CANCELLED->value)->count();
        $deactivatedProjects = Project::where('status', ProjectStatusEnum::DEACTIVATE->value)->count();

        $users_projects = User::withCount([
            'projects as ongoing_projects' => function($query) {
                $query->where('status', ProjectStatusEnum::IN_PROGRESS->value);
            },
            'projects as completed_projects' => function($query) {
                $query->where('status', ProjectStatusEnum::COMPLETED->value);
            },
            'projects as total_projects'
        ])->whereHas('roles', function($query) {
            $query->where('is_administrative_role', false);
        })->get();





        $projectsPerDay = Project::selectRaw('DATE(created_at) as date, COUNT(*) as projects')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('projects', 'date')
            ->toArray();

        
        $staffAssignedPerDay = DB::table('project_user')
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT user_id) as staff')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('staff', 'date')
            ->toArray();

        $dates = collect(array_merge(array_keys($projectsPerDay), array_keys($staffAssignedPerDay)))->unique()->sort();
        $projectsStaffChart = $dates->map(function($date) use ($projectsPerDay, $staffAssignedPerDay) {
            return [
                'date' => $date,
                'projects' => $projectsPerDay[$date] ?? 0,
                'staff' => $staffAssignedPerDay[$date] ?? 0,
            ];
        })->values();

        return Inertia::render('admin/dashboard', [
            'totalProjects' => $totalProjects,
            'ongoingProjects' => $ongoingProjects,
            'completedProjects' => $completedProjects,
            'argentProjects' => $argentProjects,
            'unoccupiedStaff' => $unoccupiedStaff,
            'cancelledProjects' => $cancelledProjects,
            'deactivatedProjects' => $deactivatedProjects,
            'users' => $users_projects,
            'projectsStaffChart' => $projectsStaffChart,
        ]);
    }
}

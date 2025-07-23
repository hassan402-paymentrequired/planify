<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UnboardUserRequest;
use App\Models\Project;
use App\Models\ProjectType;
use App\Models\User;
use App\ProjectPrioriyEnum;
use App\ProjectStatusEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Contracts\Role;
use Spatie\Permission\Models\Role as ModelsRole;

class ProjectController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if (!$user->can('list.project')) {
            abort(403, 'Unauthorized');
        }
        $superRoles = ['super_admin', 'cto', 'hr'];
        if ($user->hasAnyRole($superRoles)) {
            $projects = Project::with(['types', 'users', 'assignTo'])->get();
        } else {
            $projects = $user->projects()->with(['types', 'users', 'assignTo'])->get();
        }
        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'roles' => $user->getRoleNames(),
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ]);
    }

    public function create()
    {
        $user = Auth::user();
        if (!$user->can('create.project')) {
            abort(403, 'Unauthorized');
        }
        return Inertia::render('admin/projects/create', [
            'admins' => getProjectManagers(),
            'priorities' => ProjectPrioriyEnum::toArray(),
            'types' => ProjectType::select('id', 'name')->get()
        ]);
    }

    public function show(Project $project)
    {
        $project = $project->load('assignTo', 'types', 'users');
        return Inertia::render('admin/projects/show', [
            'project' => $project,
            'status' => ProjectStatusEnum::toArray()
        ]);
    }

    public function activateAndDeactivateProject(Project $project)
    {
        authorize('edit.project');

        $message = $project->status === ProjectStatusEnum::IN_PROGRESS->value
            ? 'Project deactivated successfully'
            : 'Project activated successfully';

        if (ProjectStatusEnum::IN_PROGRESS->value === $project->status) {
            $project->status = ProjectStatusEnum::DEACTIVATE->value;
        } else {
            $project->status = ProjectStatusEnum::IN_PROGRESS->value;
        }

        $project->save();
        return back()->with('success', $message);
    }

    public function updateArchiveProject(Project $project)
    {
        authorize('edit.project');
        if (ProjectStatusEnum::ON_HOLD->value === $project->status) {
            $project->status = ProjectStatusEnum::IN_PROGRESS->value;
        } else {
            $project->status = ProjectStatusEnum::ON_HOLD->value;
        }
        $project->save();
        return back()->with('success', 'Project archived successfully');
    }

    public function store(StoreProjectRequest $request)
    {
        $user = Auth::user();
        if (!$user->can('create.project')) {
            abort(403, 'Unauthorized');
        }
        $project =  Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'assign_to' => $request->assignee,
            'priority' => $request->priority,
            'start_date' => $request->startDate ?? today(),
            'due_date' => $request->dueDate ?? null,
            'created_by' => $user->id,
        ]);
        $project->types()->attach($request->type);
        return redirect()->back()->with('success', ['meesage' => 'Project created successfully.', 'projectId' => $project->id]);
    }


    public function team(Project $project)
    {
        $project = $project->load('users');
        // dd($project);
        return Inertia::render('admin/projects/team', [
            'project' => $project
        ]);
    }


    public function addUser(Project $project)
    {
        authorize('assign.project');

        $project = $project->load('users');


        $assignedUserIds = $project->users->pluck('id')->toArray();

        $users = User::withoutRole(['admin', 'super_admin', 'cto', 'hr', 'project_manager'])
            ->whereNotIn('id', $assignedUserIds)
            ->with('roles')
            ->get();

        $roles = ModelsRole::where('name', '!=', 'super_admin')->get();

        return Inertia::render('admin/projects/add-user', [
            'project' => $project,
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function attachUserToProject(Project $project, UnboardUserRequest $request)
    {
        authorize('assign.project');

        $userId = $request->user_id;
        $startDate = \Carbon\Carbon::parse($request->startDate)->format('Y-m-d');
        $endDate = $request->dueDate ? \Carbon\Carbon::parse($request->dueDate)->format('Y-m-d') : null;
        $project->users()->attach($userId, [
            'purpose' => $request->task,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);


        return back()->with('success', "User has being unboarded on {$project->name} successfully");
    }
}

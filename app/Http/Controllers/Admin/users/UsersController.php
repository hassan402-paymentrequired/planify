<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\ProjectStatusEnum;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{


    public function index()
    {
        // $users = User::with('roles')->withCount(['projectassigned', 'projects'])->whereHas('roles', function ($query) {
        //     $query->where('is_administrative_role', '=', false);
        // })->get();
        $users = User::with('roles')
            ->withCount([
                'projects',
                'projects as ongoing_projects_count' => function ($query) {
                    $query->where('status', ProjectStatusEnum::IN_PROGRESS->value);
                },
                'projects as completed_projects_count' => function ($query) {
                    $query->where('status', ProjectStatusEnum::COMPLETED->value);
                },
            ])
            ->whereHas('roles', function ($query) {
                $query->where('is_administrative_role', false);
            })
            ->withCount([
                'projectassigned as managed_ongoing_projects_count' => function ($q) {
                    $q->where('status', ProjectStatusEnum::IN_PROGRESS->value);
                },
                'projectassigned as managed_completed_projects_count' => function ($q) {
                    $q->where('status', ProjectStatusEnum::COMPLETED->value);
                },
            ])

            ->get();

        // dd($users);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'projectsCount' => Project::count(),
            'roles' => Role::where('is_administrative_role',  false)->get(),
        ]);
    }

    public function create()
    {
        $roles = Role::where('name', '!=', 'super_admin')->get();
        return Inertia::render('admin/users/create', ['roles' => $roles]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|min:3|max:150|string',
                'email' => 'required|min:3|max:150|email',
                'role' => 'required|max:150|string',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt('password'),
            ]);

            $user->assignRole($request->role);


            return back();
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator)->withInput();
        } catch (Exception $e) {
            Log::error($e);
            return back()->withErrors(['name' => 'An error occurred while creating the user. Please try again. ' . $e->getMessage()]);
        }
    }

    public function show($id)
    {
        try {



            $user = User::with(['roles', 'projects' => function ($q) {
                return $q->with('types');
            }, 'projectassigned'])->findOrFail($id);

            $user->loadCount([
                'projects',
                'projects as ongoing_projects_count' => function ($query) {
                    $query->where('status', ProjectStatusEnum::IN_PROGRESS->value);
                },
                'projects as completed_projects_count' => function ($query) {
                    $query->where('status', ProjectStatusEnum::COMPLETED->value);
                },
            ]);

            if ($user->hasRole('project_manager')) {
                $user->loadCount([
                    'projectassigned as managed_ongoing_projects_count' => function ($q) {
                        $q->where('status', ProjectStatusEnum::IN_PROGRESS->value);
                    },
                    'projectassigned as managed_completed_projects_count' => function ($q) {
                        $q->where('status', ProjectStatusEnum::COMPLETED->value);
                    },
                ]);
            }


            return Inertia::render('admin/users/show', ['user' => $user]);
        } catch (Exception $e) {
            Log::error($e);
            return back()->with(['error' => 'User not found.']);
        }
    }
}

<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
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
        $users = User::with(['roles', 'permissions', 'project'])->get();

        return Inertia::render('admin/users/index', [
            'users' => $users,
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
                'phoneNumber' => 'required|min:3|max:150|string',
                'email' => 'required|min:3|max:150|email',
                'role' => 'required|max:150|string',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phoneNumber,
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
            $user = User::with(['roles', 'projects' => function($q) {return $q->with('types');}])->findOrFail($id);


            return Inertia::render('admin/users/show', ['user' => $user]);
        } catch (Exception $e) {
            Log::error($e);
            return back()->with(['error' => 'User not found.']);
        }
    }
}

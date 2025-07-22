<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/issues/index');
    }

    public function createRole(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|min:3|max:150|string',
                'description' => 'nullable|string|max:255',
            ]);
            Role::create([
                'name' => strtolower(str_replace(' ', '_', $request->name)),
                'display_name' => $request->name,
                'description' => $request->description,
            ]);
            return back();
        } catch (Exception $e) {
            Log::error($e);
            return back();
        }
    }

    public function aiView()
    {
        return Inertia::render('admin/ai/index');
    }
}

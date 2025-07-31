<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AiController;
use App\Http\Controllers\Admin\Users\UsersController;
use App\Http\Controllers\Pm\PmController;
use App\Http\Controllers\Project\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin/dashboard', [\App\Http\Controllers\Admin\AdminDashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/project-manager/dashboard', [PmController::class, 'index'])->name('project.manager.dashboard');

    Route::get('/user/dashboard', [\App\Http\Controllers\UserDashboardController::class, 'index'])->name('user.dashboard');

    // Role management routes
    Route::get('/admin/roles', [\App\Http\Controllers\Admin\RoleController::class, 'index'])->name('roles.index');
    Route::post('/admin/roles/{role}/permissions', [\App\Http\Controllers\Admin\RoleController::class, 'updatePermissions'])->name('roles.updatePermissions');
    Route::delete('/admin/roles/{role}', [\App\Http\Controllers\Admin\RoleController::class, 'destroy'])->name('roles.destroy');
    Route::patch('/admin/roles/{role}', [\App\Http\Controllers\Admin\RoleController::class, 'update'])->name('roles.update');

    // Permission management routes
    Route::get('/admin/permissions', [\App\Http\Controllers\Admin\PermissionController::class, 'index'])->name('permissions.index');
    Route::post('/admin/permissions', [\App\Http\Controllers\Admin\PermissionController::class, 'store'])->name('permissions.store');
    Route::patch('/admin/permissions/{permission}/{role}', [\App\Http\Controllers\Admin\PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('/admin/permissions/{permission}', [\App\Http\Controllers\Admin\PermissionController::class, 'destroy'])->name('permissions.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('mt')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::get('/ask-ai', [AdminController::class, 'aiView'])->name('ai.view');
    Route::get('/issues', [AdminController::class, 'index'])->name('issues');
    Route::post('/role-create', [AdminController::class, 'createRole'])->name('admin.role.store');

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UsersController::class, 'index'])->name('users.index');
        Route::get('/create', [UsersController::class, 'create'])->name('users.create');
        Route::post('/store', [UsersController::class, 'store'])->name('users.store');
        Route::get('/show/{id}', [UsersController::class, 'show'])->name('users.show');
    });

    Route::group(['prefix' => 'projects'], function () {
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::get('/create', [ProjectController::class, 'create'])->name('projects.create');
        Route::post('/store', [ProjectController::class, 'store'])->name('projects.store');
        Route::patch('/status/{project}', [ProjectController::class, 'activateAndDeactivateProject'])->name('projects.status.update');
        Route::patch('/archive/{project}', [ProjectController::class, 'updateArchiveProject'])->name('projects.archive.update');
        Route::get('/show/{project}', [ProjectController::class, 'show'])->name('projects.show');
        Route::get('/show/{project}/team', [ProjectController::class, 'team'])->name('projects.team');
        Route::get('/add-user/{project}', [ProjectController::class, 'addUser'])->name('projects.add_user');
        Route::patch('/attach-user/{project}', [ProjectController::class, 'attachUserToProject'])->name('projects.attach_user');
    });
});

Route::post('/gemini-query', [AiController::class, 'query']);


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

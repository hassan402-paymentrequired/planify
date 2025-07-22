<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'super_admin', 'guard_name' => 'web', 'display_name' => 'Super Admin'],
            ['name' => 'cto', 'guard_name' => 'web', 'display_name' => 'CTO'],
            ['name' => 'hr', 'guard_name' => 'web', 'display_name' => 'HR'],
            ['name' => 'project_manager', 'guard_name' => 'web', 'display_name' => 'Project Manager'],
            ['name' => 'frontend', 'guard_name' => 'web', 'display_name' => 'Frontend Developer'],
            ['name' => 'backend', 'guard_name' => 'web', 'display_name' => 'Backend Developer'],
            ['name' => 'designer', 'guard_name' => 'web', 'display_name' => 'Designer'],
            ['name' => 'admin', 'guard_name' => 'web', 'display_name' => 'Admin'],
            ['name' => 'user', 'guard_name' => 'web', 'display_name' => 'User'],
            ['name' => 'action_officer', 'guard_name' => 'web', 'display_name' => 'Action Officer'],
        ];

        $permissions = [
            ['name' => 'list.project', 'display_name' => 'List Projects'],
            ['name' => 'create.project', 'display_name' => 'Create Project'],
            ['name' => 'edit.project', 'display_name' => 'Edit Project'],
            ['name' => 'delete.project', 'display_name' => 'Delete Project'],
            ['name' => 'assign.project', 'display_name' => 'Assign Project'],
            ['name' => 'list.user', 'display_name' => 'List Users'],
            ['name' => 'create.user', 'display_name' => 'Create User'],
            ['name' => 'edit.user', 'display_name' => 'Edit User'],
            ['name' => 'delete.user', 'display_name' => 'Delete User'],
            ['name' => 'assign.user', 'display_name' => 'Assign User'],
            ['name' => 'talk.ai', 'display_name' => 'Talk with AI'],
            ['name' => 'create.issue', 'display_name' => 'Create Issue'],
            ['name' => 'view.issue', 'display_name' => 'View Issues'],
            ['name' => 'view.user.management', 'display_name' => 'View User Management'],
            ['name' => 'view.role.management', 'display_name' => 'View Role Management'],
            ['name' => 'view.permission.management', 'display_name' => 'View Permission Management'],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate([
                'name' => $role['name']
            ], [...$role]);
        }

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name'], 'guard_name' => 'web'],
                ['display_name' => $permission['display_name']]
            );
        }

        // Assign permissions to roles
        $superRoles = ['super_admin', 'cto', 'hr'];
        foreach ($superRoles as $roleName) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $role->givePermissionTo(Permission::all());
            }
        }

        $projectManager = Role::where('name', 'project_manager')->first();
        if ($projectManager) {
            $projectManager->givePermissionTo([
                'list.project',
                'create.project',
                'edit.project',
                'assign.project',
                'list.user',
            ]);
        }

        $frontend = Role::where('name', 'frontend')->first();
        if ($frontend) {
            $frontend->givePermissionTo([
                'list.project',
                'assign.project',
            ]);
        }

        $backend = Role::where('name', 'backend')->first();
        if ($backend) {
            $backend->givePermissionTo([
                'list.project',
                'assign.project',
            ]);
        }

        $designer = Role::where('name', 'designer')->first();
        if ($designer) {
            $designer->givePermissionTo([
                'list.project',
            ]);
        }

        // Assign general permissions to all roles
        $generalPermissions = ['list.user', 'list.project', 'talk.ai'];
        $allRoles = Role::all();
        foreach ($allRoles as $role) {
            $role->givePermissionTo($generalPermissions);
        }

        // Assign 'view.user.management' to admin, super_admin, cto, hr
        $userManagementRoles = ['admin', 'super_admin', 'cto', 'hr'];
        foreach ($userManagementRoles as $roleName) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $role->givePermissionTo('view.user.management');
            }
        }

        // Assign 'view.role.management' to admin, super_admin, cto, hr
        $roleManagementRoles = ['admin', 'super_admin', 'cto', 'hr'];
        foreach ($roleManagementRoles as $roleName) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $role->givePermissionTo('view.role.management');
            }
        }

        // Assign 'view.permission.management' to admin, super_admin, cto, hr
        $permissionManagementRoles = ['admin', 'super_admin', 'cto', 'hr'];
        foreach ($permissionManagementRoles as $roleName) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $role->givePermissionTo('view.permission.management');
            }
        }
    }
}

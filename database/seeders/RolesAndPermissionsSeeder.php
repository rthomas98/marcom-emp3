<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User management
            'view users',
            'create users',
            'edit users',
            'delete users',
            
            // Role management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            
            // Content management
            'view posts',
            'create posts',
            'edit posts',
            'delete posts',
            
            // Project management
            'view projects',
            'create projects',
            'edit projects',
            'delete projects',
            
            // Deal management
            'view deals',
            'create deals',
            'edit deals',
            'delete deals',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        Role::create(['name' => 'super-admin'])
            ->givePermissionTo(Permission::all());

        Role::create(['name' => 'admin'])
            ->givePermissionTo([
                'view users', 'create users', 'edit users',
                'view roles',
                'view posts', 'create posts', 'edit posts', 'delete posts',
                'view projects', 'create projects', 'edit projects',
                'view deals', 'create deals', 'edit deals',
            ]);

        Role::create(['name' => 'editor'])
            ->givePermissionTo([
                'view posts', 'create posts', 'edit posts',
                'view projects',
                'view deals',
            ]);

        Role::create(['name' => 'user'])
            ->givePermissionTo([
                'view posts',
                'view projects',
                'view deals',
            ]);
    }
} 
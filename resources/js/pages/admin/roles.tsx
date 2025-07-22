import NewRole from '@/components/modal/new-role';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/main-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

// Types for role and permission
export interface Role {
    id: number;
    users_count: number;
    display_name: string;
    description: string
}

export interface Permission {
    id: number;
    name: string;
    display_name: string;
}

export interface RolesandPermProps {
    roles: Role[];
    permissions: Permission[];
}

const RolesPage = ({ roles }: RolesandPermProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
    const [editDisplayName, setEditDisplayName] = useState<{ [roleId: number]: string }>({});
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const { post, patch, delete: deleteRole, processing } = useForm();

    const handleDisplayNameChange = (roleId: number, value: string) => {
        setEditDisplayName((prev) => ({ ...prev, [roleId]: value }));
    };

    const handleUpdateRole = (roleId: number) => {
        patch(`/admin/roles/${roleId}`, {
            preserveScroll: true,
            onSuccess: () => setEditingRoleId(null),
        });
    };

    const handleDeleteRole = (roleId: number) => {
        deleteRole(`/admin/roles/${roleId}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteConfirmId(null),
        });
    };

    return (
        <MainLayout>
            <div className="m">
                <Head title="Role Management" />
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Role Management</h1>
                    <Button onClick={() => setOpenModal(true)}>Create New Role</Button>
                </div>
                <NewRole openModal={openModal} setOpenModal={setOpenModal} />
                <div className="rounded bg-white p-4 shadow dark:bg-black/30">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">user count</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => {
                                return (
                                    <tr key={role.id} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-2">
                                            {editingRoleId === role.id ? (
                                                <input
                                                    type="text"
                                                    value={editDisplayName[role.id] ?? role.display_name}
                                                    onChange={(e) => handleDisplayNameChange(role.id, e.target.value)}
                                                    className="rounded border px-2 py-1 text-sm"
                                                />
                                            ) : (
                                                role.display_name
                                            )}
                                        </td>
                                        <td className="px-4 py-2">{role?.description}</td>
                                        <td className="px-4 py-2">{role.users_count}</td>
                                        <td className="px-4 py-2">
                                            {editingRoleId === role.id ? (
                                                <div className="flex gap-2">
                                                    <Button size="sm"  disabled={processing}>
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleUpdateRole(role.id)}
                                                        disabled={processing}
                                                    >
                                                        Update Name
                                                    </Button>
                                                    <Button size="sm" variant="ghost" onClick={() => setEditingRoleId(null)}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" onClick={() => setEditingRoleId(role.id)}>
                                                        Edit
                                                    </Button>
                                                    <Button size="sm" variant="destructive" onClick={() => setDeleteConfirmId(role.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                            {/* Delete confirmation dialog */}
                                            {deleteConfirmId === role.id && (
                                                <div className="mt-2 rounded bg-red-50 p-2 text-xs text-red-700 dark:bg-red-900/30">
                                                    Are you sure? This cannot be undone.
                                                    <div className="mt-2 flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDeleteRole(role.id)}
                                                            disabled={processing}
                                                        >
                                                            Confirm Delete
                                                        </Button>
                                                        <Button size="sm" variant="ghost" onClick={() => setDeleteConfirmId(null)}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default RolesPage;

import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/main-layout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { RolesandPermProps } from './roles';
import { Switch } from '@/components/ui/switch';

export default function PermissionsPage({ permissions, roles }: RolesandPermProps) {
    const [newPermission, setNewPermission] = useState({ name: '', display_name: '' });
    const [editPermissionId, setEditPermissionId] = useState<number | null>(null);
    const [editDisplayName, setEditDisplayName] = useState<{ [id: number]: string }>({});
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const { post, patch, delete: deletePermission, processing } = useForm();

    const handleCreate = () => {
        post('/admin/permissions', {
            preserveScroll: true,
            onSuccess: () => setNewPermission({ name: '', display_name: '' }),
        });
    };

    const handleEdit = (id: number, display_name: string) => {
        patch(`/admin/permissions/${id}`, {
            preserveScroll: true,
            onSuccess: () => setEditPermissionId(null),
        });
    };

    const handleDelete = (id: number) => {
        deletePermission(`/admin/permissions/${id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteConfirmId(null),
        });
    };

    return (
        <MainLayout>
            <div className=''>
                <Head title="Permissions Management" />
                <h1 className="mb-6 text-2xl font-bold">Permissions Management</h1>
               
                <div className="rounded bg-white w-full overflow-hidden shadow overflow-x-auto  dark:bg-black/30">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Permissions</th>
                                {roles?.map((role) => <th className="px-4 py-2 text-left">{role.display_name}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((perm) => (
                                <tr key={perm.id} className="border-b dark:border-gray-700">
                                    <td className="px-4 py-2">
                                        {editPermissionId === perm.id ? (
                                            <input
                                                type="text"
                                                value={editDisplayName[perm.id] ?? perm.display_name}
                                                onChange={(e) => setEditDisplayName((prev) => ({ ...prev, [perm.id]: e.target.value }))}
                                                className="rounded border px-2 py-1 text-sm"
                                            />
                                        ) : (
                                            perm.display_name
                                        )}
                                    </td>

                                    {roles?.map((role) => <td className="px-4 py-2 text-left">
                                        <Switch />
                                    </td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}

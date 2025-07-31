import { Switch } from '@/components/ui/switch';
import MainLayout from '@/layouts/main-layout';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { RolesandPermProps } from './roles';

export default function PermissionsPage({ permissions, roles }: RolesandPermProps) {
    const { patch, processing } = useForm();

    console.log(permissions, roles);

    const handleEdit = (permId: number, roleId: number) => {
        patch(route('permissions.update', { permission: permId, role: roleId }), {
            preserveScroll: true,
            onSuccess: () => toast.success('Permission has been updated successfully'),
        });
    };

    return (
        <MainLayout
            crumb={[
                { title: 'Dashboard', href: '/' },
                { title: 'Permissions Management', href: '/admin/permissions' },
            ]}
        >
            <div className="">
                <Head title="Permissions Management" />
                <h1 className="mb-6 text-2xl font-bold">Permissions Management</h1>

                <div className="w-full overflow-hidden overflow-x-auto rounded bg-white shadow dark:bg-black/30">
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
                                    <td className="px-4 py-2">{perm.display_name}</td>

                                    {roles?.map((role) => (
                                        <td className="px-4 py-2 text-left">
                                            <Switch
                                                defaultChecked={perm.roles.some((p) => p.id === perm.id)}
                                                onCheckedChange={() => handleEdit(perm.id, role.id)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}

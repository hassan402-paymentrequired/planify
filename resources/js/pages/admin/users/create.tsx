import InputError from '@/components/input-error';
import NewRole from '@/components/modal/new-role';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/layouts/main-layout';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

type Role = {
    name: string;
    display_name: string;
    id: number;
};

const Create = ({ roles }: { roles: Role[] }) => {
    const [openModal, setOpenModal] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm<Required<{ name: string; email: string; phoneNumber: string; role: string }>>({
        name: '',
        email: '',
        phoneNumber: '',
        role: '',
    });

    const handleFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            preserveScroll: true,
            onFinish: () => reset(),
            onSuccess: () => {
                setOpenModal(false);
                toast('Success', { description: 'User has been created successfully' });
            },
            onError: (_) => toast('Error', { description: 'Oops, something went wrong' }),
        });
    };

    return (
        <MainLayout>
            <div className="space-y-6 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
                        <p className="text-muted-foreground">Create, assign and manage all users.</p>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title" className="text-gray-800 dark:text-gray-300">
                                User Name
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter username"
                                required
                                className="border-stone-800"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project" className="text-gray-800 dark:text-gray-300">
                                Email
                            </Label>
                            <Input
                                id="emal"
                                type="email"
                                placeholder="Enter email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="border-stone-800"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dueDate" className="text-gray-800 dark:text-gray-300">
                                Phone No
                            </Label>
                            <Input
                                id="dueDate"
                                type="text"
                                placeholder="Enter phone no"
                                value={data.phoneNumber}
                                onChange={(e) => setData('phoneNumber', e.target.value)}
                                className="border-stone-800"
                            />
                            <InputError message={errors.phoneNumber} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="assignee" className="text-gray-800 dark:text-gray-300">
                            Roles
                        </Label>
                        <div className="flex items-center gap-2">
                            <Select onValueChange={(e) => setData('role', e)}>
                                <SelectTrigger className="border-stone-800">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles?.map((role: Role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                            {role.display_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={() => setOpenModal(!openModal)} type="button">
                                <Plus />
                            </Button>
                        </div>
                        <InputError message={errors.role} />
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        Create User
                    </Button>
                </form>
            </div>

            <NewRole openModal={openModal} setOpenModal={setOpenModal} />
        </MainLayout>
    );
};

export default Create;

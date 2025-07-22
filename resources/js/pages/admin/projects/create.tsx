/* eslint-disable @typescript-eslint/no-explicit-any */
import InputError from '@/components/input-error';
import ProjectSuccessModal from '@/components/modal/project-success-modal';
import { MultiSelect } from '@/components/project/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/layouts/main-layout';
import { OptionType, PrioritiesType } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

type Props = {
    id: number;
    name: string;
};




const Create = ({ admins, priorities, types }: { admins: Props[]; priorities: PrioritiesType[]; types: OptionType[] }) => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(1);
    const { flash } = usePage().props;
    const { data, setData, post, processing, reset, errors } = useForm<
        Required<{ name: string; description: string; assignee: string; priority: string; dueDate: string; startDate: string; type: number[] }>
    >({
        name: '',
        description: '',
        assignee: '',
        priority: '',
        dueDate: '',
        startDate: '',
        type: [],
    });

    function handleChange(e: ChangeEvent | any) {
        const key = e.target.id;
        const value = e.target.value;
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

      const [selectedRoles, setSelectedRoles] = useState<OptionType[]>([])


    const handleFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setData((values) => ({
            ...values,
            type: selectedRoles.map(role => role.id),
        }));

        post(route('projects.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setId(flash?.projectId);
                setOpen(true);
                reset();
                toast('Success', { description: 'Project has been created successfully' });
            },
            onError: (error) => {toast('Error', { description: 'Oops, something went wrong' });  console.log(error)},
        });
    };

    return (
        <MainLayout>
            <div className="space-y-6 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Project</h1>
                        <p className="text-muted-foreground">Create, assign and manage a new project.</p>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="name" className="text-gray-800 dark:text-gray-300">
                                Project Name
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={handleChange}
                                placeholder="Enter project name"
                                required
                                className="border-stone-800"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description" className="text-gray-800 dark:text-gray-300">
                                Description
                            </Label>
                            <Textarea
                                required
                                id="description"
                                value={data.description}
                                onChange={handleChange}
                                placeholder="Describe the project description"
                                rows={3}
                                className="border-stone-800"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="type" className="text-gray-800 dark:text-gray-300">
                                Project type
                            </Label>
                            {/* <CustomSelect
                                onChange={(selected) => setData('type', selected ? selected.map((item) => item.id) : [])}
                                options={types}
                                getOptionLabel={(option: Type) => option.name}
                                getOptionValue={(option: Type) => option.id}
                                isMulti
                            /> */}
                            <MultiSelect
                                options={types}
                                value={selectedRoles}
                                onChange={setSelectedRoles}
                                placeholder="Select options"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="assignee" className="text-gray-800 dark:text-gray-300">
                                Assign to
                            </Label>
                            <Select value={data.assignee} onValueChange={(e) => setData('assignee', e)}>
                                <SelectTrigger className="border-stone-800">
                                    <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                    {admins.map((user: Props) => (
                                        <SelectItem key={user.id} value={user.id.toString()}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.assignee} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority" className="text-gray-800 dark:text-gray-300">
                                Priority
                            </Label>
                            <Select value={data.priority} onValueChange={(e) => setData('priority', e)}>
                                <SelectTrigger className="border-stone-800">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priorities.map((priority: PrioritiesType) => (
                                        <SelectItem key={priority.id} value={priority.name}>
                                            {priority.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.priority} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="project" className="text-gray-800 dark:text-gray-300">
                                Start date
                            </Label>
                            <Input id="startDate" type="date" value={data.startDate} onChange={handleChange} className="border-stone-800" />
                            <InputError message={errors.startDate} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dueDate" className="text-gray-800 dark:text-gray-300">
                                Due Date
                            </Label>
                            <Input id="dueDate" type="date" value={data.dueDate} onChange={handleChange} className="border-stone-800" />
                            <InputError message={errors.dueDate} />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        Create Project
                    </Button>
                </form>
            </div>
            {flash?.projectId && <ProjectSuccessModal open={open} setOpen={setOpen} id={id?.toString()} name={data.name} />}
        </MainLayout>
    );
};

export default Create;

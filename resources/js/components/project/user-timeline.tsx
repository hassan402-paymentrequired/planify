/* eslint-disable @typescript-eslint/no-explicit-any */
import { Project, TaskProps, User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { DatePicker } from '../date-picker';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import UserMinicard from '../user-mini-card';
import { useState } from 'react';

const UserTimeline = ({ users, project }: { users: User[]; project: Project }) => {
    const { errors: verrors } = usePage().props;
    const [openDialogForUser, setOpenDialogForUser] = useState<string | null>(null);

    const { data, setData, patch, processing, errors, reset } = useForm<TaskProps>({
        task: '',
        startDate: new Date(),
        dueDate: new Date(),
        user_id: '',
    });

    const submit = (user_id: string) => {
        console.log(data)
        setData('user_id', user_id);
        patch(route('projects.attach_user', { project: project?.id }), {
            onSuccess: (params_0) => {
                const { props } = params_0 as unknown as { props: { flash: string } };
                toast.success(props.flash);
                setOpenDialogForUser(null);
                reset();
            },
            onError: () => {
                toast.error('something went wrong please try again later');
            },
        });
    };

    const handleDateChange = (date: Date, label: string | null | any = null) => {
        setData(label, date);
    };

    console.log(verrors, errors)

    return (
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user: User) => {
                return (
                    <div
                        key={user?.id}
                        className="flex flex-col rounded-lg border border-gray-200 bg-white/90 p-4 shadow-sm dark:border-gray-800 dark:bg-black/40"
                    >
                        <UserMinicard user={user} />

                        <Dialog
                            open={openDialogForUser === user.id.toString()}
                            onOpenChange={(isOpen) => setOpenDialogForUser(isOpen ? user.id.toString() : null)}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => setOpenDialogForUser(user.id.toString())}
                                    className="mt-auto border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                                >
                                    Unboard
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="border-gray-200 bg-white text-gray-800 sm:max-w-md dark:border-gray-700 dark:bg-black dark:text-white">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Settings className="h-3.5 w-3.5" />
                                        Configure {user.name} Timeline
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="space-y-3">
                                    <Label htmlFor={`details`}>
                                        what {user?.name} will be doing on {project?.name}
                                    </Label>
                                    <Textarea
                                        required
                                        id="description"
                                        value={data.task}
                                        onChange={(e) => setData('task', e.target.value)}
                                        placeholder="action on project"
                                        rows={3}
                                        className="mt-2 border-stone-800"
                                    />

                                    {verrors?.task && <InputError message={verrors.task} />}

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="project" className="text-gray-800 dark:text-gray-300">
                                                Start date
                                            </Label>
                                            <DatePicker date={data.startDate} setDate={handleDateChange} label="startDate" />
                                            <InputError message={errors.startDate} />
                                            {verrors?.task && <InputError message={verrors.startDate} />}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dueDate" className="text-gray-800 dark:text-gray-300">
                                                Due Date
                                            </Label>
                                            <DatePicker date={data.dueDate} setDate={handleDateChange} label="dueDate" />
                                            <InputError message={errors.dueDate} />
                                            {verrors?.task && <InputError message={verrors.dueDate} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <Button className="w-full" disabled={processing} onClick={() => submit(user?.id.toString())}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                );
            })}
        </div>
    );
};

export default UserTimeline;

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import formatDate from '@/lib/utils';
import { Delete, Edit, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { DatePicker } from '../date-picker';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const ProjectUserCard = ({ user, project }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [startDate, setStartDate] = useState(user.pivot.start_date);
    const [endDate, setEndDate] = useState(user.pivot.end_date);

    const handleDelete = () => {
        // Your delete logic here
        setShowDeleteDialog(false);
    };

    const handleEdit = () => {
        // Your edit logic here
        setShowEditDialog(false);
    };

    return (
        <div className="bg-sidebar group relative border-2 p-4 pt-2 dark:border-neutral-800 dark:bg-black/40">
            <div className="absolute top-2 right-2 hidden items-center gap-1 group-hover:flex">
                <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setShowEditDialog(true)}>
                            <Edit />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit timeline</DialogTitle>
                            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="grid gap-1 w-full">
                                    <Label htmlFor="name-1">Start Date</Label>
                                    <DatePicker   />
                                </div>
                                <div className="grid gap-1">
                                    <Label htmlFor="username-1">End date</Label>
                                    <DatePicker  />
                                </div>
                            </div>
                            <div className="grid gap-1 mt-2">
                                <Label htmlFor="username-1">Purpose</Label>
                                <Textarea />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button onClick={handleEdit}>Save</Button>
                            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(true)}>
                            <Delete />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete User</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to remove {user.name} from {project.name}?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="destructive" onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded border border-gray-200 dark:border-gray-800">
                        <AvatarImage src={`httsvg?seed=${user.id}`} alt={user.name} />
                        <AvatarFallback className="rounded">
                            <UserCircle2 className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-xl dark:text-gray-300">{user.name}</p>
                        <span className="text-xs">{user.email}</span>
                    </div>
                </div>

                <p className="mt-1 text-sm dark:text-gray-200">{user.pivot.purpose}</p>
            </div>
            <div className="flex items-center">
                <div className="text-sm">
                    <span className="leading-none font-semibold dark:text-gray-300">Role: {user.roles[0].display_name}</span>
                    <p className="flex items-center gap-2 text-gray-300">
                        <strong className="leading-none font-semibold dark:text-gray-400">From:</strong>
                        {formatDate(user.pivot.start_date)}
                    </p>
                    <p className="flex items-center gap-2 text-gray-300">
                        <strong className="leading-none font-semibold dark:text-gray-400">To:</strong>
                        {formatDate(user.pivot.end_date)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectUserCard;

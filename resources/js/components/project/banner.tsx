import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import formatDate from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Archive,
    Bot,
    Calendar,
    HeartHandshake,
    History,
    MoreVertical,
    PenSquare,
    Trash2,
    User,
    UserMinus,
    Users,
    Workflow,
} from 'lucide-react';
import { useState } from 'react';

import { toast } from 'sonner';
import { ProjectToggle } from '../ProjectToggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CardContent, CardHeader } from '../ui/card';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import ProjectChart from './project-chart';

const Banner = ({ project }) => {
    const { patch } = useForm();
    const [agentToDeactivate, setAgentToDeactivate] = useState<string | null>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [skipConfirmation, setSkipConfirmation] = useState(() => {
        const saved = localStorage.getItem('skipAgentDeactivationConfirmation');
        return saved === 'true';
    });

    const handleToggleStatus = (e: React.MouseEvent, agentId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setAgentToDeactivate(agentId);
        setConfirmDialogOpen(true);
    };

    const handleSkipConfirmationChange = (checked: boolean) => {
        setSkipConfirmation(checked);
        localStorage.setItem('skipAgentDeactivationConfirmation', checked.toString());
    };

    const handleConfirmDeactivation = () => {
        patch(route('projects.status.update', { project: agentToDeactivate }), {
            preserveScroll: true,
            onSuccess: (params_0) => {
                const { props } = params_0 as unknown as { props: { flash: string } };
                toast.success(props.flash);
            },
        });

        setConfirmDialogOpen(false);
        setAgentToDeactivate(null);
    };

    const handleCancelDeactivation = () => {
        setConfirmDialogOpen(false);
        setAgentToDeactivate(null);
    };

    

    return (
        <>
            <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            Deactivate Project?
                        </AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to deactivate this project?.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex items-center space-x-2 py-3">
                        <Checkbox id="skipConfirmation" checked={skipConfirmation} onCheckedChange={handleSkipConfirmationChange} />
                        <label
                            htmlFor="skipConfirmation"
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Don't ask me again
                        </label>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDeactivation}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDeactivation} className="bg-primary">
                            Deactivate
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="mb-3">
                <CardHeader className="pb-3">
                    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[auto_1fr_auto]">
                        <div className="relative">
                            <Avatar className="border-agent-primary/30 h-16 w-16 rounded border-2">
                                <AvatarImage src={`htvg?seed=`} alt="{agent.name}" />
                                <AvatarFallback className="bg-agent-primary/20 text-agent-primary rounded">
                                    <Bot className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold uppercase">{project?.name}</h1>

                                <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-500">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
                                        {project?.status.replace('_', ' ')}
                                    </span>
                                </Badge>
                            </div>
                            <div className="mt-2 space-x-3">
                                {project?.types?.map((type) => (
                                    <Badge variant="outline" key={type?.id}>
                                        <Workflow className="mr-1 h-3 w-3" />
                                        <span className="text-xs">{type?.name}</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-3">
                            <ProjectToggle isActive={project.status === 'in_progress'} onToggle={(e) => handleToggleStatus(e, project.id)} />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="hover:bg-secondary">
                                        <MoreVertical className="text-muted-foreground h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                                        <PenSquare className="text-muted-foreground h-4 w-4" />
                                        <span>Edit Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                                        <UserMinus className="text-muted-foreground h-4 w-4" />
                                        <span>Deactivate Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                                        <Archive className="text-muted-foreground h-4 w-4" />
                                        <span>Archive Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex cursor-pointer items-center gap-2 text-red-400">
                                        <Trash2 className="h-4 w-4" />
                                        <span>Delete Project</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <p className="text-muted-foreground mt-1.5 max-w-5xl">{project?.description}</p>

                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Users className="h-4 w-4" />
                            {project.users.length ? (
                                project.users.map((user) => (
                                    <Avatar className="size-5">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                ))
                            ) : (
                                <p className="text-sm text-gray-700 dark:text-gray-300">No Teams yet</p>
                            )}
                        </div>

                        <div className="text-muted-foreground mt-4 flex w-full justify-between text-xs">
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-1">
                                    <HeartHandshake className="text-muted-foreground h-3.5 w-3.5" />
                                    <span>Priority: {project?.priority}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="text-muted-foreground h-3.5 w-3.5" />
                                    <span>Assign To: {project?.assign_to?.name}</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                                    <span>Start date: {formatDate(project.start_date)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <History className="text-muted-foreground h-3.5 w-3.5" />
                                    <span>End date: {project.due_date ? formatDate(project.due_date) : 'Unknown'}</span>
                                </div>
                            </div>
                        </div>

                       <ProjectChart />
                    </div>
                </CardContent>
            </div>
        </>
    );
};

export default Banner;

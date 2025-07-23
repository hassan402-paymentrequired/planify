import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/layouts/main-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, Archive, BoltIcon, Edit, Eye, HeartPulse, MoreVertical, PlusCircle, Power, Search, UserCircle2, Users } from 'lucide-react';
import { useState } from 'react';
// import { useToast } from "@/components/ui/use-toast";
import { ProjectToggle } from '@/components/ProjectToggle';
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BreadcrumbItem, User } from '@/types';
import { OptionType } from '@/types/global';
import { toast } from 'sonner';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'dashboard',
        href: '/',
    },
];

export default function Index({ projects }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { patch } = useForm();

    // console.log(projects)

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [agentToDeactivate, setAgentToDeactivate] = useState<string | null>(null);
    const [skipConfirmation, setSkipConfirmation] = useState(() => {
        const saved = localStorage.getItem('skipAgentDeactivationConfirmation');
        return saved === 'true';
    });
    const [agents, setAgents] = useState<any[]>([]);
    const [filteredAgents, setFilteredAgents] = useState<any[]>([]);

    const [sortBy, setSortBy] = useState<string>('recent');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterChannel, setFilterChannel] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    console.log(projects);
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

    const handleEditAgent = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleArchiveAgent = (e: React.MouseEvent, agentId: string) => {
        e.preventDefault();
        e.stopPropagation();

        setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== agentId));
        setFilteredAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== agentId));
    };

    const handleViewDetails = (e: React.MouseEvent, agentId: string) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const formatCreatedAt = (dateStr: string): string => {
        if (dateStr === 'Just now') return dateStr;

        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - date.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                return 'Today';
            } else if (diffDays === 1) {
                return 'Yesterday';
            } else if (diffDays < 7) {
                return `${diffDays} days ago`;
            } else if (diffDays < 30) {
                return `${Math.floor(diffDays / 7)} weeks ago`;
            } else {
                return date.toLocaleDateString();
            }
        } catch (e) {
            return dateStr;
        }
    };

    const getTimeElapseColor = (start: string, end: string | null) => {
        if (end === null) return 'bg-gray-500';
        const date = new Date(end).getTime() - new Date(start).getTime();
        if (date >= 90 * 24 * 60 * 60 * 1000) return 'bg-red-500';
        if (date >= 75 * 24 * 60 * 60 * 1000) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getPriority = (name: string) => {
        switch (name.toLowerCase()) {
            case 'high':
                return <Badge variant="secondary">{name}</Badge>;
            case 'medium':
                return <Badge variant="default">{name}</Badge>;
            case 'critical':
                return <Badge variant="destructive">{name}</Badge>;
            default:
                return <Badge variant="default">{name}</Badge>;
        }
    };

    return (
        <MainLayout crumb={breadcrumb}>
            <Head title="Dashboard" />

            <div className="parent-dash mx-auto max-w-7xl space-y-8">
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

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-fg text-3xl font-semibold tracking-tight">Projects</h1>
                        <p className="text-fgMuted mt-1">Create, customize, and manage your projects all in one place</p>
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="text-fgMuted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            placeholder="Search by name or purpose..."
                            className="w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="bg-bg border-border w-[180px]">
                                <SelectValue placeholder="Bot Function" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Project Managers</SelectItem>
                                <SelectItem value="Customer Service">Tammy kailo</SelectItem>
                                <SelectItem value="Sales & Marketing">Eseosa</SelectItem>
                                <SelectItem value="Technical Support">Oyidamola</SelectItem>
                                <SelectItem value="IT Helpdesk">John doe</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterChannel} onValueChange={setFilterChannel}>
                            <SelectTrigger className="bg-bg border-border w-[140px]">
                                <SelectValue placeholder="Project Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Project Type</SelectItem>
                                <SelectItem value="voice">Web</SelectItem>
                                <SelectItem value="chat">Api</SelectItem>
                                <SelectItem value="email">Mobile</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="bg-bg border-border w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="inactive">Archive</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="bg-bg border-border w-[140px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Most Recent</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {(projects || []).length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-16">
                        <BoltIcon className="text-fgMuted h-16 w-16 opacity-80" />
                        <h2 className="text-fg text-2xl font-semibold">No Project Found</h2>
                        <p className="text-fgMuted">{searchTerm ? 'Try a different search term' : 'Create your first Project to get started'}</p>
                        {!searchTerm && (
                            <Link href={route('projects.create')} className="brand-button mt-2">
                                <Button>Create Your First Project</Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Link href={route('projects.create')} className="block">
                            <Card className="card-hover border-agent-primary/30 hover:border-agent-primary/70 h-full border-2 border-dashed bg-transparent transition-all hover:bg-gray-50 dark:hover:bg-gray-900/30">
                                <div className="flex h-full flex-col items-center justify-center py-10">
                                    <div className="bg-agent-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                        <PlusCircle className="text-agent-primary h-6 w-6" />
                                    </div>
                                    <h3 className="text-foreground text-lg font-medium dark:text-white">Create New Project</h3>
                                    <p className="text-muted-foreground mt-2 max-w-xs text-center text-sm dark:text-gray-400">
                                        Create a new project and start adding your tasks, or invite your team members to collaborate.
                                    </p>
                                </div>
                            </Card>
                        </Link>

                        {projects.map((project) => (
                            <Link href={route('projects.show', { project: project.id })} key={project.id} className="block">
                                <Card className="card-hover h-full gap-3 rounded p-3">
                                    <CardHeader className="px-2">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-800">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${project.id}`}
                                                        alt={project.name}
                                                    />
                                                    <AvatarFallback>
                                                        <UserCircle2 className="h-6 w-6" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="text-foreground font-medium dark:text-white">{project?.name}</h3>
                                                    <p className="text-muted-foreground text-xs dark:text-gray-400">{project?.assign_to?.name}</p>
                                                </div>
                                            </div>
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="z-50 w-48 bg-white dark:bg-gray-900">
                                                    <DropdownMenuItem onClick={(e) => handleToggleStatus(e, project.id, project.status)}>
                                                        <Power className="mr-2 h-4 w-4" />
                                                        {project.status}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => handleEditAgent(e, project.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit project
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => handleViewDetails(e, project.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => handleArchiveAgent(e, project.id)}>
                                                        <Archive className="mr-2 h-4 w-4" />
                                                        Archive Project
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="mt-3">
                                            <CardDescription className="text-muted-foreground mb-2 line-clamp-2 dark:text-gray-300">
                                                {project.description}
                                            </CardDescription>

                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <HeartPulse className="h-4 w-4" />
                                                    <span className="text-muted-foreground text-xs dark:text-gray-400">
                                                        {getPriority(project.priority)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <Users className="h-4 w-4" />
                                                    {project.users.length ? (
                                                        project.users.map((user: User) => (
                                                            <Avatar className="size-5">
                                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                                            </Avatar>
                                                        ))
                                                    ) : (
                                                        <p className="text-sm text-gray-700 dark:text-gray-300">No Teams yet</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="px-2">
                                        <div>
                                            <div className="mb-1 flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Time Covered</span>
                                                {/* <span className="font-medium text-gray-900 dark:text-gray-100">{member.workload}%</span> */}
                                                <span className="font-medium text-gray-900 dark:text-gray-100">65%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className={`h-2 rounded-full ${getTimeElapseColor(project.start_date, project.due_date)}`}
                                                    style={{ width: `65%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex flex-col space-y-2">
                                            <div className="flex flex-wrap gap-2">
                                                {project?.types?.map((type: OptionType) => (
                                                    <Badge variant="outline" className="w-fit" key={type.id}>
                                                        {type.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex items-center justify-between border-t px-2 pt-4">
                                        <ProjectToggle
                                            isActive={project.status === 'in_progress'}
                                            onToggle={(e) => handleToggleStatus(e, project.id, project.status)}
                                        />
                                        {getPriority(project.priority)}
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

import { ProjectToggle } from '@/components/ProjectToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProjectLayout from '@/layouts/project/layout';
import { Link } from '@inertiajs/react';
import { Bot, Edit, Eye, MoreVertical, PlusCircle, Power, Search, UserCircle2 } from 'lucide-react';
import { useState } from 'react';

const Team = ({ project }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleArchiveAgent = () => {
        //
    }
    return (
        <ProjectLayout project={project}>
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
                    <Select>
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
                </div>
            </div>

            {(project?.users || []).length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-16">
                    <Bot className="text-fgMuted h-16 w-16 opacity-80" />
                    <h2 className="text-fg text-2xl font-semibold">No User Found</h2>
                    <p className="text-fgMuted">{searchTerm ? 'Try a different search term' : 'Create your first agent to get started'}</p>
                    {!searchTerm && (
                        <Link href={route('projects.add_user', {project: project?.id})} className="brand-button mt-2">
                            <Button>Add Your First User </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Link href="/mt/projects/create" className="block">
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

                    {project?.users?.map((user) => (
                        <Link href={`/agents/`} key={user.id} className="block">
                            <Card className="card-hover h-full">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-800">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed`} alt={user.name} />
                                                <AvatarFallback>
                                                    <UserCircle2 className="h-6 w-6" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-foreground font-medium dark:text-white">{user?.name}</h3>
                                                <p className="text-muted-foreground text-xs dark:text-gray-400">{user?.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="z-50 w-48 bg-white dark:bg-gray-900">
                                                <DropdownMenuItem >
                                                    <Power className="mr-2 h-4 w-4" />
                                                    {user?.status === 'active' ? 'Deactivate' : 'Activate'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Agent
                                                </DropdownMenuItem>
                                                <DropdownMenuItem >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="mt-3">
                                        <CardDescription className="text-muted-foreground mb-2 line-clamp-2 dark:text-gray-300">
                                            {user.description}
                                        </CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-col space-y-4">
                                        <div className="mt-2 flex flex-wrap gap-2">

                                         
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex items-center justify-between border-t pt-4">
                                    <ProjectToggle
                                        isActive={user?.status === 'active'}
                                        onToggle={(e) => console.log(e)}
                                    />
                                    <div className="text-foreground text-sm font-medium dark:text-white">View Details &rarr;</div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </ProjectLayout>
    );
};

export default Team;

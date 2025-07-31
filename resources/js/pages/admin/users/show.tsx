/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/main-layout';
import formatDate from '@/lib/utils';
import { OptionType } from '@/types/global';
import { Head, Link } from '@inertiajs/react';
import { BoltIcon, Calendar, HeartHandshake, User, UserCircle2 } from 'lucide-react';

export interface User {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    projects: any[];
    ongoing_projects_count?: number;
    managed_ongoing_projects_count?: number;
    managed_completed_projects_count?: number;
    completed_projects_count?: number;
    projects_count?: number;
    projectassigned: any[];
    roles: any[]
}

const UserDetails = ({ user }: { user: User }) => {
    const mapper = user.roles[0].name !== "project_manager" ? user.projects : user.projectassigned;
    return (
        <MainLayout
            crumb={[
                { title: 'Admin', href: '/admin' },
                { title: 'Users', href: '/admin/users' },
                { title: user.name, href: '#' },
            ]}
        >
            <Head title="User Details :: Admin" />
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="mb-4 h-24 w-24 rounded border border-gray-200 bg-gray-100 dark:border-gray-800">
                        <AvatarImage src={`htt${user.id}`} alt={user.name} />
                        <AvatarFallback className="rounded">
                            <UserCircle2 className="h-12 w-12 text-gray-400" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-fg text-3xl font-semibold tracking-tight">{user.name}</h1>
                        <p className="text-fgMuted mt-1">{user.email}</p>
                    </div>
                </div>
                <Link href="#">
                    <Button>Edit</Button>
                </Link>
            </div>

            <div className="text-muted-foreground mt-4 flex w-full justify-between text-xs">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1">
                        <HeartHandshake className="text-muted-foreground h-3.5 w-3.5" />
                        <span>Total project: {user?.projects_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="text-muted-foreground h-3.5 w-3.5" />
                        <span>Ongoing Project: {user?.ongoing_projects_count || user?.managed_ongoing_projects_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="text-muted-foreground h-3.5 w-3.5" />
                        <span>Completed Project: {user?.completed_projects_count || user?.managed_completed_projects_count}</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1">
                        <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                        <span>Join at: {formatDate(user.created_at)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Tabs defaultValue="projects">
                    <TabsList className="w-full">
                        {/* <TabsTrigger value="account">Details</TabsTrigger> */}
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>

                    {/* <TabsContent value="account">
                        dd
                    </TabsContent> */}

                    <TabsContent value="projects">
                        <div className="grid grid-cols-2 gap-5">
                            {(mapper || []).map((project) => (
                                <Link href={route('projects.show', { project: project.id })} key={project.id} className="block">
                                    <Card className="card-hover h-full gap-3 rounded p-3">
                                        <CardHeader className="px-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12 rounded border border-gray-200 dark:border-gray-800">
                                                        <AvatarImage src={`httsvg?seed=${project.id}`} alt={project.name} />
                                                        <AvatarFallback className="rounded">
                                                            <UserCircle2 className="h-6 w-6" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="text-foreground font-medium dark:text-white">{project?.name}</h3>
                                                        <p className="text-muted-foreground text-xs dark:text-gray-400">{project?.assign_to?.name}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <CardDescription className="text-muted-foreground mb-2 line-clamp-2 dark:text-gray-300">
                                                    {project.description}
                                                </CardDescription>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="px-2">
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
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {mapper.length === 0 && (
                            <div className="flex flex-col items-center justify-center space-y-4 py-16">
                                <BoltIcon className="text-fgMuted h-16 w-16 opacity-80" />
                                <h2 className="text-fg text-2xl font-semibold">No Project Found</h2>

                                <Link href={route('projects.index')} className="brand-button mt-2">
                                    <Button>Unboard {user.name} on a project</Button>
                                </Link>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
};

export default UserDetails;

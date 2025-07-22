/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/main-layout';
import { OptionType } from '@/types/global';
import { Head, Link } from '@inertiajs/react';
import { BoltIcon, UserCircle2 } from 'lucide-react';

export interface User {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    projects: any[];
}

const UserDetails = ({ user }: { user: User }) => {
    return (
        <MainLayout>
            <Head title="User Details :: Admin" />
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-fg text-3xl font-semibold tracking-tight">{user.name}</h1>
                    <p className="text-fgMuted mt-1">{user.email}</p>
                </div>
                <Link href="#">
                    <Button>Edit</Button>
                </Link>
            </div>

            <div className="mt-8">
                <Tabs defaultValue="account">
                    <TabsList className="w-full">
                        <TabsTrigger value="account">Details</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account">
                        <div className="flex justify-center">
                            <div className="w-full">
                                <Card className="flex flex-col items-start rounded p-6">
                                    <div className="flex w-full gap-10">
                                        <div className="flex flex-col items-start">
                                            <Avatar className="mb-4 h-24 w-24 border border-gray-200 bg-gray-100 dark:border-gray-800">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`} alt={user.name} />
                                                <AvatarFallback>
                                                    <UserCircle2 className="h-12 w-12 text-gray-400" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <h3 className="mb-2 text-center text-xl font-semibold">{user?.name}</h3>
                                            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                                                <span className="flex items-center gap-1 text-sm text-green-600">
                                                    <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                                                    Active
                                                </span>
                                                {/* Example roles, replace with your actual roles */}
                                                <span className="text-sm text-gray-500">|</span>
                                                <Badge variant="outline" className="px-2 py-1 text-xs">
                                                    System Developer
                                                </Badge>
                                                <span className="text-sm text-gray-500">|</span>
                                                <Badge variant="outline" className="px-2 py-1 text-xs">
                                                    Overall Admin
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2">//TODO</div>
                                    </div>

                                    <hr className="my-4 w-full border-gray-200" />
                                    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="dark:text-gray-200">
                                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                                        <path d="M4 4h16v16H4V4z" fill="none" />
                                                        <path
                                                            d="M16 2v2M8 2v2M4 6h16M4 20h16V6H4v14z"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M12 11v6M9 14h6"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="text-sm dark:text-gray-200">{user?.email}</span>
                                                <Badge variant="outline" className="px-2 py-0.5 text-xs">
                                                    Unverified
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500">
                                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                                        <path
                                                            d="M8 7V3h8v4M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="text-sm dark:text-gray-200">
                                                    Joined{' '}
                                                    {user?.created_at
                                                        ? new Date(user.created_at).toLocaleDateString('en-US', {
                                                              year: 'numeric',
                                                              month: 'short',
                                                              day: '2-digit',
                                                          })
                                                        : '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="projects">
                        <div className="flex flex-wrap gap-5">
                            {user.projects.map((project) => (
                                <Link href={route('project.show', { project: project.id })} key={project.id} className="block">
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

                        {user.projects.length === 0 && (
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

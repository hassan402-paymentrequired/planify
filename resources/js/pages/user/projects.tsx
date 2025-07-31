import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { User } from '@/types';
import { OptionType } from '@/types/global';
import { Link } from '@inertiajs/react';
import { Badge, HeartPulse, UserCircle2, Users } from 'lucide-react';
import { getPriority, getTimeElapseColor } from '../admin/projects';

const UserProjects = ({ projects }) => {
    return (
        <div className='grid gap-10 sm:grid-cols-2'>
            {projects.map((project) => (
                <Link href={route('projects.show', { project: project.id })} key={project.id} className="block">
                    <Card className="card-hover h-full gap-3 rounded p-3">
                        <CardHeader className="px-2">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-800">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${project.id}`} alt={project.name} />
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

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                        <HeartPulse className="h-4 w-4" />
                                        <span className="text-muted-foreground text-xs dark:text-gray-400">{getPriority(project.priority)}</span>
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
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default UserProjects;

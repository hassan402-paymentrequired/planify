import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/main-layout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react'; // Added missing import
import UserProjects from './projects';
import UserTasks from './tasks';

interface Task {
    id: number;
    name: string;
    description?: string;
    // Add other fields as needed
}

interface Project {
    id: number;
    name: string;
    status: string;
    user_tasks: Task[];
}

interface Props {
    totalProjects: number;
    ongoingProjectsCount: number;
    completedProjectsCount: number;
    projects: Project[];
    tasks: any[];
}

const breadcrumb = [
    {
        title: 'dashboard',
        href: '/',
    },
];

export default function UserDashboard({ totalProjects = 0, ongoingProjectsCount = 0, completedProjectsCount = 0, projects = [], tasks }: Props) {
    const {auth: {user}} = usePage().props;

    return (
        <MainLayout crumb={breadcrumb}>
            <div className="p-8">
                <Head title="User Dashboard" />
                <h1 className="mb-6 text-3xl font-bold">Welcome {user.name}!</h1>
                {/* Analytics */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded bg-white p-4 shadow ring dark:bg-black/30">
                        <h2 className="mb-2 text-lg font-semibold">Total Projects</h2>
                        <div className="text-2xl font-bold">{totalProjects}</div>
                    </div>
                    <div className="rounded bg-white p-4 shadow ring dark:bg-black/30">
                        <h2 className="mb-2 text-lg font-semibold">Ongoing Projects</h2>
                        <div className="text-2xl font-bold">{ongoingProjectsCount}</div>
                    </div>
                    <div className="rounded bg-white p-4 shadow ring dark:bg-black/30">
                        <h2 className="mb-2 text-lg font-semibold">Completed Projects</h2>
                        <div className="text-2xl font-bold">{completedProjectsCount}</div>
                    </div>
                </div>
                {/* Ongoing Projects List */}
                <div className="mt-3">
                    <Tabs defaultValue="projects">
                        <TabsList className="w-full">
                            <TabsTrigger value="projects">Projects</TabsTrigger>
                            <TabsTrigger value="tasks">Tasks</TabsTrigger>
                            <TabsTrigger value="issues">Issues</TabsTrigger>
                        </TabsList>

                        <TabsContent value="projects">
                            <UserProjects projects={projects} />
                        </TabsContent>
                        <TabsContent value="tasks">
                            <UserTasks tasks={tasks} />
                        </TabsContent>

                        <TabsContent value="issues">i</TabsContent>
                    </Tabs>
                </div>
            </div>
        </MainLayout>
    );
}

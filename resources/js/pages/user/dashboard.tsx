import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';
import React from 'react'; // Added missing import

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
    ongoingProjects: Project[];
}

export default function UserDashboard({ totalProjects = 0, ongoingProjectsCount = 0, completedProjectsCount = 0, ongoingProjects = [] }: Props) {
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

    return (
        <MainLayout>
            <div className="p-8">
                <Head title="User Dashboard" />
                <h1 className="mb-6 text-3xl font-bold">Welcome!</h1>
                {/* Analytics */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded bg-white p-4 shadow dark:bg-black/30">
                        <h2 className="mb-2 text-lg font-semibold">Total Projects</h2>
                        <div className="text-2xl font-bold">{totalProjects}</div>
                    </div>
                    <div className="rounded bg-white p-4 shadow dark:bg-black/30">
                        <h2 className="mb-2 text-lg font-semibold">Ongoing Projects</h2>
                        <div className="text-2xl font-bold">{ongoingProjectsCount}</div>
                    </div>
                    <div className="rounded bg-white p-4 shadow dark:bg-black/30">
                        <h2 className="mb-2 text-lg font-semibold">Completed Projects</h2>
                        <div className="text-2xl font-bold">{completedProjectsCount}</div>
                    </div>
                </div>
                {/* Ongoing Projects List */}
                <div className="mb-8">
                    <h2 className="mb-2 text-xl font-semibold">Ongoing Projects</h2>
                    {ongoingProjects.length === 0 ? (
                        <div className="text-gray-500 italic">No ongoing projects.</div>
                    ) : (
                        <ul className="space-y-2">
                            {ongoingProjects.map((project) => (
                                <li key={project.id}>
                                    <button className="font-medium text-blue-600 hover:underline" onClick={() => setSelectedProject(project)}>
                                        {project.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Project Tasks Modal/Section */}
                {selectedProject && (
                    <div className="mb-8 rounded bg-white p-4 shadow dark:bg-black/30">
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">My Tasks for {selectedProject.name}</h3>
                            <button className="text-red-500" onClick={() => setSelectedProject(null)}>
                                Close
                            </button>
                        </div>
                        {selectedProject.user_tasks.length === 0 ? (
                            <div className="text-gray-500 italic">No tasks assigned to you for this project.</div>
                        ) : (
                            <ul className="space-y-1">
                                {selectedProject.user_tasks.map((task) => (
                                    <li key={task.id} className="border-b py-2 last:border-b-0">
                                        <div className="font-medium">{task.name}</div>
                                        <div className="text-sm text-gray-600">{task.description}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

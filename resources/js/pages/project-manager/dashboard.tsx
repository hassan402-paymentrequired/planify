import { Head, Link } from '@inertiajs/react';

export default function ProjectManagerDashboard() {
    return (
        <div className="p-8">
            <Head title="Project Manager Dashboard" />
            <h1 className="mb-6 text-3xl font-bold">Welcome, Project Manager!</h1>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded bg-white p-4 shadow dark:bg-black/30">
                    <h2 className="mb-2 text-lg font-semibold">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/mt/projects" className="text-blue-600 hover:underline">
                                My Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/mt/projects/create" className="text-blue-600 hover:underline">
                                Create Project
                            </Link>
                        </li>
                        <li>
                            <Link href="/mt/users" className="text-blue-600 hover:underline">
                                Team Members
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="rounded bg-white p-4 shadow dark:bg-black/30">
                    <h2 className="mb-2 text-lg font-semibold">Active Projects</h2>
                    <ul className="space-y-1">
                        <li>Project Alpha (5 tasks in progress)</li>
                        <li>Project Beta (2 tasks in review)</li>
                        <li>Project Gamma (completed)</li>
                    </ul>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="mb-2 text-xl font-semibold">Team Overview</h2>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                    <li>Jane Smith (Frontend Developer)</li>
                    <li>Mike Johnson (Backend Developer)</li>
                    <li>Lisa Brown (Designer)</li>
                </ul>
            </div>
        </div>
    );
}

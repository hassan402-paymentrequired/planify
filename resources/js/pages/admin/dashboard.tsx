import { DashboardChartBar } from '@/components/dashboard/chart';
import MiniCard from '@/components/dashboard/mini-card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MainLayout from '@/layouts/main-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

interface Staff {
    id: number;
    name: string;
    email: string;
    phone_number: string | null;
    email_verified_at: string | null;
    password: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    roles: { name: string; display_name: string }[];
    project_count?: number;
    ongoing_projects: number;
    completed_projects: number;
    total_projects: number;
}

interface ProjectStatusCount {
    [status: string]: number;
}

interface Props {
    totalUsers: number;
    totalProjects: number;
    ongoingProjects: number;
    completedProjects: number;
    argentProjects: number;
    cancelledProjects: number;
    deactivatedProjects: number;
    unoccupiedStaff: number;
    projectStatusCount?: ProjectStatusCount;
    occupiedStaff: number;
    users: Staff[];
    projectsStaffChart: any[]
}

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'dashboard',
        href: '/'
    }
]

export default function AdminDashboard({
    totalProjects = 0,
    ongoingProjects = 0,
    completedProjects = 0,
    argentProjects = 0,
    deactivatedProjects = 0,
    unoccupiedStaff = 0,
    occupiedStaff = 0,
    users,
    projectsStaffChart
}: Props) {
    return (
        <MainLayout crumb={breadcrumb}>
            <Head title="Admin Dashboard" />

            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                <MiniCard name="Total projects" count={totalProjects} />
                <MiniCard name="ongoing projects" count={ongoingProjects} />
                <MiniCard name="completed projects" count={completedProjects} />
            </div>

            <div className="mt-10 grid h-[300px] max-h-[300px] grid-cols-1 gap-4 overflow-hidden sm:grid-cols-3 md:gap-0">
                <div className="bg-sidebar grid gap-2 p-2 md:grid-cols-2 dark:bg-neutral-900">
                    <div className="grid gap-2">
                        <div className="group grid cursor-pointer rounded-md bg-gray-200 p-2 dark:bg-black/50">
                            <div className="flex w-full items-start justify-between">
                                <span className="text-sm font-semibold capitalize">occupied staff</span>
                                <div className="bg-sidebar flex size-7 items-center justify-center rounded-full group-hover:ring-2 group-hover:ring-green-700 dark:bg-neutral-900">
                                    <ArrowUpRight size={15} className="transition-all duration-300 group-hover:scale-75 group-hover:rotate-45" />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="mt-auto text-2xl font-bold sm:text-3xl dark:text-neutral-500">{occupiedStaff}</p>
                            </div>
                        </div>
                        <div className="group grid cursor-pointer rounded-md bg-gray-200 p-2 dark:bg-black/50">
                            <div className="flex w-full items-start justify-between">
                                <span className="text-sm font-semibold capitalize">Unoccupied staff</span>
                                <div className="bg-sidebar flex size-7 items-center justify-center rounded-full group-hover:ring-2 group-hover:ring-green-700 dark:bg-neutral-900">
                                    <ArrowUpRight size={15} className="transition-all duration-300 group-hover:scale-75 group-hover:rotate-45" />
                                </div>
                            </div>
                            <div className="flex">
                                <p className="mt-auto text-2xl font-bold sm:text-3xl dark:text-neutral-500">{unoccupiedStaff}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <div className="group grid cursor-pointer rounded-md bg-gray-200 p-2 dark:bg-black/50">
                            <div className="flex w-full items-start justify-between">
                                <span className="text-sm font-semibold capitalize">urgent projects</span>
                                <div className="bg-sidebar flex size-7 items-center justify-center rounded-full group-hover:ring-2 group-hover:ring-green-700 dark:bg-neutral-900">
                                    <ArrowUpRight size={15} className="transition-all duration-300 group-hover:scale-75 group-hover:rotate-45" />
                                </div>
                            </div>
                            <div className="flex">
                                <p className="mt-auto text-2xl font-bold sm:text-3xl dark:text-neutral-500">{argentProjects}/{totalProjects}</p>
                            </div>
                        </div>
                        <div className="group grid cursor-pointer rounded-md bg-gray-200 p-2 dark:bg-black/50">
                            <div className="flex w-full items-start justify-between">
                                <span className="text-sm font-semibold capitalize">deactivated projects</span>
                                <div className="bg-sidebar flex size-7 items-center justify-center rounded-full group-hover:ring-2 group-hover:ring-green-700 dark:bg-neutral-900">
                                    <ArrowUpRight size={15} className="transition-all duration-300 group-hover:scale-75 group-hover:rotate-45" />
                                </div>
                            </div>
                            <div className="flex">
                                <p className="mt-auto text-2xl font-bold sm:text-3xl dark:text-neutral-500">{deactivatedProjects}/{totalProjects}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <DashboardChartBar chartData={projectsStaffChart} />
                </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
                {/* <div className="grid gap-3">
                    <div className="group grid rounded bg-gray-200 p-3 dark:bg-black/50">
                        <div className="w-full">
                            <div className="flex w-full items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-semibold capitalize">Argents projects</span>
                                </div>
                                <div className="bg-sidebar flex size-7 items-center justify-center rounded-full group-hover:ring-2 group-hover:ring-green-700 dark:bg-neutral-900">
                                    <ArrowUpRight
                                        size={15}
                                        className="transition-all duration-400 ease-in-out group-hover:scale-75 group-hover:rotate-45"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="mt-auto justify-self-end text-2xl font-bold sm:text-3xl dark:text-neutral-600">
                            {argentProjects}/{totalProjects}
                        </p>
                    </div>
                </div> */}
                <div className="col-span-3 grid">
                    <Table>
                        <TableCaption>A list of users and thier current work load.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead className="text capitalize">ongoing projects</TableHead>
                                <TableHead className="text capitalize">completed projects</TableHead>
                                <TableHead className="text-right capitalize">total projects</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow>
                                    <TableCell className="font-medium">{user.name}</TableCell>

                                    <TableCell className="">{user.ongoing_projects}</TableCell>
                                    <TableCell className="">{user.completed_projects}</TableCell>
                                    <TableCell className="text-right">{user.total_projects}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MainLayout>
    );
}

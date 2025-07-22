import { DashboardChartBar } from '@/components/dashboard/chart';
import MiniCard from '@/components/dashboard/mini-card';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';

interface Staff {
    id: number;
    name: string;
    email: string;
    roles: { name: string; display_name: string }[];
    project_count?: number;
}

interface ProjectStatusCount {
    [status: string]: number;
}

interface Props {
    totalUsers: number;
    totalProjects: number;
    totalRoles: number;
    workingStaff: Staff[]; // now 'occupiedStaff'
    unoccupiedStaff: Staff[];
    projectStatusCount?: ProjectStatusCount;
}

export default function AdminDashboard({
    totalUsers = 0,
    totalProjects = 0,
    totalRoles = 0,
    workingStaff = [],
    unoccupiedStaff = [],
    projectStatusCount = {},
}: Props) {
    return (
        <MainLayout>
            <Head title="Admin Dashboard" />

            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                <MiniCard />
                <MiniCard />
                <MiniCard />
            </div>

            <div className="w-full my-5">
d
            </div>

            <div className="mt-5">
                <DashboardChartBar />
            </div>
        </MainLayout>
    );
}

import { Chart } from '@/components/ui/chart';
import { Tooltip } from '@/components/ui/tooltip';
import MainLayout from '@/layouts/main-layout';
import { Head, Link } from '@inertiajs/react';
import { Activity, ArrowRight, Briefcase, CheckCircle, Shield, UserCheck, Users, UserX } from 'lucide-react';
import { useState } from 'react';

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

const analytics = [
    {
        label: 'Total Users',
        icon: <Users className="text-blue-600" size={28} />,
        key: 'totalUsers',
        color: 'bg-blue-50 dark:bg-background',
    },
    {
        label: 'Total Projects',
        icon: <Briefcase className="text-green-600" size={28} />,
        key: 'totalProjects',
        color: 'bg-green-50 dark:bg-background',
    },
    {
        label: 'Total Roles',
        icon: <Shield className="text-purple-600" size={28} />,
        key: 'totalRoles',
        color: 'bg-purple-50 dark:bg-background',
    },
    {
        label: 'Occupied Staff',
        icon: <UserCheck className="text-emerald-600" size={28} />,
        key: 'workingStaff',
        color: 'bg-emerald-50 dark:bg-background',
    },
];

export default function AdminDashboard({
    totalUsers = 0,
    totalProjects = 0,
    totalRoles = 0,
    workingStaff = [],
    unoccupiedStaff = [],
    projectStatusCount = {},
}: Props) {
    const [tab, setTab] = useState<'occupied' | 'unoccupied'>('occupied');

    // Pie chart for staff distribution
    const staffChartData = {
        labels: ['Occupied', 'Unoccupied'],
        datasets: [
            {
                label: 'Staff Distribution',
                data: [workingStaff.length, unoccupiedStaff.length],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.7)', // emerald
                    'rgba(34, 197, 94, 0.7)', // green
                ],
                borderColor: ['rgba(16, 185, 129, 1)', 'rgba(34, 197, 94, 1)'],
                borderWidth: 2,
            },
        ],
    };

    // Bar chart for project status
    const projectStatusLabels = Object.keys(projectStatusCount);
    const projectStatusData = {
        labels: projectStatusLabels,
        datasets: [
            {
                label: 'Projects by Status',
                data: projectStatusLabels.map((status) => projectStatusCount[status]),
                backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <MainLayout>
            <div className="p-4 md:p-8">
                <Head title="Admin Dashboard" />
                <h1 className="mb-8 text-3xl font-bold tracking-tight">👋 Welcome, Super Admin!</h1>
                {/* Analytics Cards */}
                <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {analytics.map((a) => (
                        <div key={a.label} className={`flex items-center gap-4 rounded-xl p-6 shadow-sm ${a.color}`}>
                            <div className="dark:bg-background rounded-full bg-white p-2 shadow-inner">{a.icon}</div>
                            <div>
                                <div className="text-2xl font-bold">
                                    {a.key === 'totalUsers'
                                        ? totalUsers
                                        : a.key === 'totalProjects'
                                          ? totalProjects
                                          : a.key === 'totalRoles'
                                            ? totalRoles
                                            : workingStaff.length}
                                </div>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{a.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Analytics Charts */}
                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="dark:bg-background rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Staff Distribution</h2>
                        <Chart type="pie" data={staffChartData} />
                    </div>
                    <div className="dark:bg-background rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Projects by Status</h2>
                        <Chart type="bar" data={projectStatusData} />
                    </div>
                </div>
                {/* Staff Tabs */}
                <div className="dark:bg-background mb-10 rounded-xl bg-white p-6 shadow">
                    <div className="mb-4 flex gap-4 border-b pb-2">
                        <button
                            className={`flex items-center gap-2 rounded-t-md px-3 py-1 font-semibold transition ${tab === 'occupied' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : 'text-gray-500 hover:text-emerald-600'}`}
                            onClick={() => setTab('occupied')}
                        >
                            <UserCheck size={18} /> Occupied Staff
                        </button>
                        <button
                            className={`flex items-center gap-2 rounded-t-md px-3 py-1 font-semibold transition ${tab === 'unoccupied' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'text-gray-500 hover:text-green-600'}`}
                            onClick={() => setTab('unoccupied')}
                        >
                            <UserX size={18} /> Unoccupied Staff
                        </button>
                    </div>
                    <div>
                        {(tab === 'occupied' ? workingStaff : unoccupiedStaff).length === 0 ? (
                            <div className="py-6 text-center text-gray-500 italic">No {tab} staff found.</div>
                        ) : (
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {(tab === 'occupied' ? workingStaff : unoccupiedStaff).map((staff) => (
                                    <li
                                        key={staff.id}
                                        className="flex items-center gap-4 rounded-lg px-2 py-3 transition hover:bg-gray-50 dark:hover:bg-gray-900/40"
                                    >
                                        {/* Avatar with initials */}
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-600">
                                            {staff.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 font-medium">
                                                {staff.name} <span className="text-xs text-gray-500">({staff.email})</span>
                                                {/* Project count badge */}
                                                <span className="ml-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                                                    {staff.project_count ?? 0} project{(staff.project_count ?? 0) === 1 ? '' : 's'}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {staff.roles.map((role) => (
                                                    <Tooltip key={role.name} content={role.name}>
                                                        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                                            {role.display_name}
                                                        </span>
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {tab === 'occupied' ? <CheckCircle className="text-green-500" /> : <Activity className="text-gray-400" />}
                                        </div>
                                        {/* Optional: View Profile or Assign Project button */}
                                        {/* <button className="ml-4 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">View Profile</button> */}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {/* Quick Links */}
                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Link
                        href="/admin/roles"
                        className="flex items-center gap-3 rounded-lg bg-blue-600 px-5 py-4 text-white shadow transition hover:bg-blue-700"
                    >
                        <Shield size={22} /> <span className="font-semibold">Manage Roles</span> <ArrowRight size={18} className="ml-auto" />
                    </Link>
                    <Link
                        href="/mt/users"
                        className="flex items-center gap-3 rounded-lg bg-green-600 px-5 py-4 text-white shadow transition hover:bg-green-700"
                    >
                        <Users size={22} /> <span className="font-semibold">Manage Users</span> <ArrowRight size={18} className="ml-auto" />
                    </Link>
                    <Link
                        href="/mt/projects"
                        className="flex items-center gap-3 rounded-lg bg-purple-600 px-5 py-4 text-white shadow transition hover:bg-purple-700"
                    >
                        <Briefcase size={22} /> <span className="font-semibold">Manage Projects</span> <ArrowRight size={18} className="ml-auto" />
                    </Link>
                </div>
                {/* System Status & Activity */}
                <div className="dark:bg-background rounded-xl bg-white p-6 shadow">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-green-500"></span>
                        <span className="font-semibold text-green-700">All systems operational</span>
                    </div>
                    <div className="mt-2">
                        <h2 className="mb-2 text-lg font-semibold">Recent Activity</h2>
                        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                            <li>User John Doe was assigned to Project Alpha.</li>
                            <li>Role "Designer" was created.</li>
                            <li>Project Beta was marked as completed.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

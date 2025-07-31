import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/layouts/main-layout';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle, Bot, FileJson2Icon, Mail, Search } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateWorkloadPercentage } from '@/lib/utils';

const mockTeamMembers = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'UI/UX Designer',
        email: 'sarah.chen@company.com',
        phone: '+1 (555) 123-4567',
        projects: ['E-commerce Platform', 'Mobile App Redesign'],
        status: 'Active',
        workload: 75,
    },
    {
        id: 2,
        name: 'Mike Johnson',
        role: 'Full Stack Developer',
        email: 'mike.johnson@company.com',
        phone: '+1 (555) 234-5678',
        projects: ['E-commerce Platform', 'Data Migration'],
        status: 'Active',
        workload: 90,
    },
    {
        id: 3,
        name: 'Alex Kim',
        role: 'DevOps Engineer',
        email: 'alex.kim@company.com',
        phone: '+1 (555) 345-6789',
        projects: ['Data Migration'],
        status: 'Active',
        workload: 60,
    },
    {
        id: 4,
        name: 'Emma Wilson',
        role: 'Project Manager',
        email: 'emma.wilson@company.com',
        phone: '+1 (555) 456-7890',
        projects: ['E-commerce Platform', 'Mobile App Redesign'],
        status: 'Active',
        workload: 85,
    },
];

export default function Index({ users, projectsCount, roles }) {
    console.log(users);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [role, setRole] = useState<string>('');

    const getWorkloadColor = (workload: string) => {
        const f = parseInt(workload);
        //    console.log(f)
        if (f >= 80) return 'bg-red-500';
        if (f >= 60) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    const filteredUsers = users.filter((user) => {
       return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.roles.some(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            user.roles.some(r => r.id.toString() === role);
    });

    return (
        <MainLayout
            crumb={[
                { title: 'dashboard', href: '/' },
                { title: 'users', href: '/admin/users' },
            ]}
        >
            <Head title="Dashboard" />

            <div className="parent-dash mx-auto max-w-7xl space-y-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-fg text-3xl font-semibold tracking-tight">Users</h1>
                        <p className="text-fgMuted mt-1">Create and manage your users all in one place</p>
                    </div>
                    <Button>
                        <Link href={route('users.create')}>Create New User</Link>
                    </Button>
                </div>

                <Separator />

                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="text-fgMuted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <Input
                            placeholder="Search by name or email..."
                            className="w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="bg-bg border-border w-[180px]">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>{roles?.map((role) => <SelectItem value={role.id}>{role.display_name}</SelectItem>)}</SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="bg-bg border-border w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="0">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {(users || []).length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-16">
                        <Bot className="text-fgMuted h-16 w-16 opacity-80" />
                        <h2 className="text-fg text-2xl font-semibold">No Users Found</h2>
                        <p className="text-fgMuted">{searchTerm ? 'Try a different search term' : 'Create your first user'}</p>
                        {!searchTerm && (
                            <Link href="/agents/create" className="brand-button mt-2">
                                <Button>Create Your First Project</Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredUsers.map((member) => (
                            <Card key={member.id} className="bord">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12 rounded">
                                            <AvatarFallback className="rounded">{getInitials(member.name)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                                                {member.name.substring(0, 10)}...
                                            </CardTitle>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{member?.roles[0]?.display_name}</p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={`${member.status ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-300' : 'border-red-200 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-300'}`}
                                        >
                                            {member?.status ? 'Active' : <AlertCircle />}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Mail className="h-4 w-4" />
                                            <span>{member.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                            <FileJson2Icon className="h-4 w-4" />
                                            <span>{member.roles[0].name || '-'} </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Current Workload</span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {calculateWorkloadPercentage(
                                                    member?.roles[0].name === 'project_manager'
                                                        ? member.managed_ongoing_projects_count
                                                        : member.ongoing_projects_count,
                                                    projectsCount,
                                                )}
                                                %
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className={`h-2 rounded-full ${getWorkloadColor(
                                                    calculateWorkloadPercentage(
                                                        member?.roles[0].name === 'project_manager'
                                                            ? member.managed_ongoing_projects_count
                                                            : member.ongoing_projects_count,
                                                        projectsCount,
                                                    ),
                                                )}`}
                                                style={{
                                                    width:
                                                        calculateWorkloadPercentage(
                                                            member?.roles[0].name === 'project_manager'
                                                                ? member.managed_ongoing_projects_count
                                                                : member.ongoing_projects_count,
                                                            projectsCount,
                                                        ) + '% ',
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2">
                                        <div className="flex flex-col items-center">
                                            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">OnGoing Projects</p>
                                            <div className="space-y-1">
                                                {member?.roles[0].name === 'project_manager'
                                                    ? member.managed_ongoing_projects_count
                                                    : member.ongoing_projects_count}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center border-l">
                                            <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Completed Projects</p>
                                            <div className="space-y-1">
                                                {member?.roles[0].name === 'project_manager'
                                                    ? member.managed_completed_projects_count
                                                    : member.completed_projects_count}
                                            </div>
                                        </div>
                                    </div>

                                    <Link href={route('users.show', { id: member.id })}>
                                        <Button
                                            variant="outline"
                                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

import { ArchiveRestore, ArrowLeft, BadgeAlert, CalendarCheck2, GalleryVerticalEnd, LayoutDashboard, Users } from 'lucide-react';

import {
    Sidebar as SidebarComponents,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '#',
            icon: LayoutDashboard,
        },
        {
            title: 'Team',
            url: '#',
            icon: Users,
        },
        {
            title: 'Tasks',
            url: '#',
            icon: CalendarCheck2,
        },
        {
            title: 'Issues',
            url: '#',
            icon: BadgeAlert,
        },
        {
            title: 'Reports',
            url: '#',
            icon: ArchiveRestore,
        },
    ],
};

export function Sidebar({ id, name }) {
    if (!id) return;
    return (
        <SidebarComponents variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">{name}</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="mt-3 gap-2 space-y-1">
                        <Link href={route('projects.show', { project: id })} className="repository-link">
                            <LayoutDashboard size={18} />
                            <span className="text-sm">Dashboard</span>
                        </Link>
                        <Link href={route('projects.team', { project: id })} className="repository-link" prefetch>
                            <Users size={18} />
                            <span className="text-sm">Team</span>
                        </Link>
                        <Link href={route('projects.team', { project: id })} className="repository-link" prefetch>
                            <Users size={18} />
                            <span className="text-sm">Tasks</span>
                        </Link>
                        <Link href={route('projects.team', { project: id })} className="repository-link" prefetch>
                            <Users size={18} />
                            <span className="text-sm">Issues</span>
                        </Link>
                    </SidebarMenu>
                    <SidebarFooter>
                        <div className="mb-6">
                            <Link href={route('dashboard')} className="hover:text-agent-primary flex items-center text-gray-500 transition-colors duration-200">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                <span className="text-sm font-medium">Back to Dashboard</span>
                            </Link>
                        </div>
                    </SidebarFooter>
                </SidebarGroup>
            </SidebarContent>
        </SidebarComponents>
    );
}

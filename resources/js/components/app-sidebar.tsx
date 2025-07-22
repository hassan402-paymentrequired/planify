import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, FolderOpen, LayoutGrid, Shield, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Role Management',
        href: '/admin/roles',
        icon: Shield,
        role: ['super_admin', 'cto', 'hr'],
    },
    {
        title: 'User Management',
        href: '/mt/users',
        icon: Users,
        permission: 'list.user',
    },
    {
        title: 'Project Management',
        href: '/mt/projects',
        icon: FolderOpen,
        permission: 'list.project',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const roles: string[] = auth?.roles || [];
    const permissions: string[] = auth?.permissions || [];

    // Debug: Log roles and permissions
    console.log('Sidebar roles:', roles);
    console.log('Sidebar permissions:', permissions);

    // Filter nav items based on role/permission
    const filteredNavItems = mainNavItems.filter((item) => {
        if (item.role) {
            return item.role.some((r) => roles.includes(r));
        }
        if (item.permission) {
            return permissions.includes(item.permission);
        }
        return true; // visible to all
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Folder, GitPullRequest, Inspect, LayoutDashboard, MessageCirclePlus, Settings, Shield, Users } from 'lucide-react';

type SidebarProps = {
    className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
    const { auth } = usePage().props as any;
    const roles: string[] = auth?.roles || [];
    const permissions: string[] = auth?.permissions || [];

    // Determine dashboard link based on user role
    let dashboardHref = '/mt/dashboard';
    if (roles.includes('super_admin') || roles.includes('cto') || roles.includes('hr')) {
        dashboardHref = '/admin/dashboard';
    } else if (roles.includes('project_manager')) {
        dashboardHref = '/project-manager/dashboard';
    } else if (roles.some((r) => ['frontend', 'backend', 'designer', 'user', 'action_officer'].includes(r))) {
        dashboardHref = '/user/dashboard';
    }

    const sidebarLinks = [
        {
            href: dashboardHref,
            label: 'Dashboard',
            icon: <LayoutDashboard size={18} />,
        },
        {
            href: '/mt/ask-ai',
            label: 'Ask Noor',
            icon: <MessageCirclePlus size={18} />,
            permission: 'talk.ai',
        },
        {
            href: '/mt/projects',
            label: 'Project',
            icon: <GitPullRequest size={18} />,
            permission: 'list.project',
        },
        {
            href: '/mt/users',
            label: 'User Management',
            icon: <Users size={18} />,
            permission: 'view.user.management',
        },
        {
            href: '/admin/roles',
            label: 'Role Management',
            icon: <Shield size={18} />,
            permission: 'view.role.management',
        },
        {
            href: '/admin/permissions',
            label: 'Permissions Management',
            icon: <Shield size={18} />,
            permission: 'view.permission.management',
        },
        // Admins see 'Issues', users with 'create.issue' see 'Create Issue'
        ...(roles.includes('super_admin') || roles.includes('cto') || roles.includes('hr')
            ? [
                  {
                      href: '/mt/issues',
                      label: 'Issues',
                      icon: <Inspect size={18} />,
                  },
              ]
            : permissions.includes('create.issue')
              ? [
                    {
                        href: '/mt/issues/create',
                        label: 'Create Issue',
                        icon: <Inspect size={18} />,
                    },
                ]
              : []),
        {
            href: '/settings',
            label: 'Settings',
            icon: <Settings size={18} />,
        },
    ];

    const filteredLinks = sidebarLinks.filter((link) => {
        if (link.role) {
            return link.role.some((r: string) => roles.includes(r));
        }
        if (link.permission) {
            return permissions.includes(link.permission);
        }
        return true;
    });

   

    return (
        <div className={cn('bg-sidebar flex h-full w-64 flex-col border-r p-4', className)}>
            <div className="flex items-center gap-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0052CC]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 22V15C15 13.8954 14.1046 13 13 13H11C9.89543 13 9 13.8954 9 15V22"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5 9C6.10457 9 7 8.10457 7 7C7 5.89543 6.10457 5 5 5C3.89543 5 3 5.89543 3 7C3 8.10457 3.89543 9 5 9Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19 9C20.1046 9 21 8.10457 21 7C21 5.89543 20.1046 5 19 5C17.8954 5 17 5.89543 17 7C17 8.10457 17.8954 9 19 9Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path d="M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                            d="M5 9V17C5 17 5 22 12 22C19 22 19 17 19 17V9"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h1 className="text-lg font-bold">Planify</h1>
            </div>

            <div className="mt-6 space-y-1">
                {filteredLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="repository-link" prefetch>
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between px-3 py-2">
                <h2 className="text-sm font-semibold">Teams</h2>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.5 1C7.22386 1 7 1.22386 7 1.5V7H1.5C1.22386 7 1 7.22386 1 7.5C1 7.77614 1.22386 8 1.5 8H7V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H8V1.5C8 1.22386 7.77614 1 7.5 1Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </Button>
            </div>

          
        </div>
    );
};

export default Sidebar;

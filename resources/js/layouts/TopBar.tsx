/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Bell, GitBranch, Menu, Moon, Sun } from 'lucide-react';

type TopBarProps = {
    onMenuButtonClick: () => void;
    setShowAssignTaskModal: any;
    crumb: BreadcrumbItem[];
};

const TopBar = ({ onMenuButtonClick, setShowAssignTaskModal, crumb }: TopBarProps) => {
    const { appearance: theme, updateAppearance: setTheme } = useAppearance();
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowAssignTaskModal(true);
    };

    return (
        <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center lg:hidden">
                <Button variant="ghost" size="icon" onClick={onMenuButtonClick} className="mr-2">
                    <Menu size={20} />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>

            {/* <div className="relative mr-4 hidden w-full max-w-md md:flex">
                <Search size={18} className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input type="search" placeholder="Search repositories..." className="pl-8" />
            </div> */}

            {crumb?.length > 1 && (
                // <div className="border-sidebar-border/70 flex w-full border-b">
                //     <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={crumb} />
                //     </div>
                // </div>
            )}

            <div className="ml-auto flex items-center space-x-4">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                        <div className="nline-flex focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-input bg-background hover:bg-accent hover:text-accent-foreground hidden h-8 items-center justify-center gap-2 rounded border px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-2.5 md:inline-flex [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                            <GitBranch size={16} className="mr-1.5" />
                            Create
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href="/mt/users/create">New User</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={route('projects.create')}>New Projects</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleClick}>Assign Task</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="relative">
                    <Bell size={18} />
                    <span className="bg-git-red absolute top-0 right-0 h-2 w-2 rounded-full" />
                    <span className="sr-only">Notifications</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                            <Sun size={16} className="mr-2" />
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                            <Moon size={16} className="mr-2" />
                            Dark
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>DW</AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                                {/* <LogOut className="mr-2" /> */}
                                Log out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default TopBar;

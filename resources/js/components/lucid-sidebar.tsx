import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from './ui/sidebar';

const LucidSidebar = () => {
    return (
        <SidebarProvider defaultOpen={true} >
            <Sidebar collapsible="icon" variant="inset" className='bg-white'>
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

                {/* <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent> */}

                <SidebarFooter>hejejdj</SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    );
};

export default LucidSidebar;

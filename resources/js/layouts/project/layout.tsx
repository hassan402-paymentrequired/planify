/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { Sidebar } from './side-bar';
interface Props {
    children: ReactNode;
    project: any
}
const ProjectLayout = ({ children, project }: Props) => {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '19rem',
                } as React.CSSProperties
            }
        >
            <Sidebar id={project.id} name={project.name}/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ProjectLayout;

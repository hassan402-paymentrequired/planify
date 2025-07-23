import Banner from '@/components/project/banner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/main-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ProjectTeam from './team';

const Show = ({ project }) => {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'dashboard',
            href: '/',
        },
        {
            title: 'projects',
            href: '/',
        },
        {
            title: project.name,
            href: '/',
        },
    ];
    console.log(project);

    return (
        <MainLayout crumb={breadcrumb}>
            <Head title={project?.name} />
            <Banner project={project} />
            {/* <Separator /> */}
            <div className="mt-3">
                <Tabs defaultValue="users">
                    <TabsList className="w-full">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="issues">Issues</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users">
                        
                            <ProjectTeam project={project} />
                        
                    </TabsContent>

                    <TabsContent value="issues"></TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
};

export default Show;

import Banner from '@/components/project/banner';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/main-layout';
import { BreadcrumbItem } from '@/types';

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
            <Banner project={project} />
            <Separator />
            <div className="mt-3">
                <Tabs defaultValue="users">
                    <TabsList className="w-full">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="issues">Issues</TabsTrigger>
                    </TabsList>

                    <TabsContent value="users"></TabsContent>

                    <TabsContent value="issues"></TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
};

export default Show;

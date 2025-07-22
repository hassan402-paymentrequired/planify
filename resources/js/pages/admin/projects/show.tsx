import { ProjectBreadcrumb } from '@/components/project-bread-crumb';
import Banner from '@/components/project/banner';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/main-layout';
import ProjectLayout from '@/layouts/project/layout';

const Show = ({ project, status }) => {
    console.log(project);

    return (
        <MainLayout crumb={<ProjectBreadcrumb  />}>
            <Banner project={project}  />
            <Separator />
            <div className="mt-3">
                <Tabs defaultValue="account">
                    <TabsList className="w-full">
                        <TabsTrigger value="account">Tasks</TabsTrigger>
                        <TabsTrigger value="projects">Issues</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tasks">
                    
                    </TabsContent>

                    <TabsContent value="issues">
                       
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
};

export default Show;

import ProjectUserCard from '@/components/project/project-user-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { Bot, Search } from 'lucide-react';
import { useState } from 'react';

const ProjectTeam = ({ project }) => {
    // console.log(project)
    const [searchTerm, setSearchTerm] = useState('');

    // const handleArchiveAgent = () => {
    //     //
    // }
    return (
        <>
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="text-fgMuted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Search by name or purpose..."
                        className="w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Link href={route('projects.add_user', { project: project?.id })} className="brand-button mt-2">
                        <Button>Add User </Button>
                    </Link>
                </div>
            </div>

            {(project?.users || []).length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-16">
                    <Bot className="text-fgMuted h-16 w-16 opacity-80" />
                    <h2 className="text-fg text-2xl font-semibold">No User Found</h2>
                    <p className="text-fgMuted">{searchTerm ? 'Try a different search term' : 'Create your first agent to get started'}</p>
                    {!searchTerm && (
                        <Link href={route('projects.add_user', { project: project?.id })} className="brand-button mt-2">
                            <Button>Add Your First User </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {project?.users?.map((user) => <ProjectUserCard user={user} />)}
                </div>
            )}
        </>
    );
};

export default ProjectTeam;

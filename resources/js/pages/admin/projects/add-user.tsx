/* eslint-disable @typescript-eslint/no-explicit-any */
import UserTimeline from '@/components/project/user-timeline';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ProjectLayout from '@/layouts/project/layout';
import { User } from '@/types';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type UserTimeLine = {
    id: number;
    start: string;
    end: string;
    isSupport?: boolean;
};

const AddUser = ({ project, users: userData, roles }) => {
    const [allUsers, setAllUsers] = useState<User[]>(userData);
    const [users, setUsers] = useState<User[]>(userData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const selectRef = useRef(null);

    useEffect(() => {
        let filtered = allUsers;
        if (searchTerm) {
            filtered = filtered.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (filterType) {
            filtered = filtered.filter((user) => user.roles[0].id === filterType); // adjust key as needed
        }
        setUsers(filtered);
    }, [searchTerm, filterType, allUsers]);

    // console.log(project);
    const handleUserSelect = (id: string) => {
        setUsers(() => {
            const exist = tusers.find((user) => user.id.toString() === id);
            if (exist) return;
            return [...tusers, { id: id, start: '', end: '' }];
        });
    };
    const clearFilterType = () => {
        setFilterType('');
    };

    return (
        <ProjectLayout project={project}>
            <div className="space-y-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assign Users</h1>
                        <p className="text-muted-foreground">
                            select users you want to unboard on <span className="font-extrabold"> {project.name}</span>
                        </p>
                    </div>
                </div>
                <Separator />

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
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="bg-bg border-border w-[180px]">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map((role: any) => (
                                <SelectItem key={role.id} value={role.id}>
                                    {role.display_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        <button onClick={clearFilterType}>Clear</button>
                    </Select>
                </div>
                <UserTimeline users={users} project={project} />
            </div>
        </ProjectLayout>
    );
};

export default AddUser;

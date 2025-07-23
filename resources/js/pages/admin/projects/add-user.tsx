/* eslint-disable @typescript-eslint/no-explicit-any */
import UserTimeline from '@/components/project/user-timeline';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import MainLayout from '@/layouts/main-layout';
import { User } from '@/types';
import { Search } from 'lucide-react';
import { useEffect,  useState } from 'react';



const AddUser = ({ project, users: userData, roles }) => {
    const [allUsers] = useState<User[]>(userData);
    const [users, setUsers] = useState<User[]>(userData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');

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
  
    const clearFilterType = () => {
        setFilterType('');
    };

    return (
        <MainLayout crumb={[{ title: 'dashboard', href: '/' }, { title: 'projects', href: '/' }, { title: project.name, href: '/' }]}>
            <div className="space-y-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assign Users to {project?.name}</h1>
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
        </MainLayout>
    );
};

export default AddUser;

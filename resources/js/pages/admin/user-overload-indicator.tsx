import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UserOverloadIndicator = ({ projectCount, user }) => {
    return (
        <div className="flex h-[120px] w-full flex-col justify-between space-y-2 border p-2">
            <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 rounded">
                    <AvatarFallback className="rounded">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h4 className="dark:text-accent-foreground text-sm">{user?.name}</h4>
                    <span className="dark:text-accent-foreground text-xs">{user?.email}</span>
                </div>
            </div>

            <div className="flex gap-2">
                {Array.from({ length: projectCount }).map((_, count) => (
                    <div
                        key={count}
                        className={`h-10 w-5 rounded transition-all duration-300 ${count < user?.total_projects ? 'bg-green-400' : 'bg-gray-200/20'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserOverloadIndicator;

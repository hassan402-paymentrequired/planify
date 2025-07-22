import { CardContent, CardFooter } from '@/components/ui/card';
import { Role } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserMinicard = ({ user }) => {
    return (
        <>
            <CardContent className="p-0 mb-2">
                <div className="flex justify-between">
                    <div className="">
                        <span className="text-lg font-semibold">{user.name}</span>
                        <br />
                        <span className="text-muted-foreground flex flex-col gap-2 text-sm">
                            {user?.roles?.map((role: Role) => <u key={role.id}>{role.display_name}</u>)}
                        </span>
                    </div>
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="my-2 p-0">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col items-center">
                        <span className="text-muted-foreground text-xs">Total Project</span>
                        <span className="text-sm font-medium">56K</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-muted-foreground text-xs">Ongoing</span>
                        <span className="text-sm font-medium">940</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-muted-foreground text-xs">Support project</span>
                        <span className="text-sm font-medium">320</span>
                    </div>
                </div>
            </CardFooter>
        </>
    );
};

export default UserMinicard;

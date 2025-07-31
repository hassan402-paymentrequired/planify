import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ArrowUpRight } from 'lucide-react';
import UserOverloadIndicator from './user-overload-indicator';

const OverloadUser = ({ count, totalP, occupied }) => {
    return (
        <Sheet>
            <SheetTrigger className="group grid cursor-pointer rounded-md border bg-gray-200 p-2 dark:bg-black/50">
                <div className="flex w-full items-start justify-between">
                    <span className="text-sm font-semibold capitalize">occupied staff</span>
                    <div className="bg-sidebar flex size-7 items-center justify-center rounded-full group-hover:ring-2 group-hover:ring-green-700 dark:bg-neutral-900">
                        <ArrowUpRight size={15} className="transition-all duration-300 group-hover:scale-75 group-hover:rotate-45" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="mt-auto text-2xl font-bold sm:text-3xl dark:text-neutral-500">{count}</p>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Overloaded Staff</SheetTitle>
                    <SheetDescription>
                       This is the list of users with more than 3 projects considered as overloaded staff
                    </SheetDescription>
                </SheetHeader>

                <div className="grid  overflow-y-auto gap-2 p-3">
                    {occupied?.map(user => (
                        <UserOverloadIndicator projectCount={totalP} user={user}/>
                    ))}
                </div>

                {occupied?.length === 0 && <p className="text-center text-sm text-gray-400">No overloaded staff. looks like everybody is relaxing</p>}
            </SheetContent>
        </Sheet>
    );
};

export default OverloadUser;

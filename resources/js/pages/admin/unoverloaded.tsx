import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ArrowUpRight } from 'lucide-react';
import UserOverloadIndicator from './user-overload-indicator';

const NonOverloadUser = ({ count, totalP, nonOccupied }) => {
    return (
        <Sheet>
            <SheetTrigger className="group grid cursor-pointer rounded-md border bg-gray-200 p-2 dark:bg-black/50">
                <div className="flex w-full items-start justify-between">
                    <span className="text-sm font-semibold capitalize">Unoccupied staff</span>
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
                    <SheetTitle>Unoverloaded Staff</SheetTitle>
                    <SheetDescription>This is the list of users with less than 3 projects considered as no too busy or rather not but staff</SheetDescription>
                </SheetHeader>

                <div className="grid flex-1 gap-4 overflow-y-auto p-3">
                    {nonOccupied?.map((user) => <UserOverloadIndicator projectCount={totalP} user={user} />)}
                </div>
                 {nonOccupied?.length === 0 && <p className="text-center text-sm text-gray-400">No idle staff. looks like everybody is in the jungle</p>}
            </SheetContent>
        </Sheet>
    );
};

export default NonOverloadUser;

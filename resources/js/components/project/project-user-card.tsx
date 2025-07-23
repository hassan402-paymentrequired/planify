import formatDate from '@/lib/utils';
import { Contact } from 'lucide-react';

const ProjectUserCard = ({ user }) => {
    // console.log(user)
    return (
        <div className="bg-sidebar border-2 p-4 pt-2 dark:border-neutral-800 dark:bg-black/40">
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <Contact size={15} />
                    <p className="text-xl dark:text-gray-300">{user.name}</p>
                </div>

                <p className="text-sm dark:text-gray-200">{user.pivot.purpose}</p>
            </div>
            <div className="flex items-center">
                <div className="text-sm">
                    <span className="leading-none font-semibold dark:text-gray-300">Role: {user.roles[0].display_name}</span>
                    <p className="flex items-center gap-2 text-gray-300">
                        <strong className="leading-none font-semibold dark:text-gray-400">Timeline:</strong>
                        From {formatDate(user.pivot.start_date)} to {formatDate(user.pivot.end_date)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectUserCard;

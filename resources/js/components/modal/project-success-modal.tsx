/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

type Props = {
    open: boolean;
    setOpen: any;
    id: string;
    name: string;
};

const ProjectSuccessModal = ({ open, setOpen, id, name }: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Success 🍾?</DialogTitle>
                    <DialogDescription>
                        Your project has been successfully created. You can view it in the projects dashboard or continue.
                    </DialogDescription>
                    <DialogFooter>
                        <Link href={route('projects.index')}>
                            <Button variant="outline">Continue</Button>
                        </Link>
                        <Link href={route('projects.show', { project: id || 1 })}>
                            <Button>View {name} Project</Button>
                        </Link>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectSuccessModal;

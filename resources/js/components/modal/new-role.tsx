/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '../ui/label';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';

const NewRole = ({openModal, setOpenModal}: {openModal: boolean, setOpenModal: any}) => {
    const { data, setData, post, processing, reset, errors } = useForm<Required<{ name: string, description: string }>>({ name: '' , description: '' });
    
        const addNewRole: FormEventHandler = (e) => {
            e.preventDefault();
            post(route('admin.role.store'), {
                preserveScroll: true,
                onFinish: () => reset(),
                onSuccess: () => {
                    setOpenModal(false);
                    toast('Role has being create successfully');
                },
            });
        };
  return (
     <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent>
                    <DialogTitle>Create New Role</DialogTitle>
                    <form className="space-y-6" onSubmit={addNewRole}>
                        <div className="grid gap-2">
                            <Label htmlFor="Name" className="sr-only">
                                Name
                            </Label>

                            <Input
                                id="name"
                                type="text"
                                placeholder="Role name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />

                            <InputError message={errors.name} />
                        </div>

                         <div className="grid gap-2">
                            <Label htmlFor="Name" className="sr-only">
                                Description
                            </Label>

                           <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder='Role description'/>

                            <InputError message={errors.description} />
                        </div>

                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={() => setOpenModal(!openModal)}>
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button disabled={processing} asChild>
                                <button type="submit">Create Role</button>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
  )
}

export default NewRole
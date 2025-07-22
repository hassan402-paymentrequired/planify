/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AssignTaskModalProps {
  open: boolean;
  onClose: any;
}

export function AssignTaskModal({ open, onClose }: AssignTaskModalProps) {
  const { toast } = useToast();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: '',
    project: '',
    dueDate: ''
  });

  const teamMembers = [
    'Sarah Chen',
    'Mike Johnson',
    'Alex Kim',
    'Emma Wilson',
    'David Brown',
    'Lisa Zhang'
  ];

  const projects = [
    'E-commerce Platform',
    'Mobile App Redesign',
    'Data Migration'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assigning task:', taskData);
    
    toast({
      title: "Task assigned successfully",
      description: `Task "${taskData.title}" has been assigned to ${taskData.assignee}.`,
    });
    
    onClose();
    // Reset form
    setTaskData({
      title: '',
      description: '',
      assignee: '',
      priority: '',
      project: '',
      dueDate: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800 dark:text-gray-200">
            Assign Task
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Create and assign a new task to a team member.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title" className="text-gray-800 dark:text-gray-300">Task Title</Label>
              <Input
                id="title"
                value={taskData.title}
                onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title"
                required
                className="border-stone-800"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-gray-800 dark:text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={taskData.description}
                onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the task requirements"
                rows={3}
                className="border-stone-800"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-gray-800 dark:text-gray-300">Assign to</Label>
              <Select value={taskData.assignee} onValueChange={(value) => setTaskData(prev => ({ ...prev, assignee: value }))}>
                <SelectTrigger className="border-stone-800">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>{member}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project" className="text-gray-800 dark:text-gray-300">Project</Label>
              <Select value={taskData.project} onValueChange={(value) => setTaskData(prev => ({ ...prev, project: value }))}>
                <SelectTrigger className="border-stone-800">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-800 dark:text-gray-300">Priority</Label>
              <Select value={taskData.priority} onValueChange={(value) => setTaskData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="border-stone-800">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-gray-800 dark:text-gray-300">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={taskData.dueDate}
                onChange={(e) => setTaskData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="border-stone-800"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-stone-800">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Assign Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

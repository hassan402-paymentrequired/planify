// components/TaskItem.jsx
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function TaskItem({ task }) {
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-orange-400 text-white';
      case 'Low': return 'bg-blue-400 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'Dashboard': return 'bg-purple-600 text-white';
      case 'Mobile App': return 'bg-pink-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="flex items-center p-3 border-b last:border-b-0 space-x-4">
      <Checkbox id={`task-${task.id}`} className="mr-2" />
      <div className="grid grid-cols-6 gap-4 flex-1 items-center">
        <div className="col-span-1 font-medium">{task.name}</div>
        <div className="col-span-1 text-sm text-gray-600">{task.description || '-'}</div>
        <div className="col-span-1 text-sm text-gray-600">{task.estimation}</div>
        <div className="col-span-1">
          <Badge className={getTypeBadgeColor(task.type)}>{task.type}</Badge>
        </div>
        <div className="col-span-1 flex -space-x-2 overflow-hidden">
          {task.people.map(person => (
            <Avatar key={person.id} className="w-7 h-7 border-2 border-white">
              <AvatarImage src={person.src} alt={person.id.toUpperCase()} />
              <AvatarFallback>{person.id.toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="col-span-1">
          <Badge className={getPriorityBadgeColor(task.priority)}>{task.priority}</Badge>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
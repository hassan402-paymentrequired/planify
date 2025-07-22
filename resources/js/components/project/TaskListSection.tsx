// components/TaskListSection.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import TaskItem from './TaskItem'; // Assuming TaskItem is in the same directory

function TaskListSection({ title, count, tasks }) {
  return (
    <div className="mb-6 border rounded-md">
      <div className="flex justify-between items-center bg-gray-50 p-3 border-b">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">⬇️</Button> {/* Or ChevronDown icon */}
          <h2 className="text-lg font-semibold">{title} <span className="text-gray-500 text-sm">({count})</span></h2>
        </div>
        <Button variant="ghost" size="icon">➕</Button> {/* Or Plus icon */}
      </div>
      <div>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskListSection;
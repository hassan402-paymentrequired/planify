// components/ProjectHeader.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function ProjectHeader() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">C</div>
        <h1 className="text-2xl font-bold">Craftboard Project</h1>
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatars/al.png" alt="AL" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatars/dt.png" alt="DT" />
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Input placeholder="Search..." className="w-[200px]" />
        <Button variant="outline">Filter</Button>
        <Button>+ New Task</Button>
        <Button variant="outline">Invite</Button> {/* Moved from main header based on image */}
      </div>
    </div>
  );
}

export default ProjectHeader;
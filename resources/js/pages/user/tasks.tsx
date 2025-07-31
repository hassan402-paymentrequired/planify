import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import formatDate from '@/lib/utils'
import { Clock, User } from 'lucide-react'
import React from 'react'

const UserTasks = ({tasks}) => {
    console.log(tasks)
  return (
    <div className='gap-5 grid'>
          {tasks.map((task) => (
          <div key={task.id} className="bg-card rounded border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-10 w-10 rounded">
                  {/* <AvatarImage src={``} /> */}
                  <AvatarFallback className='rounded'>{task.project.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                      {task.project.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {task.project.priority}
                    </Badge>
                  </div>
                  
                  {task.purpose && (
                    <p className="text-sm dark:text-muted-foreground mb-3">
                      {task.purpose}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{task?.project?.assign_to?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(task.created_at)}</span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                      <GitCommitHorizontal className="h-3 w-3" />
                      <button 
                        onClick={() => copyCommitId(commit.id)}
                        className="flex items-center gap-1 hover:text-foreground"
                      >
                        <code className="text-xs bg-muted px-1 rounded">{commit.id}</code>
                        <Copy className="h-3 w-3" />
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              
              {/* <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-success-600 font-medium">+{commit.additions}</div>
                  <div className="text-xs text-muted-foreground">added</div>
                </div>
                <div className="text-center">
                  <div className="text-danger-600 font-medium">-{commit.deletions}</div>
                  <div className="text-xs text-muted-foreground">deleted</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{commit.filesChanged}</div>
                  <div className="text-xs text-muted-foreground">files</div>
                </div>
              </div> */}
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserTasks
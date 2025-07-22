import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  GitCommitHorizontal, 
  Search, 
  Filter, 
  Copy,
  GitBranch,
  Clock,
  User
} from "lucide-react"
import MainLayout from "@/layouts/main-layout"

const mockCommits = [
  {
    "id": "1",
    "title": "User authentication not working correctly",
    "description": "The authentication system is rejecting valid user tokens and doesn't handle expired sessions well. This is affecting access to protected routes.",
    "reported_by": "John Doe",
    "email": "john.doe@company.com",
    "reported_at": "2025-05-28T10:00:00Z",
    "assigned_team": "Backend",
    "priority": "High",
    "status": "Open",
    "related_module": "Authentication"
  },
  {
    "id": "2",
    "title": "Memory leak in data processing module",
    "description": "We noticed that the batch data processing feature consumes excessive memory over time. Suspect improper resource disposal.",
    "reported_by": "Jane Smith",
    "email": "jane.smith@company.com",
    "reported_at": "2025-05-27T09:15:00Z",
    "assigned_team": "Data Engineering",
    "priority": "Critical",
    "status": "In Progress",
    "related_module": "Batch Processor"
  },
  {
    "id": "3",
    "title": "Outdated UI component library",
    "description": "The current UI components lack accessibility and design consistency. Recommend upgrading to the latest version of Shadcn UI.",
    "reported_by": "Mike Johnson",
    "email": "mike.johnson@company.com",
    "reported_at": "2025-05-25T15:30:00Z",
    "assigned_team": "Frontend",
    "priority": "Medium",
    "status": "Open",
    "related_module": "UI/UX"
  },
  {
    "id": "4",
    "title": "Slow database queries for user data",
    "description": "User data retrieval is slow. Possible lack of indexing or inefficient query structures affecting performance.",
    "reported_by": "Sarah Wilson",
    "email": "sarah.wilson@company.com",
    "reported_at": "2025-05-21T11:00:00Z",
    "assigned_team": "Database",
    "priority": "High",
    "status": "Resolved",
    "related_module": "Database"
  }
]


export default function Index() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("all")

  const filteredCommits = mockCommits.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.reported_by.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const copyCommitId = (id: string) => {
    navigator.clipboard.writeText(id)
  }

  return (
   <MainLayout>
     <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pm Issues</h1>
          <p className="text-muted-foreground">
            View and manage project and system issues
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search user, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <GitBranch className="h-4 w-4 mr-2" />
              {selectedBranch === "all" ? "Type" : selectedBranch}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedBranch("all")}>
              All Branches
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedBranch("main")}>
              main
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedBranch("develop")}>
              develop
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
            <DropdownMenuItem>Last week</DropdownMenuItem>
            <DropdownMenuItem>Last month</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Commits List */}
      <div className="space-y-4">
        {filteredCommits.map((commit) => (
          <div key={commit.id} className="bg-card rounded border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${commit.reported_by}`} />
                  <AvatarFallback>{commit.reported_by.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                      {commit.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {commit.status}
                    </Badge>
                  </div>
                  
                  {commit.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {commit.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{commit.reported_by}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{commit.reported_at}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitCommitHorizontal className="h-3 w-3" />
                      <button 
                        onClick={() => copyCommitId(commit.id)}
                        className="flex items-center gap-1 hover:text-foreground"
                      >
                        <code className="text-xs bg-muted px-1 rounded">{commit.id}</code>
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
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
    </div>
   </MainLayout>
  )
}

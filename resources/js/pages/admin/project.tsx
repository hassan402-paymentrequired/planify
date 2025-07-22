import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, GitPullRequest, Zap } from "lucide-react";

const ProjectAnalytics = () => {
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projects</CardTitle>
                        <GitBranch className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">20</div>
                        <p className="text-muted-foreground text-xs">Totals Projects</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
                        <GitPullRequest className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-muted-foreground text-xs">Open requests requiring review</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Build Status</CardTitle>
                        <Zap className="text-muted-foreground h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Active</div>
                        <p className="text-muted-foreground text-xs">Last pipeline: 10 minutes ago</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProjectAnalytics;

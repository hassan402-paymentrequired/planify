import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const ToggleUserAssign = ({ users, handleSelect }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Users Selections</CardTitle>
                <CardDescription>select the user you want to onboard on project</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-3">
                     
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                            {users.map((user) => (
                                <Button
                                    key={user.id}
                                    type="button"
                                    // variant={userustry === user.id ? 'default' : 'outline'}
                                    // className={`justify-start gap-2 ${userustry === user.id ? 'border-primary bg-primary text-primary-foreground' : ''}`}
                                    // onClick={() => setIndustry(ind.id)}
                                >
                                    {user.name}
                                    <span className="truncate">{user.name}</span>
                                </Button>
                            ))}
                        </div>

                      
                        <p className="text-fgMuted text-xs">The industry context your agent operates in</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ToggleUserAssign;

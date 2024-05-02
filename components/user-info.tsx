import { User } from "next-auth";
import {
Card, 
CardContent, 
CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface userExtended extends User{
    role? : string,
    isTwoFactorEnabled?: Boolean
}


interface userInfoProps {
    user?: userExtended
    label: string
}

export const UserInfo = ({
    user,
    label
}: userInfoProps) => {
    return ( 
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
                 <CardContent className="space-y-4">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            ID
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md p-2">
                            {user?.id}
                        </p>

                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Name
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md p-2">
                            {user?.name}
                        </p>

                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Email
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md p-2">
                            {user?.email}
                        </p>

                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Role
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono bg-slate-100 rounded-md p-2">
                            {user?.role}
                        </p>

                    </div> 

                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            2FA
                        </p>
                        <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                        </Badge>

                    </div> 
                </CardContent>
            </CardHeader>
        </Card>
    );
}
 

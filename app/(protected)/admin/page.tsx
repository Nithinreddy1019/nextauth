"use client"

import FormSuccess from "@/components/FormSuccess";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";


const AdminPage = () => {

    const onApiRouteClick = () => {
        fetch("/api/admin")
        .then((response) => {
            if(response.ok) {
                toast.success("Allowed API Route")
            } else {
                toast.error("Forbidden API route")
            }
        })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔐Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this"/>
                </RoleGate>
                <div className="flex flex-row justify-between items-center border rounded-lg p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin only API route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>

                </div>
            </CardContent>
        </Card>
    );
}


export default AdminPage;
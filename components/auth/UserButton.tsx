"use client"

import { FaUser } from "react-icons/fa";


import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "./LogoutButton"
import { ExitIcon } from "@radix-ui/react-icons";


export const UserButton = () => {

    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className="text-white bg-gradient-to-r from-blue-700  via-blue-500 via-50% to-blue-600">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogoutButton>
                    <DropdownMenuItem className="flex gap-x-2 items-center">
                        <ExitIcon className="font-bold"/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


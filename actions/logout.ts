"use server"


import { signOut } from "@/auth";

export const logout = async () => {
    //can be used to do soome server stuff
    await signOut()
}
import { auth } from "@/auth";


export const curretnUser = async () => {
    const session = await auth();

   

    return session?.user;
}

export const curretnUserRole = async () => {
    const session = await auth();

   

    return session?.user.role;
}


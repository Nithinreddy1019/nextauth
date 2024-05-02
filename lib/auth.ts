import { auth } from "@/auth";


export const curretnUser = async () => {
    const session = await auth();

   

    return session?.user;
}
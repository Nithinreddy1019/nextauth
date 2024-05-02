import NextAuth, {type DefaultSession} from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { exit } from "process";
import { getAccoutnByUserId } from "./data/account";


declare module "next-auth" {
    interface Session {
        user: {
            role: string,
            isTwoFactorEnabled: Boolean,
            isOAuth: Boolean
        } & DefaultSession["user"]
    }
}

 
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}){
            //Allow OAuth withour EMailVerification
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            //Prevent signin without Email Verification
            if(!existingUser?.emailVerified) return false;

            if(existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if(!twoFactorConfirmation) return false;


                //delete 2Fac nfrm for next signin
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                });
            }

            return true;
        },
        
        async jwt({token}){
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;

            if(typeof existingUser.role === 'string') {
                token.role = existingUser.role;
            }

            const existingAccount = await getAccoutnByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

        
            return token
        },
        async session({token, session, user}){

            if(token.sub && session.user){
                session.user.id = token.sub
            }

            if(token.role && session.user){
                session.user.role = token.role as string
            }

            if(token.isTwoFactorEnabled && session.user){
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as Boolean
            }

            if(session.user) {
                session.user.name = token.name;
                session.user.email= token.email as string;
                session.user.isOAuth = token.isOAuth as Boolean;
            }

            return session
        },
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig
})
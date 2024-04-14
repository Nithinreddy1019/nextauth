import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    
    const { nextUrl } = req;
    const isLoggedin = !!req.auth;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return undefined;
    }

    if(isAuthRoute){
        if(isLoggedin){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return undefined;
    }

    if(!isLoggedin && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return undefined;

})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"
  ],
}
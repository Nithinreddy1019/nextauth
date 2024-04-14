/*
Public routes that donot require authentication
 */
export const publicRoutes = [
    "/"
]


/*
Public routes that are used for authentication
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register"
]

/*
The prefix api authentication routes 
*/
export const apiAuthPrefix = "/api/auth"


export const DEFAULT_LOGIN_REDIRECT="/settings";
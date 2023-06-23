import { NextRequest, NextResponse } from "next/server";
import { RouteItem, authRoutes, protectedRoutes } from "./routes";
import { AUTH_KEY } from "./constants/cookieKeys";

function isMatchingRoute(routes: RouteItem[], path: string){

    return routes.some((item)=>{
        if (item.pattern) {
            return item.pattern.test(path)
        }

        return item.path === path
    })
}

function isMyTokenExpired(expiresIn: string) {
    let isExpired = new Date() >= new Date(expiresIn);
    return isExpired;
}

export function middleware(request: NextRequest){

    const currentAuth = request.cookies.get(AUTH_KEY)?.value;

    if (
        isMatchingRoute(protectedRoutes, request.nextUrl.pathname) &&
        (!currentAuth || isMyTokenExpired(JSON.parse(currentAuth).expiresIn))
    ) {
        request.cookies.delete(AUTH_KEY);
        
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete(AUTH_KEY);

        return response;
    }

    if (isMatchingRoute(authRoutes, request.nextUrl.pathname) && currentAuth) {
        const response = NextResponse.redirect(new URL("/dashboard", request.url));

        return response;
    }
}
export interface RouteItem{
    path: string;
    pattern?: RegExp;
}

export const protectedRoutes: RouteItem[] = [
    { path: '/application-management', pattern: /^\/application-management\.*$/ },
    { path: '/dashboard', pattern: /^\/dashboard\.*$/ },
    { path: '/registrar', pattern: /^\/registrar\.*$/ },
    { path: '/settings', pattern: /^\/settings\.*$/ },
    { path: '/users', pattern: /^\/users\.*$/ },
    { path: '/assets', pattern: /^\/assets\.*$/ },
    { path: '/assets-price', pattern: /^\/assets-price\.*$/ },
]

export const authRoutes: RouteItem[] = [
    { path: '/login' },
    { path: '/forgot-password', pattern: /^\/forgot-password\.*$/ },
]
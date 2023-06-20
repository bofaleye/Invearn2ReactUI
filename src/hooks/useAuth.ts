"use client"

import { LoginResponsePayload } from "@/models/LoginModel";
import React from "react";
import { getCookie } from 'cookies-next';
import { AUTH_KEY } from "@/constants/cookieKeys";
import { useRouter } from "next/navigation";

export function useAuth(){

    // Hooks
    const router = useRouter()

    // Represents the tokens we get from the Login call
    const [auth, setAuth] = React.useState<LoginResponsePayload>();

    React.useEffect(()=>{

        // Get auth from cookie
        const currentAuth = getCookie(AUTH_KEY)?.toString();

        if (currentAuth) {
            setAuth(JSON.parse(currentAuth));
        }
        else{
            router.push('/login');
        }
    })

    return auth
    
}
'use client'
import { useEffect, ReactNode } from 'react';
import { refreshToken } from '../AuthManager';
import Firebase from '../../../firebase.config';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteCookie, hasCookie } from 'cookies-next';
import { AUTH_KEY } from '@/constants/cookieKeys';

const AuthProvider =({children}: { children: React.ReactNode})=>{
    useEffect(() => {
        const refreshTokenInterval = setInterval(() => {
          refreshToken()
        }, 1000* 60 * 4);
        return () => {
          clearInterval(refreshTokenInterval);
        };
      }, []);
      return(<>
      {children}
      </>)
}

export default AuthProvider;
import React from "react";

export interface AuthPageLayoutProps{
    children?: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children })=>{

    return(
        <div className="bg-login-background h-screen bg-no-repeat bg-cover flex items-center justify-center sm:p-0 px-4">
           { children }
        </div>
    )
}

export default AuthPageLayout;
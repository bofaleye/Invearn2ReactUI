"use client"

import React from "react";
import HomeNavBar from "./HomeNavBar";
import HomeFooter from "./HomeFooter";

export interface LandingPageLayoutProps {
  children?: React.ReactNode;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavBar />

      {/** Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      <HomeFooter />
    </div>
  );
};

export default LandingPageLayout;

"use client";

import DashboardLayoutFooter from "@/components/dashboard/DashboardLayoutFooter";
import DashboardLayoutNavbar from "@/components/dashboard/DashboardLayoutNavbar";
import DashboardLayoutSidebar from "@/components/dashboard/DashboardLayoutSidebar";
import { useGuard } from "@/hooks/useGuard";
import React from "react";

const DashboardLayout: React.FC<any> = ({ children }) => {
  useGuard();
  return (
    <>
      <DashboardLayoutNavbar />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <DashboardLayoutSidebar />

        <div
          id="main-content"
          className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
        >
          <main>{children}</main>
          <DashboardLayoutFooter />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

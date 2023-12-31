"use client";

import React from "react";
import AdminUiNavbar from "@/components/AdminUi/AdminUiNavbar";
import AdminUiSidebar from "@/components/AdminUi/AdminUiSidebar";
import { useGuard } from "@/hooks/useGuard";
import IdleTimerWrapper from "@/components/IdleTimer";
import AuthProvider from "@/components/AuthProvider";

const AdminSettingsLayout: React.FC<any> = ({ children }) => {
  useGuard();
  return (
    <>
      <AuthProvider>
        <IdleTimerWrapper>
          <AdminUiNavbar />
          <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900 no-scrollbar">
            <AdminUiSidebar />
            <div
              id="main-content"
              className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 no-scrollbar"
            >
              <div className="flex min-h-screen flex-col py-2">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </IdleTimerWrapper>
      </AuthProvider>
    </>
  );
};

export default AdminSettingsLayout;

"use client";

import {
  AppNotificationIcon,
  AuditTrailIcon,
  DashboardIcon,
  HelpIcon,
  LockIcon,
  SettingsIcon,
} from "@/assets";
import APP_ROUTES from "@/constants/appRoute";
import { initCollapses } from "flowbite";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SidebarItem } from "./SidebarItem";

export interface AdminUiSidebarProps {
  mobile?: boolean;
}

const AdminUiSidebar: React.FC<AdminUiSidebarProps> = ({ mobile = false }) => {
  const activeClass = "is-active bg-green-100 text-green-800 dark:bg-gray-700";
  const mobileClass = "flex";
  const defaultClass = "hidden pt-16";
  let tag = mobile ? "mobile" : "";

  const pathname = usePathname();

  React.useEffect(() => {
    initCollapses();
  }, []);

  const isActiveRoute = (name: string) => {
    let indexOfLastStroke = pathname.lastIndexOf("/");
    let endPath = pathname.slice(indexOfLastStroke + 1);

    return endPath.toLowerCase() === name.toLowerCase();
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full font-normal duration-75 lg:flex transition-width ${
          mobile ? mobileClass : defaultClass
        } no-scrollbar`}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto no-scrollbar">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                <SidebarItem
                  mobileTag={tag}
                  title="Dashboard"
                  url={APP_ROUTES.dashboard}
                  icon={
                    <DashboardIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-green-800 group-[.is-active]:text-green-800 dark:text-gray-400 dark:group-hover:text-white" />
                  }
                />
                {/* <SidebarItem
                  mobileTag={tag}
                  title="App Management"
                  urls={[APP_ROUTES.registrar, "/users"]}
                  icon={
                    <LockIcon className="flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-green-800 transition duration-75 group-hover:text-sidebar-icons-active " />
                  }
                >
                  <li>
                    <Link
                      href={APP_ROUTES.registrar}
                      className={`flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700 
                      ${isActiveRoute('registrar') ? 'is-active bg-green-100 text-green-800 dark:bg-gray-700' : ''}`}
                    >
                      Registrar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Users Group
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/users"
                      className={`flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700
                      ${isActiveRoute('users') ? 'is-active bg-green-100 text-green-800 dark:bg-gray-700' : ''}`}
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Workflow Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Policy Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      Access Control
                    </Link>
                  </li>
                </SidebarItem> */}
                <SidebarItem
                  mobileTag={tag}
                  title="Master Data"
                  icon={
                    <LockIcon className="flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-green-800 transition duration-75 group-hover:text-sidebar-icons-active " />
                  }
                >
                  <li>
                    <Link
                      className="flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      href={APP_ROUTES.banks}
                    >
                      Banks
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center p-2 text-base text-gray-500 transition duration-75 rounded-lg pl-11 group hover:bg-green-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      href={APP_ROUTES.document_formats}
                    >
                      Document Formats
                    </Link>
                  </li>
                </SidebarItem>
              </ul>
              <div className="pt-2 space-y-2">
                <Link
                  href="/settings"
                  className={`flex items-center p-2 text-base text-gray-900 font-medium rounded-lg hover:bg-green-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                    isActiveRoute("settings") && activeClass
                  }`}
                >
                  <SettingsIcon className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-green-800 group-[.is-active]:text-green-800 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3" sidebar-toggle-item="">
                    Settings
                  </span>
                </Link>
                <Link
                  href="/settings"
                  className={`flex items-center p-2 text-base text-gray-900 font-medium rounded-lg hover:bg-green-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                    isActiveRoute("") && activeClass
                  }`}
                >
                  <AppNotificationIcon className="flex-shrink-0 w-6 h-6  text-gray-500 group-hover:text-green-800 transition duration-75 group-hover:text-sidebar-icons-active dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3" sidebar-toggle-item="">
                    App Notification
                  </span>
                </Link>
                <Link
                  href="/"
                  className={`flex items-center p-2 text-base text-gray-900 font-medium rounded-lg hover:bg-green-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${
                    isActiveRoute("") && activeClass
                  }`}
                >
                  <HelpIcon className="flex-shrink-0 w-6 h-6  text-gray-500 group-hover:text-green-800 transition duration-75 group-[.is-active]:text-green-800 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3" sidebar-toggle-item="">
                    Help
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div
        className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
        id="sidebarBackdrop"
      />
    </>
  );
};

export default AdminUiSidebar;

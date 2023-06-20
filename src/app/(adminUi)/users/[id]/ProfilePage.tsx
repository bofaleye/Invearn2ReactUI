"use client";
import ReusableDrawer from "@/components/ReusableDrawer";
import UserProfile from "./UserProfile";
import { Breadcrumb } from "flowbite-react";
import { AiFillDashboard } from "react-icons/ai";
import EditUser from "./EditUserProfile";

export default function DisplayProfile() {
  return (
    <div className="px-4 pt-6 pb-10 ">
      <Breadcrumb aria-label="current location">
        {/* Change Dashboard Icon */}
        <Breadcrumb.Item href="#" icon={AiFillDashboard}>
          <p>App Management</p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" icon={undefined}>
          <p>Users</p>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#" icon={undefined}>
          <p>Profile</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-black">Profile</h1>
        </div>
      </div>
      <UserProfile />
      <EditUser />
    </div>
  );
}

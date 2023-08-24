"use client";
import { Breadcrumb } from "flowbite-react";
import { DashboardIcon } from "@/assets";

const Dashboard = () => {
  return (
    <div className="px-8 pt-6 pb-10">
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="" icon={DashboardIcon}>
            <p>Dashboard</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

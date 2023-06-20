'use client'

import { DashboardIcon, PlusIcon } from "@/assets";
import { Breadcrumb } from "flowbite-react";
import { BanksTable } from "@/components/Table/Banks";
import SuccessModal from "@/components/Modals/SuccessModal";

export const Banks: React.FC = () => {
  return (
    <div className="px-8 pt-6 pb-10">
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={DashboardIcon}>
            <p>Master Data</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Banks</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <SuccessModal />
      <div className="shadow bg-white sm:rounded-lg">
        <div className="py-4 pr-8 pl-4 flex w-full items-center font-semibold justify-between">
          <h1 className="text-lg font-semibold text-gray-900">All Banks</h1>
          <button className="inline-flex items-center w-max py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-primary-300 sm:ml-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <PlusIcon className="h-8 w-8" />
            Add New Bank
          </button>
        </div>
        <BanksTable />
      </div>
    </div>
  );
}
